<?php

namespace App\Gateways\Data;

final readonly class InitResult
{
    public function __construct(
        public string $checkoutUrl,
        public ?string $gatewayReference = null,
    ) {
    }
}
