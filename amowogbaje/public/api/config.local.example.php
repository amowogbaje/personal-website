<?php
// Copy these keys into the SAME secrets file chat.php already reads
// (amowog-secrets.php one level above public_html, or api/config.local.php). Do not commit real values.
// The mailbox hello@amowogbaje.com must exist on your host. In cPanel: Email Accounts → Connect Devices
// shows the exact SMTP host/port (usually mail.amowogbaje.com, port 465 = SSL).
return [
    // ...existing keys (api_key, model, ...) stay as they are...
    'smtp_host' => 'mail.amowogbaje.com',
    'smtp_port' => 465,
    'smtp_user' => 'hello@amowogbaje.com',
    'smtp_pass' => 'THE-MAILBOX-PASSWORD',
];
