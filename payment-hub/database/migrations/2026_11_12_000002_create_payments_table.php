<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $t) {
            $t->id();
            $t->foreignId('platform_id')->constrained()->cascadeOnDelete();
            $t->string('tx_ref')->unique();                 // OUR reference, sent to the gateway
            $t->string('platform_reference', 100);          // the platform's own order/payment id
            $t->string('gateway', 30);
            $t->string('gateway_tx_id')->nullable();
            $t->unsignedBigInteger('amount_minor');         // kobo/cents
            $t->char('currency', 3);
            $t->string('status', 20)->default('pending')->index();
            $t->json('customer')->nullable();
            $t->json('meta')->nullable();
            $t->text('redirect_url')->nullable();
            $t->text('checkout_url')->nullable();
            $t->boolean('livemode')->default(true);
            $t->text('notes')->nullable();
            $t->timestamp('paid_at')->nullable();
            $t->timestamps();

            $t->unique(['platform_id', 'platform_reference']);
            $t->index(['gateway', 'gateway_tx_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
