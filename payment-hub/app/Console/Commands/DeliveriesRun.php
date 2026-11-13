<?php

namespace App\Console\Commands;

use App\Models\WebhookDelivery;
use App\Services\CallbackDeliverer;
use Illuminate\Console\Command;

class DeliveriesRun extends Command
{
    protected $signature = 'deliveries:run';
    protected $description = 'Send due platform callbacks (first attempts that did not go out, and retries)';

    public function handle(CallbackDeliverer $deliverer): int
    {
        $started = time();
        $sent = 0;

        $ids = WebhookDelivery::where('status', 'pending')
            ->where(fn ($q) => $q->whereNull('next_retry_at')->orWhere('next_retry_at', '<=', now()))
            ->orderBy('id')
            ->limit(100)
            ->pluck('id');

        foreach ($ids as $id) {
            if (time() - $started > 50) {
                break; // stay inside the 1-minute cron window; the rest goes next minute
            }

            try {
                $deliverer->deliver($id);
                $sent++;
            } catch (\Throwable $e) {
                report($e);
            }
        }

        $this->info("Processed $sent delivery(ies).");

        return self::SUCCESS;
    }
}
