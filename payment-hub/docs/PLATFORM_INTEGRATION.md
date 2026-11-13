# Integrating a platform with the payments hub

Each platform needs three things: **start a payment**, **receive the signed callback**, and (optional) **poll status**.

Env on the platform:

```
PAYMENTS_HUB_URL=https://payments.amowogbaje.com
PAYMENTS_HUB_API_KEY=pk_...
PAYMENTS_HUB_WEBHOOK_SECRET=whsec_...
```

## 1. Start a payment

```
POST {HUB}/api/payments/initiate
Authorization: Bearer pk_...
Accept: application/json
```

```json
{
  "reference": "ORDER-1042",
  "amount": 5000,
  "currency": "NGN",
  "gateway": "paystack",
  "redirect_url": "https://craftprofessor.com/payment/done",
  "customer": { "email": "ada@example.com", "name": "Ada", "phone": "08012345678" },
  "meta": { "user_id": 17, "plan": "pro" }
}
```

- `reference` is YOUR order/payment id. Calling initiate again with the same reference while it is still pending returns the same checkout link.
- `gateway` is optional (falls back to the platform default, then the hub default).
- `amount` is in major units. The hub converts for each gateway.

Response `201`:

```json
{ "tx_ref": "CRAFTPROFESSOR_01J...", "reference": "ORDER-1042", "status": "pending",
  "gateway": "paystack", "amount": 5000, "amount_minor": 500000, "currency": "NGN",
  "checkout_url": "https://checkout.paystack.com/...", "livemode": true, "paid_at": null }
```

Redirect the customer to `checkout_url`. After paying they come back to your `redirect_url` with
`?reference=&tx_ref=&status=`. **Treat that as display only.** Fulfil the order only from the signed callback
(or after `GET /api/payments/{reference}?verify=1` says `successful`).

Laravel example:

```php
$res = Http::withToken(config('services.payments_hub.key'))
    ->acceptJson()
    ->post(config('services.payments_hub.url') . '/api/payments/initiate', [
        'reference' => (string) $order->id,
        'amount' => $order->total,
        'currency' => 'NGN',
        'redirect_url' => route('payment.done'),
        'customer' => ['email' => $user->email, 'name' => $user->name],
    ])->throw()->json();

return redirect()->away($res['checkout_url']);
```

`config/services.php`:

```php
'payments_hub' => [
    'url' => env('PAYMENTS_HUB_URL'),
    'key' => env('PAYMENTS_HUB_API_KEY'),
    'webhook_secret' => env('PAYMENTS_HUB_WEBHOOK_SECRET'),
],
```

## 2. Receive the callback

The hub POSTs JSON to your `webhook_url` with headers:

```
X-Payments-Event:     payment.successful | payment.failed | payment.abandoned
X-Payments-Delivery:  <delivery id>
X-Payments-Timestamp: <unix seconds>
X-Payments-Signature: hex HMAC-SHA256 of "<timestamp>.<raw body>" using your webhook secret
```

Body:

```json
{
  "event": "payment.successful",
  "reference": "ORDER-1042",
  "tx_ref": "CRAFTPROFESSOR_01J...",
  "status": "successful",
  "amount": 5000,
  "amount_minor": 500000,
  "currency": "NGN",
  "gateway": "paystack",
  "gateway_transaction_id": "4099260516",
  "livemode": true,
  "paid_at": "2026-11-12T10:00:00+00:00",
  "customer": { "email": "ada@example.com", "name": "Ada" },
  "meta": { "user_id": 17, "plan": "pro" }
}
```

Your endpoint must:

1. Verify the signature against the **raw** body, and reject timestamps older than ~5 minutes.
2. Be **idempotent**: the same event can arrive more than once (retries, a failed payment later succeeding). If the order is already paid, return 200 and do nothing.
3. Check `amount_minor` and `currency` match your order before fulfilling.
4. Return a **2xx quickly** (keep heavy work out of the request). Anything else is retried (about 1m, 5m, 30m, 2h, 12h, driven by the hub's cron, so each retry can be up to a minute late).
5. Exempt the route from CSRF and auth middleware.

Laravel controller:

```php
public function handle(Request $request)
{
    $ts = (string) $request->header('X-Payments-Timestamp');
    $sig = (string) $request->header('X-Payments-Signature');

    abort_unless($ts !== '' && abs(time() - (int) $ts) <= 300, 401, 'stale');

    $expected = hash_hmac('sha256', $ts . '.' . $request->getContent(), config('services.payments_hub.webhook_secret'));
    abort_unless(hash_equals($expected, $sig), 401, 'bad signature');

    $e = $request->json()->all();
    $order = Order::where('id', $e['reference'])->firstOrFail();

    if ($e['event'] === 'payment.successful' && $order->status !== 'paid') {
        abort_unless(
            $e['amount_minor'] === (int) round($order->total * 100) && $e['currency'] === $order->currency,
            422, 'amount mismatch'
        );
        $order->markPaid($e['tx_ref'], $e['gateway_transaction_id']);   // your fulfilment, ideally queued
    }

    return response()->json(['ok' => true]);
}
```

(Laravel 11: add the route to the CSRF exceptions via `$middleware->validateCsrfTokens(except: [...])` if it is in `web.php`; routes in `api.php` are not affected.)

Node/Express equivalent of the check:

```js
const crypto = require('crypto');
// app.use('/payments/callback', express.raw({ type: 'application/json' }));
function verify(req, secret) {
  const ts = req.header('X-Payments-Timestamp') || '';
  if (!ts || Math.abs(Date.now() / 1000 - Number(ts)) > 300) return false;
  const expected = crypto.createHmac('sha256', secret).update(`${ts}.${req.body.toString('utf8')}`).digest('hex');
  const got = req.header('X-Payments-Signature') || '';
  return got.length === expected.length && crypto.timingSafeEqual(Buffer.from(got), Buffer.from(expected));
}
```

## 3. Poll status (optional)

```
GET {HUB}/api/payments/ORDER-1042?verify=1
Authorization: Bearer pk_...
```

Use it on your "payment done" page: the customer usually lands back on your site before the callback arrives, so poll this (every 2 to 3 seconds, for up to about a minute) and show the result when it says `successful`.

## Checklist when adding a platform

- [ ] `php artisan platform:create "<Name>" <callback url> [--gateway=...]` on the hub
- [ ] Put the key, secret and hub URL in the platform's env
- [ ] Initiate call on checkout
- [ ] Callback endpoint with signature check, amount check and idempotency
- [ ] Test with sandbox gateway keys end to end (initiate, pay, callback received, replay is a no-op)
