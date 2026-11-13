<?php

namespace App\Http\Controllers;

use App\Gateways\GatewayManager;
use App\Models\GatewayEvent;
use App\Services\GatewayEventProcessor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use InvalidArgumentException;

class GatewayWebhookController extends Controller
{
    /** POST /api/webhook/{gateway} : respond fast, process after the response is sent. */
    public function __invoke(Request $request, GatewayManager $gateways, GatewayEventProcessor $processor, string $gateway): JsonResponse
    {
        try {
            $driver = $gateways->driver($gateway);
        } catch (InvalidArgumentException) {
            abort(404);
        }

        if (! $driver->validateSignature($request)) {
            Log::warning('Rejected webhook with invalid signature', ['gateway' => $gateway, 'ip' => $request->ip()]);

            return response()->json(['message' => 'Invalid signature.'], 401);
        }

        $event = $driver->parseWebhook($request);
        if (! $event) {
            return response()->json(['message' => 'Ignored.']);
        }

        $record = GatewayEvent::firstOrCreate(
            ['gateway' => $gateway, 'event_id' => $event->eventId],
            [
                'event_type' => $event->type,
                'tx_ref' => $event->txRef,
                'payload' => $event->raw,
                'signature_valid' => true,
            ],
        );

        // Also covers gateway retries of an event we stored but never finished processing.
        if (! $record->processed_at) {
            if ($event->isPaymentEvent) {
                // Answer the gateway immediately, verify + update after the response is sent.
                app()->terminating(function () use ($processor, $record) {
                    try {
                        $processor->process($record);
                    } catch (\Throwable $e) {
                        report($e); // payments:reconcile (cron) will catch it
                    }
                });
            } else {
                $record->update(['processed_at' => now()]); // stored for audit only
            }
        }

        return response()->json(['message' => 'OK']);
    }
}
