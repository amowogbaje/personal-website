<?php

namespace App\Console\Commands;

use App\Models\WebhookDelivery;
use Illuminate\Console\Command;

class DeliveryResend extends Command
{
    protected $signature = 'deliveries:resend {id? : delivery id} {--failed : resend every permanently failed delivery}';
    protected $description = 'Reset a platform callback so the next deliveries:run (within a minute) sends it again';

    public function handle(): int
    {
        $query = WebhookDelivery::query();

        if ($this->option('failed')) {
            $query->where('status', 'failed');
        } elseif ($this->argument('id')) {
            $query->whereKey($this->argument('id'));
        } else {
            $this->error('Pass a delivery id or --failed.');

            return self::FAILURE;
        }

        $count = $query->update(['status' => 'pending', 'attempts' => 0, 'next_retry_at' => null]);

        $this->info("Reset $count delivery(ies); they go out on the next cron run.");

        return self::SUCCESS;
    }
}
