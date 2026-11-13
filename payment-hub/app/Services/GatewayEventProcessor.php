<?php

namespace App\Services;

use App\Models\GatewayEvent;
use App\Models\Payment;
use Illuminate\Support\Facades\Log;

class GatewayEventProcessor
{
    public function __construct(private PaymentService $payments)
    {
    }

    public function process(GatewayEvent $event): void
    {
        if ($event->processed_at) {
            return;
        }

        $payment = $event->tx_ref
            ? Payment::where('tx_ref', $event->tx_ref)->where('gateway', $event->gateway)->first()
            : null;

        if ($payment) {
            // Never trust the webhook body: ask the gateway.
            $this->payments->syncFromGateway($payment);
        } else {
            Log::warning('Gateway event for unknown tx_ref', ['gateway' => $event->gateway, 'tx_ref' => $event->tx_ref]);
        }

        $event->update(['processed_at' => now()]);
    }
}
