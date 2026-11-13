<?php

namespace App\Gateways;

use App\Gateways\Data\InitResult;
use App\Gateways\Data\VerifyResult;
use App\Gateways\Data\WebhookEvent;
use App\Models\Payment;
use Illuminate\Http\Request;

/**
 * Every gateway adapter implements this. Nothing outside app/Gateways
 * should ever see raw gateway payloads, only these normalized types.
 */
interface GatewayInterface
{
    public function name(): string;

    /** True when the configured secret key is a test/sandbox key. */
    public function isTestMode(): bool;

    /** Create the transaction at the gateway and return the hosted checkout link. */
    public function initialize(Payment $payment): InitResult;

    /** Ask the gateway for the truth about a transaction (by OUR tx_ref). */
    public function verify(string $txRef): VerifyResult;

    /** Validate the inbound webhook signature against the RAW body. */
    public function validateSignature(Request $request): bool;

    /** Normalize the inbound webhook. Return null for payloads we don't care about. */
    public function parseWebhook(Request $request): ?WebhookEvent;
}
