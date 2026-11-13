<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('webhook_deliveries', function (Blueprint $t) {
            $t->id();
            $t->foreignId('payment_id')->constrained()->cascadeOnDelete();
            $t->string('event', 50);
            $t->json('payload');
            $t->unsignedSmallInteger('attempts')->default(0);
            $t->string('status', 20)->default('pending')->index(); // pending | delivered | failed
            $t->unsignedSmallInteger('status_code')->nullable();
            $t->text('response_body')->nullable();
            $t->timestamp('next_retry_at')->nullable();
            $t->timestamp('delivered_at')->nullable();
            $t->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('webhook_deliveries');
    }
};
