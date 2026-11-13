<?php

namespace App\Services;

use App\Enums\PaymentStatus;
use App\Gateways\Data\VerifyResult;
use App\Gateways\GatewayException;
use App\Gateways\GatewayManager;
use App\Models\Payment;
use App\Models\Platform;
use App\Models\WebhookDelivery;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class PaymentService
{
    public function __construct(private GatewayManager $gateways)
    {
    }

    /**
     * Create a payment for a platform and get a checkout link from the gateway.
     * Idempotent on (platform, reference) while the payment is still pending.
     */
    public function initiate(Platform $platform, array $data): Payment
    {
        $existing = Payment::where('platform_id', $platform->id)
            ->where('platform_reference', $data['reference'])
            ->first();

        if ($existing) {
            if ($existing->status === PaymentStatus::Pending && $existing->checkout_url) {
                return $existing;
            }
            abort(409, 'A payment with this reference already exists (status: ' . $existing->status->value . ').');
        }

        $gatewayName = $data['gateway'] ?? $platform->default_gateway ?? config('gateways.default');
        $gateway = $this->gateways->driver($gatewayName);

        $payment = Payment::create([
            'platform_id' => $platform->id,
            'tx_ref' => strtoupper($platform->slug) . '_' . Str::ulid(),
            'platform_reference' => $data['reference'],
            'gateway' => $gatewayName,
            'amount_minor' => (int) round(((float) $data['amount']) * 100),
            'currency' => strtoupper($data['currency']),
            'status' => PaymentStatus::Pending,
            'customer' => $data['customer'],
            'meta' => $data['meta'] ?? null,
            'redirect_url' => $data['redirect_url'] ?? null,
            'livemode' => ! $gateway->isTestMode(),
        ]);

        try {
            $init = $gateway->initialize($payment->setRelation('platform', $platform));
        } catch (GatewayException $e) {
            $payment->delete(); // nothing was charged; let the platform retry with the same reference
            throw $e;
        }

        $payment->update(['checkout_url' => $init->checkoutUrl]);

        return $payment;
    }

    /** Verify with the gateway and apply the result. Safe to call any number of times. */
    public function syncFromGateway(Payment $payment): Payment
    {
        $result = $this->gateways->driver($payment->gateway)->verify($payment->tx_ref);

        return $this->applyResult($payment, $result);
    }

    /** Pending payments that never completed get closed out as abandoned. */
    public function markAbandoned(Payment $payment): Payment
    {
        return $this->applyResult($payment, new VerifyResult(PaymentStatus::Abandoned));
    }

    public function applyResult(Payment $payment, VerifyResult $r): Payment
    {
        return DB::transaction(function () use ($payment, $r) {
            $p = Payment::whereKey($payment->id)->lockForUpdate()->firstOrFail();

            // Nothing to report, nothing to change, or already in a money-final state.
            if (
                $r->status === PaymentStatus::Pending
                || $r->status === $p->status
                || $p->status === PaymentStatus::Review
                || in_array($p->status, [PaymentStatus::Successful, PaymentStatus::Refunded], true)
            ) {
                return $p;
            }

            if ($r->status === PaymentStatus::Successful) {
                $mismatch = $r->amountMinor !== (int) $p->amount_minor
                    || strtoupper((string) $r->currency) !== strtoupper($p->currency);

                if ($mismatch) {
                    $p->update([
                        'status' => PaymentStatus::Review,
                        'gateway_tx_id' => $r->gatewayTxId,
                        'notes' => sprintf(
                            'Amount/currency mismatch: expected %d %s, gateway reports %s %s',
                            $p->amount_minor, $p->currency, $r->amountMinor ?? 'null', $r->currency ?? 'null'
                        ),
                    ]);
                    Log::critical('Payment needs review (amount mismatch)', ['tx_ref' => $p->tx_ref]);

                    return $p;
                }
            }

            $p->update([
                'status' => $r->status,
                'gateway_tx_id' => $r->gatewayTxId ?? $p->gateway_tx_id,
                'paid_at' => $r->status === PaymentStatus::Successful ? ($r->paidAt ?? now()) : $p->paid_at,
            ]);

            $this->queueCallback($p);

            return $p;
        });
    }

    private function queueCallback(Payment $p): void
    {
        $event = $p->status->event();
        if (! $event) {
            return;
        }

        $delivery = WebhookDelivery::create([
            'payment_id' => $p->id,
            'event' => $event,
            'payload' => $this->buildPayload($p, $event),
            'status' => 'pending',
            // Gives the after-response attempt first go; cron picks it up if that never happens.
            'next_retry_at' => now()->addSeconds(60),
        ]);

        $id = $delivery->id;

        // Runs after the HTTP response has been sent (no queue worker needed).
        app()->terminating(function () use ($id) {
            try {
                app(CallbackDeliverer::class)->deliver($id, immediate: true);
            } catch (\Throwable $e) {
                report($e);
            }
        });
    }

    /** The one normalized payload every platform receives, whatever gateway was used. */
    public function buildPayload(Payment $p, string $event): array
    {
        return [
            'event' => $event,
            'reference' => $p->platform_reference,
            'tx_ref' => $p->tx_ref,
            'status' => $p->status->value,
            'amount' => $p->amount_minor / 100,
            'amount_minor' => (int) $p->amount_minor,
            'currency' => $p->currency,
            'gateway' => $p->gateway,
            'gateway_transaction_id' => $p->gateway_tx_id,
            'livemode' => $p->livemode,
            'paid_at' => $p->paid_at?->toIso8601String(),
            'customer' => $p->customer,
            'meta' => $p->meta,
        ];
    }
}
