<?php
// Project brief form → email. Validates, honeypots, rate-limits per IP.
// NOTE: relies on the host's mail(); test delivery after deploying (check spam).
header('Content-Type: application/json');
const TO = 'hello@amowogbaje.com';
const BCC = 'amowogbajegideon@gmail.com'; // every brief is also copied here (kept on purpose)
const MAX_PER_HOUR = 5;

function out(int $code, array $body): void { http_response_code($code); echo json_encode($body); exit; }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(405, ['ok' => false]);

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !preg_match('#^https?://(www\.)?amowogbaje\.com$#', $origin)) out(403, ['ok' => false]);

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

$body = "Name: $name\nEmail: $email\nTimeline: " . $clean('timeline', 80) . "\nBudget: " . $clean('budget', 80)
      . "\nLink: " . preg_replace('/[\n]+/', ' ', $clean('link', 300)) . "\n\n$need\n";
$headers = "From: Website <no-reply@amowogbaje.com>\r\nReply-To: $email\r\nBcc: " . BCC . "\r\nContent-Type: text/plain; charset=UTF-8";
$sent = mail(TO, 'Project brief from ' . $name, $body, $headers);
out($sent ? 200 : 500, ['ok' => $sent]);
