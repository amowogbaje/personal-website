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

class PaystackGateway implements GatewayInterface
{
    public function __construct(private array $config)
    {
    }

    public function name(): string
    {
        return 'paystack';
    }

    public function isTestMode(): bool
    {
        return str_starts_with((string) ($this->config['secret_key'] ?? ''), 'sk_test');
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

        $res = $this->http()->post('/transaction/initialize', [
            'email' => $customer['email'] ?? null,
            'amount' => $payment->amount_minor, // Paystack uses MINOR units
            'currency' => $payment->currency,
            'reference' => $payment->tx_ref,
            'callback_url' => route('payments.return', $payment->tx_ref),
            'metadata' => [
                'platform' => $payment->platform->slug,
                'customer_name' => $customer['name'] ?? null,
            ],
        ]);

        $url = data_get($res->json(), 'data.authorization_url');

        if (! $res->successful() || data_get($res->json(), 'status') !== true || ! $url) {
            throw new GatewayException('Paystack initialize failed: ' . $res->body());
        }

        return new InitResult($url, data_get($res->json(), 'data.access_code'));
    }

    public function verify(string $txRef): VerifyResult
    {
        $res = $this->http()->get('/transaction/verify/' . rawurlencode($txRef));

        if ($res->serverError()) {
            throw new GatewayException('Paystack verify error: HTTP ' . $res->status());
        }

        $json = $res->json() ?? [];
        $data = data_get($json, 'data');

        if (! $res->successful() || data_get($json, 'status') !== true || empty($data)) {
            return new VerifyResult(PaymentStatus::Pending, raw: $json);
        }

        // "abandoned"/"ongoing"/"pending" stay pending (customer may still complete it).
        $status = match (strtolower((string) ($data['status'] ?? ''))) {
            'success' => PaymentStatus::Successful,
            'failed' => PaymentStatus::Failed,
            default => PaymentStatus::Pending,
        };

        return new VerifyResult(
            status: $status,
            amountMinor: isset($data['amount']) ? (int) $data['amount'] : null,
            currency: isset($data['currency']) ? strtoupper($data['currency']) : null,
            gatewayTxId: isset($data['id']) ? (string) $data['id'] : null,
            paidAt: ! empty($data['paid_at']) ? CarbonImmutable::parse($data['paid_at']) : null,
            raw: $json,
        );
    }

    public function validateSignature(Request $request): bool
    {
        $secret = (string) ($this->config['secret_key'] ?? '');
        $sig = (string) $request->header('x-paystack-signature', '');
        if ($secret === '' || $sig === '') {
            return false;
        }

        return hash_equals(hash_hmac('sha512', $request->getContent(), $secret), $sig);
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
            txRef: $data['reference'] ?? null,
            isPaymentEvent: $type === 'charge.success',
            raw: $payload,
        );
    }
}
