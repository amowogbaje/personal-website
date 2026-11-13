<?php

use App\Http\Controllers\PaymentReturnController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => response()->json(['service' => 'payments hub']));

// Customer lands here after paying at the gateway.
Route::get('payments/return/{txRef}', PaymentReturnController::class)->name('payments.return');
