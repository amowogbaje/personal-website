<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Services\PaymentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;

/**
 * Where the gateway sends the customer after checkout. We verify with the gateway,
 * then forward the customer to the platform's own redirect_url.
 * The query string we add is informational only: platforms must trust the signed
 * callback (or GET /api/payments/{ref}), never these params.
 */
class PaymentReturnController extends Controller
{
    public function __invoke(PaymentService $payments, string $txRef): RedirectResponse|Response
    {
        $payment = Payment::where('tx_ref', $txRef)->firstOrFail();

        try {
            $payment = $payments->syncFromGateway($payment);
        } catch (\Throwable $e) {
            report($e);
        }

        if (! $payment->redirect_url) {
            return response('Payment status: ' . $payment->status->value . '. You can close this window.');
        }

        $sep = str_contains($payment->redirect_url, '?') ? '&' : '?';

        return redirect()->away($payment->redirect_url . $sep . http_build_query([
            'reference' => $payment->platform_reference,
            'tx_ref' => $payment->tx_ref,
            'status' => $payment->status->value,
        ]));
    }
}
