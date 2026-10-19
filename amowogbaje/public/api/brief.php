<?php
// Project brief form → email.
//   Preferred: authenticated SMTP via PHPMailer (reliable). Add smtp_* keys to the same secrets file
//   chat.php uses (amowog-secrets.php above public_html, or api/config.local.php). See config.local.example.php.
//   Fallback: PHP mail() with a proper envelope sender (often unreliable on shared hosting).
// Failures are written to the PHP error log with the prefix "brief.php:".
header('Content-Type: application/json');

const TO = 'hello@amowogbaje.com';
const BCC = 'amowogbajegideon@gmail.com'; // every brief is also copied here (kept on purpose)
const FROM = 'hello@amowogbaje.com';
const MAX_PER_HOUR = 5;

function out(int $code, array $body): void { http_response_code($code); echo json_encode($body); exit; }

function load_mail_config(): array
{
    $cfg = [
        'smtp_host' => (string) (getenv('BRIEF_SMTP_HOST') ?: ''),
        'smtp_port' => (int) (getenv('BRIEF_SMTP_PORT') ?: 465),
        'smtp_user' => (string) (getenv('BRIEF_SMTP_USER') ?: ''),
        'smtp_pass' => (string) (getenv('BRIEF_SMTP_PASS') ?: ''),
        'smtp_secure' => (string) (getenv('BRIEF_SMTP_SECURE') ?: ''), // '', 'ssl', 'tls' or 'none'
    ];
    foreach ([dirname(__DIR__, 2) . '/amowog-secrets.php', __DIR__ . '/config.local.php'] as $file) {
        if (is_file($file)) {
            $loaded = include $file;
            if (is_array($loaded)) {
                foreach ($cfg as $k => $_) {
                    if (isset($loaded[$k]) && $loaded[$k] !== '') $cfg[$k] = $loaded[$k];
                }
            }
        }
    }
    return $cfg;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(405, ['ok' => false]);

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !preg_match('#^https?://(www\.)?amowogbaje\.com$#', $origin)
    && !preg_match('#^http://localhost(:\d+)?$#', $origin)) out(403, ['ok' => false]);

$d = json_decode(file_get_contents('php://input'), true);
if (!is_array($d)) out(400, ['ok' => false]);
if (!empty($d['website'])) out(200, ['ok' => true]); // bot: pretend success

$clean = fn($k, $max) => trim(mb_substr(str_replace(["\r", "\0"], '', (string)($d[$k] ?? '')), 0, $max));
$name = preg_replace('/[\n]+/', ' ', $clean('name', 100));
$email = preg_replace('/[\n]+/', '', $clean('email', 150));
$need = $clean('need', 4000);
if ($name === '' || $need === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) out(422, ['ok' => false]);

$ip = $_SERVER['REMOTE_ADDR'] ?? 'x';
$f = sys_get_temp_dir() . '/brief_' . md5($ip) . '.json';
$hits = is_file($f) ? array_filter(json_decode(file_get_contents($f), true) ?: [], fn($t) => $t > time() - 3600) : [];
if (count($hits) >= MAX_PER_HOUR) out(429, ['ok' => false]);
$hits[] = time();
file_put_contents($f, json_encode(array_values($hits)));

$subject = 'Project brief from ' . $name;
$body = "Name: $name\nEmail: $email\nTimeline: " . $clean('timeline', 80) . "\nBudget: " . $clean('budget', 80)
      . "\nLink: " . preg_replace('/[\n]+/', ' ', $clean('link', 300)) . "\n\n$need\n";

$cfg = load_mail_config();
$sent = false;

if ($cfg['smtp_host'] !== '' && $cfg['smtp_user'] !== '') {
    try {
        require_once __DIR__ . '/lib/PHPMailer/Exception.php';
        require_once __DIR__ . '/lib/PHPMailer/PHPMailer.php';
        require_once __DIR__ . '/lib/PHPMailer/SMTP.php';
        $m = new PHPMailer\PHPMailer\PHPMailer(true);
        $m->isSMTP();
        $m->Host = $cfg['smtp_host'];
        $m->Port = (int) $cfg['smtp_port'];
        $m->SMTPAuth = true;
        $m->Username = $cfg['smtp_user'];
        $m->Password = $cfg['smtp_pass'];
        $secure = $cfg['smtp_secure'] ?: ($m->Port === 465 ? 'ssl' : 'tls');
        if ($secure === 'ssl') $m->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
        elseif ($secure === 'tls') $m->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        else { $m->SMTPSecure = ''; $m->SMTPAutoTLS = false; }
        $m->Timeout = 15;
        $m->CharSet = 'UTF-8';
        $m->setFrom(FROM, 'Website brief');
        $m->addAddress(TO);
        $m->addBCC(BCC);
        $m->addReplyTo($email, $name);
        $m->Subject = $subject;
        $m->Body = $body;
        $m->isHTML(false);
        $m->send();
        $sent = true;
    } catch (Throwable $e) {
        error_log('brief.php: SMTP send failed: ' . $e->getMessage());
    }
} else {
    error_log('brief.php: no SMTP config found, falling back to mail()');
}

if (!$sent) {
    $headers = 'From: Website brief <' . FROM . ">\r\nReply-To: $email\r\nBcc: " . BCC . "\r\nContent-Type: text/plain; charset=UTF-8";
    $sent = @mail(TO, $subject, $body, $headers, '-f' . FROM);
    if (!$sent) error_log('brief.php: mail() fallback failed');
}

out($sent ? 200 : 500, ['ok' => $sent]);
