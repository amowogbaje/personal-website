<?php

use App\Gateways\FlutterwaveGateway;
use App\Gateways\PaystackGateway;

return [
    // Used when neither the request nor the platform picks a gateway.
    'default' => env('PAYMENT_DEFAULT_GATEWAY', 'paystack'),

    // Add a new gateway = write one adapter class + add it here.
    'drivers' => [
        'flutterwave' => [
            'class' => FlutterwaveGateway::class,
            'base_url' => 'https://api.flutterwave.com/v3',
            'secret_key' => env('FLW_SECRET_KEY'),
            'secret_hash' => env('FLW_SECRET_HASH'), // the "secret hash" set in the FLW dashboard webhook settings
        ],
        'paystack' => [
            'class' => PaystackGateway::class,
            'base_url' => 'https://api.paystack.co',
            'secret_key' => env('PAYSTACK_SECRET_KEY'),
        ],
    ],

    // Seconds to wait before each retry of a failed callback to a platform.
    'callback_backoff' => [60, 300, 1800, 7200, 43200],

    // Pending payments older than this are marked "abandoned" by payments:reconcile.
    'expire_pending_after_hours' => (int) env('PAYMENT_EXPIRE_HOURS', 24),
];
