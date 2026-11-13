<?php

namespace App\Http\Controllers;

use App\Enums\PaymentStatus;
use App\Gateways\GatewayException;
use App\Gateways\GatewayManager;
use App\Models\Payment;
use App\Services\PaymentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PaymentController extends Controller
{
    public function initiate(Request $request, PaymentService $payments, GatewayManager $gateways): JsonResponse
    {
        $data = $request->validate([
            'reference' => ['required', 'string', 'max:100'],
            'amount' => ['required', 'numeric', 'gt:0'],          // MAJOR units, e.g. 5000.00
            'currency' => ['required', 'string', 'size:3'],
            'gateway' => ['nullable', 'string', Rule::in($gateways->names())],
            'redirect_url' => ['nullable', 'url', 'max:2000'],
            'customer' => ['required', 'array'],
            'customer.email' => ['required', 'email'],
            'customer.name' => ['nullable', 'string', 'max:150'],
            'customer.phone' => ['nullable', 'string', 'max:30'],
            'meta' => ['nullable', 'array'],
        ]);

        try {
            $payment = $payments->initiate($request->attributes->get('platform'), $data);
        } catch (GatewayException $e) {
            report($e);

            return response()->json(['message' => 'Could not start the payment with the gateway. Please retry.'], 502);
        }

        return response()->json($this->present($payment), 201);
    }

    /** Lookup by tx_ref or by the platform's own reference. Add ?verify=1 to force a gateway check. */
    public function show(Request $request, PaymentService $payments, string $id): JsonResponse
    {
        $platform = $request->attributes->get('platform');

        $payment = Payment::where('platform_id', $platform->id)
            ->where(fn ($q) => $q->where('tx_ref', $id)->orWhere('platform_reference', $id))
            ->firstOrFail();

        if ($payment->status === PaymentStatus::Pending && $request->boolean('verify')) {
            try {
                $payment = $payments->syncFromGateway($payment);
            } catch (GatewayException $e) {
                report($e);
            }
        }

        return response()->json($this->present($payment));
    }

    private function present(Payment $p): array
    {
        return [
            'tx_ref' => $p->tx_ref,
            'reference' => $p->platform_reference,
            'status' => $p->status->value,
            'gateway' => $p->gateway,
            'amount' => $p->amount_minor / 100,
            'amount_minor' => (int) $p->amount_minor,
            'currency' => $p->currency,
            'checkout_url' => $p->checkout_url,
            'livemode' => $p->livemode,
            'paid_at' => $p->paid_at?->toIso8601String(),
        ];
    }
}
