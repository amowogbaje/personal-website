# payments.amowogbaje.com: central payment hub

Platforms (craftprofessor, qset, storyverse, ...) never talk to gateways directly.

```
Platform --initiate--> HUB --initialize--> Gateway (Paystack / Flutterwave / ...)
Customer pays at gateway
Gateway --webhook--> HUB /api/webhook/{gateway}
HUB verifies with the gateway, looks up tx_ref -> platform
HUB --signed callback--> Platform webhook_url   (retried with backoff)
```

The hub generates its own `tx_ref` for every payment and sends that to the gateway as the reference.
That is how it knows which platform an incoming gateway webhook belongs to.

## No queue worker: how work gets done on cPanel

| Work | When it runs |
|---|---|
| Gateway webhook processing (verify + update payment) | Right after the 200 response is sent to the gateway (same request, via Laravel's terminating callbacks) |
| First callback to the platform | Right after the response of whatever request marked the payment paid |
| Callback retries, and any first attempt that did not go out | `deliveries:run` cron, every minute |
| Missed webhooks, stale pending payments | `payments:reconcile` cron, every 5 minutes |

`QUEUE_CONNECTION=sync` (set in `.env`), so there are no jobs, no `jobs` table and no worker to keep alive.
The only moving part is one cron line.

## Setup on cPanel (PHP 8.2+)

1. **PHP version:** cPanel > *Select PHP Version* (or *MultiPHP Manager*), choose 8.2 or newer for `payments.amowogbaje.com`.
   Enable extensions: `mbstring`, `openssl`, `pdo_mysql`, `curl`, `fileinfo`, `tokenizer`, `xml`, `ctype`, `json`, `bcmath`.
2. **Subdomain:** create `payments.amowogbaje.com` and set its **document root to `.../payments-hub/public`**
   (cPanel > Domains / Subdomains > Document Root). Do not leave the project root web-accessible.
3. **Create a MySQL database + user** in cPanel and note the credentials.
4. **Project files:** build it once locally (or in cPanel Terminal):

   ```bash
   composer create-project laravel/laravel payments-hub
   cd payments-hub
   # copy this zip's contents over the project (replaces bootstrap/app.php, routes/*, Controller.php)
   composer install --no-dev --optimize-autoloader
   ```

   Upload the folder (including `vendor/`) to e.g. `/home/USER/payments-hub` if you did not build it on the server.
5. **.env:** copy `.env.example` to `.env`, then add the values from `.env.hub.example`, set `DB_*`, and run:

   ```bash
   php artisan key:generate
   php artisan migrate --force
   php artisan config:cache && php artisan route:cache
   ```

   Keep `APP_KEY` safe and unchanged: platform webhook secrets are stored encrypted with it.
6. **Folder permissions:** `storage/` and `bootstrap/cache/` must be writable (775).
7. **Cron job:** cPanel > *Cron Jobs* > add, every minute (`* * * * *`):

   ```
   /usr/local/bin/php /home/USER/payments-hub/artisan schedule:run >> /dev/null 2>&1
   ```

   Use the PHP path cPanel shows on that page (it may be `/opt/cpanel/ea-php82/root/usr/bin/php`).
   That single line drives both `deliveries:run` and `payments:reconcile` (see `routes/console.php`).
   If you prefer separate cron entries instead of the scheduler:

   ```
   * * * * *    /usr/local/bin/php /home/USER/payments-hub/artisan deliveries:run >> /dev/null 2>&1
   */5 * * * *  /usr/local/bin/php /home/USER/payments-hub/artisan payments:reconcile >> /dev/null 2>&1
   ```

   (If you use these two, do not also add the `schedule:run` line.)

After changing `.env` or config later, run `php artisan config:cache` again (or `config:clear`).

## Gateway dashboard settings

| Gateway | Webhook URL | Notes |
|---|---|---|
| Paystack | `https://payments.amowogbaje.com/api/webhook/paystack` | Signature uses your secret key, nothing extra to set |
| Flutterwave | `https://payments.amowogbaje.com/api/webhook/flutterwave` | Set "Secret hash" in dashboard = `FLW_SECRET_HASH` |

Use test keys for staging. Each payment records `livemode`, and platforms receive it in the callback.

## Register a platform

```bash
php artisan platform:create "CraftProfessor" https://craftprofessor.com/api/payments/callback --gateway=paystack
```

It prints `PAYMENTS_HUB_API_KEY` and `PAYMENTS_HUB_WEBHOOK_SECRET` once. Put them in that platform's env.
See `docs/PLATFORM_INTEGRATION.md` for what the platform needs to implement.

## API

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/api/payments/initiate` | Platform API key | Create payment, returns `checkout_url` |
| GET | `/api/payments/{tx_ref or your reference}` | Platform API key | Status. Add `?verify=1` to force a gateway check |
| POST | `/api/webhook/{gateway}` | Gateway signature | Inbound gateway webhooks |
| GET | `/payments/return/{tx_ref}` | none | Customer return, verifies then redirects to the platform's `redirect_url` |

Amounts are in major units on the API (`5000.00`) and stored in minor units (kobo/cents).

## Operations

```bash
php artisan deliveries:run              # normally cron; send due callbacks now
php artisan payments:reconcile          # normally cron; re-verify pending, expire stale
php artisan deliveries:resend 42        # reset one callback; cron sends it within a minute
php artisan deliveries:resend --failed  # reset all permanently failed callbacks
```

Payment statuses: `pending`, `successful`, `failed`, `abandoned`, `refunded`, `review`.
`review` means the gateway reported success but amount/currency did not match: no callback is sent,
look at `payments.notes` and resolve by hand.

Callback retries: 1m, 5m, 30m, 2h, 12h after a failed attempt (rounded up to the next cron minute),
then marked `failed` (see `webhook_deliveries`).

If callbacks stop flowing, check first that the cron job is running (`webhook_deliveries` rows stuck in
`pending` with an old `next_retry_at` mean it is not).

## Adding another gateway

1. Create `app/Gateways/XyzGateway.php` implementing `GatewayInterface`
2. Add it to `config/gateways.php` under `drivers`
3. Point the gateway's webhook at `/api/webhook/xyz`

Nothing else changes.

## Known limits (v1)

- Refunds/chargebacks are not handled yet (`Refunded` status and event exist but nothing sets them).
- Amounts assume 2-decimal currencies (NGN, USD, GHS, ...). Zero-decimal currencies need a small change.
- One set of gateway credentials for all platforms. Per-platform gateway accounts would need a credentials table.
- "After the response" work depends on PHP finishing the request after the reply is flushed (PHP-FPM/LiteSpeed do this).
  If your host does not, the work still runs, just before the client gets its response, and cron is the safety net.
- Not run against live gateway sandboxes yet: test with sandbox keys before going live.
