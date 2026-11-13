<?php

namespace App\Console\Commands;

use App\Gateways\GatewayManager;
use App\Models\Platform;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class PlatformCreate extends Command
{
    protected $signature = 'platform:create {name} {webhook_url} {--slug=} {--gateway=}';
    protected $description = 'Register a platform (craftprofessor, qset, ...) and print its credentials once';

    public function handle(GatewayManager $gateways): int
    {
        $slug = $this->option('slug') ?: Str::slug($this->argument('name'));

        if (Platform::where('slug', $slug)->exists()) {
            $this->error("Platform [$slug] already exists.");

            return self::FAILURE;
        }

        if ($this->option('gateway') && ! in_array($this->option('gateway'), $gateways->names(), true)) {
            $this->error('Unknown gateway. Available: ' . implode(', ', $gateways->names()));

            return self::FAILURE;
        }

        $apiKey = 'pk_' . Str::random(40);
        $secret = 'whsec_' . Str::random(40);

        Platform::create([
            'name' => $this->argument('name'),
            'slug' => $slug,
            'api_key_hash' => hash('sha256', $apiKey),
            'webhook_url' => $this->argument('webhook_url'),
            'webhook_secret' => $secret,
            'default_gateway' => $this->option('gateway') ?: null,
        ]);

        $this->info("Platform [$slug] created. Store these now, the API key cannot be shown again:");
        $this->line("  PAYMENTS_HUB_API_KEY=$apiKey");
        $this->line("  PAYMENTS_HUB_WEBHOOK_SECRET=$secret");

        return self::SUCCESS;
    }
}
