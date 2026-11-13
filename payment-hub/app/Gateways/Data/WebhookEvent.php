<?php

namespace App\Gateways\Data;

final readonly class WebhookEvent
{
    public function __construct(
        public string $eventId,        // unique per gateway event, used for dedupe
        public string $type,           // raw gateway event name
        public ?string $txRef,         // OUR reference, sent to the gateway at initiate
        public bool $isPaymentEvent,   // should trigger a verify?
        public array $raw = [],
    ) {
    }
}
