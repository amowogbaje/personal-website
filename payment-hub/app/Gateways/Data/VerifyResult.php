<?php

namespace App\Gateways\Data;

use App\Enums\PaymentStatus;
use Carbon\CarbonImmutable;

/** Gateway-agnostic result of verifying a transaction. Amounts are in MINOR units. */
final readonly class VerifyResult
{
    public function __construct(
        public PaymentStatus $status,
        public ?int $amountMinor = null,
        public ?string $currency = null,
        public ?string $gatewayTxId = null,
        public ?CarbonImmutable $paidAt = null,
        public array $raw = [],
    ) {
    }
}
