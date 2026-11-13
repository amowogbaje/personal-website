<?php

namespace App\Console\Commands;

use App\Enums\PaymentStatus;
use App\Models\Payment;
use App\Services\PaymentService;
use Illuminate\Console\Command;

class PaymentsReconcile extends Command
{
    protected $signature = 'payments:reconcile';
    protected $description = 'Re-verify pending payments (missed webhooks) and expire stale ones';

    public function handle(PaymentService $payments): int
    {
        $checked = $expired = $errors = 0;
        $expireBefore = now()->subHours(config('gateways.expire_pending_after_hours'));

        Payment::where('status', PaymentStatus::Pending)
            ->where('created_at', '<=', now()->subMinutes(5))
            ->chunkById(100, function ($chunk) use ($payments, $expireBefore, &$checked, &$expired, &$errors) {
                foreach ($chunk as $payment) {
                    try {
                        $payment = $payments->syncFromGateway($payment);
                        $checked++;

                        if ($payment->status === PaymentStatus::Pending && $payment->created_at <= $expireBefore) {
                            $payments->markAbandoned($payment);
                            $expired++;
                        }
                    } catch (\Throwable $e) {
                        $errors++;
                        report($e);
                    }
                }
            });

        $this->info("Checked $checked, expired $expired, errors $errors");

        return self::SUCCESS;
    }
}
