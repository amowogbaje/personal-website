<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('platforms', function (Blueprint $t) {
            $t->id();
            $t->string('name');
            $t->string('slug')->unique();
            $t->string('api_key_hash', 64)->unique();      // sha256 of the platform's API key
            $t->text('webhook_url');                        // where the hub sends callbacks
            $t->text('webhook_secret');                     // encrypted; used to sign callbacks
            $t->string('default_gateway', 30)->nullable();
            $t->boolean('is_active')->default(true);
            $t->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('platforms');
    }
};
