<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('gateway_events', function (Blueprint $t) {
            $t->id();
            $t->string('gateway', 30);
            $t->string('event_id', 191);
            $t->string('event_type', 100);
            $t->string('tx_ref')->nullable()->index();
            $t->json('payload');
            $t->boolean('signature_valid')->default(true);
            $t->timestamp('processed_at')->nullable();
            $t->timestamps();

            $t->unique(['gateway', 'event_id']);            // idempotency
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('gateway_events');
    }
};
