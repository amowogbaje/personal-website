<?php

use App\Http\Controllers\GatewayWebhookController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;

// Gateways call these (signature verified inside the controller).
Route::post('webhook/{gateway}', GatewayWebhookController::class)->middleware('throttle:600,1');

// Platforms call these (API key auth).
Route::middleware(['platform', 'throttle:120,1'])->group(function () {
    Route::post('payments/initiate', [PaymentController::class, 'initiate']);
    Route::get('payments/{id}', [PaymentController::class, 'show']);
});
