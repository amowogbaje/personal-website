<?php

namespace App\Services;

use App\Models\WebhookDelivery;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

/**
 * Sends one signed callback to a platform. No queue involved:
 *  - first attempt runs right after the HTTP response is sent (see PaymentService::queueCallback)
 *  - retries are picked up by the `deliveries:run` cron command using next_retry_at
 */
class CallbackDeliverer
{
    public function deliver(int $id, bool $immediate = false): void
    {
        // Atomically claim the delivery so cron and the after-response attempt never double-send.
        $query = WebhookDelivery::where('id', $id)->where('status', 'pending');

        if ($immediate) {
            $query->where('attempts', 0);
        } else {
            $query->where(fn ($w) => $w->whereNull('next_retry_at')->orWhere('next_retry_at', '<=', now()));
        }

        $claimed = $query->update([
            'attempts' => DB::raw('attempts + 1'),
            'next_retry_at' => now()->addMinutes(2), // lease: if this process dies, cron retries after 2 min
        ]);

        if (! $claimed) {
            return;
        }

        $delivery = WebhookDelivery::with('payment.platform')->find($id);
        $platform = $delivery->payment->platform;
        $body = json_encode($delivery->payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

        // Signed fresh on every attempt so the timestamp stays inside the receiver's replay window.
        $timestamp = time();
        $signature = hash_hmac('sha256', $timestamp . '.' . $body, $platform->webhook_secret);

        try {
            $res = Http::timeout(15)
                ->withHeaders([
                    'X-Payments-Event' => $delivery->event,
                    'X-Payments-Delivery' => (string) $delivery->id,
                    'X-Payments-Timestamp' => (string) $timestamp,
                    'X-Payments-Signature' => $signature,
                ])
                ->withBody($body, 'application/json')
                ->post($platform->webhook_url);

            $ok = $res->successful();
            $code = $res->status();
            $snippet = Str::limit($res->body(), 1000);
        } catch (\Throwable $e) {
            $ok = false;
            $code = null;
            $snippet = Str::limit($e->getMessage(), 1000);
        }

        if ($ok) {
            $delivery->update([
                'status' => 'delivered',
                'status_code' => $code,
                'response_body' => $snippet,
                'delivered_at' => now(),
                'next_retry_at' => null,
            ]);

            return;
        }

        $backoff = config('gateways.callback_backoff');

        if ($delivery->attempts > count($backoff)) {
            $delivery->update(['status' => 'failed', 'status_code' => $code, 'response_body' => $snippet, 'next_retry_at' => null]);
            Log::error('Platform callback permanently failed', ['delivery' => $delivery->id, 'platform' => $platform->slug]);

            return;
        }

        $delivery->update([
            'status_code' => $code,
            'response_body' => $snippet,
            'next_retry_at' => now()->addSeconds($backoff[$delivery->attempts - 1]),
        ]);
    }
}
