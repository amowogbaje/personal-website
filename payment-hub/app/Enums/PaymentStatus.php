<?php

namespace App\Enums;

enum PaymentStatus: string
{
    case Pending = 'pending';
    case Successful = 'successful';
    case Failed = 'failed';
    case Abandoned = 'abandoned';
    case Refunded = 'refunded';
    case Review = 'review'; // amount/currency mismatch, needs a human

    /** Event name sent to the platform when the payment moves into this status. */
    public function event(): ?string
    {
        return match ($this) {
            self::Successful => 'payment.successful',
            self::Failed => 'payment.failed',
            self::Abandoned => 'payment.abandoned',
            self::Refunded => 'payment.refunded',
            default => null,
        };
    }
}
