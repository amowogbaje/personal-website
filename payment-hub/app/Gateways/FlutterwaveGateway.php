<?php

namespace App\Gateways;

use App\Enums\PaymentStatus;
use App\Gateways\Data\InitResult;
use App\Gateways\Data\VerifyResult;
use App\Gateways\Data\WebhookEvent;
use App\Models\Payment;
use Carbon\CarbonImmutable;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class FlutterwaveGateway implements GatewayInterface
{
    public function __construct(private array $config)
    {
    }

    public function name(): string
    {
        return 'flutterwave';
    }

    public function isTestMode(): bool
    {
        return str_contains((string) ($this->config['secret_key'] ?? ''), '_TEST');
    }

    private function http(): PendingRequest
    {
        return Http::baseUrl($this->config['base_url'])
            ->withToken((string) $this->config['secret_key'])
            ->acceptJson()
            ->timeout(30);
    }

    public function initialize(Payment $payment): InitResult
    {
        $customer = $payment->customer ?? [];

        $res = $this->http()->post('/payments', [
            'tx_ref' => $payment->tx_ref,
            'amount' => round($payment->amount_minor / 100, 2), // Flutterwave uses MAJOR units
            'currency' => $payment->currency,
            'redirect_url' => route('payments.return', $payment->tx_ref),
            'customer' => array_filter([
                'email' => $customer['email'] ?? null,
                'name' => $customer['name'] ?? null,
                'phonenumber' => $customer['phone'] ?? null,
            ]),
            'customizations' => ['title' => $payment->platform->name],
            'meta' => ['platform' => $payment->platform->slug],
        ]);

        $link = data_get($res->json(), 'data.link');

        if (! $res->successful() || data_get($res->json(), 'status') !== 'success' || ! $link) {
            throw new GatewayException('Flutterwave initialize failed: ' . $res->body());
        }

        return new InitResult($link);
    }

    public function verify(string $txRef): VerifyResult
    {
        $res = $this->http()->get('/transactions/verify_by_reference', ['tx_ref' => $txRef]);

        if ($res->serverError()) {
            throw new GatewayException('Flutterwave verify error: HTTP ' . $res->status());
        }

        $json = $res->json() ?? [];
        $data = data_get($json, 'data');

        // Not found / not attempted yet = still pending.
        if (! $res->successful() || data_get($json, 'status') !== 'success' || empty($data)) {
            return new VerifyResult(PaymentStatus::Pending, raw: $json);
        }

        // "cancelled" is treated as pending: the customer may retry on the same reference.
        // Stale pending payments get expired to "abandoned" by payments:reconcile.
        $status = match (strtolower((string) ($data['status'] ?? ''))) {
            'successful', 'completed' => PaymentStatus::Successful,
            'failed' => PaymentStatus::Failed,
            default => PaymentStatus::Pending,
        };

        return new VerifyResult(
            status: $status,
            amountMinor: isset($data['amount']) ? (int) round(((float) $data['amount']) * 100) : null,
            currency: isset($data['currency']) ? strtoupper($data['currency']) : null,
            gatewayTxId: isset($data['id']) ? (string) $data['id'] : null,
            paidAt: ! empty($data['created_at']) ? CarbonImmutable::parse($data['created_at']) : null,
            raw: $json,
        );
    }

    public function validateSignature(Request $request): bool
    {
        $secret = (string) ($this->config['secret_hash'] ?? '');
        if ($secret === '') {
            return false;
        }

        if ($hash = $request->header('verif-hash')) {
            return hash_equals($secret, (string) $hash);
        }

        if ($sig = $request->header('flutterwave-signature')) {
            $expected = base64_encode(hash_hmac('sha256', $request->getContent(), $secret, true));
            return hash_equals($expected, (string) $sig);
        }

        return false;
    }

    public function parseWebhook(Request $request): ?WebhookEvent
    {
        $payload = $request->json()->all();
        $type = $payload['event'] ?? null;
        if (! $type) {
            return null;
        }

        $data = $payload['data'] ?? [];
        $id = $data['id'] ?? sha1($request->getContent());

        return new WebhookEvent(
            eventId: $type . ':' . $id,
            type: $type,
            txRef: $data['tx_ref'] ?? null,
            isPaymentEvent: $type === 'charge.completed',
            raw: $payload,
        );
    }
}
