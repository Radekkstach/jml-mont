<?php
// 1) HONEYPOT
if (!empty($_POST["hp-check"])) {
    header("Location: index.html?status=spam#kontakt");
    exit;
}

// 2) RATE LIMIT
$ip = $_SERVER['REMOTE_ADDR'];
$limitDir = __DIR__ . '/ip_limit';
$limitFile = $limitDir . '/' . md5($ip) . '.txt';

if (!is_dir($limitDir)) {
    mkdir($limitDir, 0755, true);
}

$timestamp = time();
$limitSeconds = 60;
$maxRequests  = 3;

$data = [];
if (file_exists($limitFile)) {
    $data = json_decode(file_get_contents($limitFile), true);
    $data = array_filter($data, function($t) use($timestamp, $limitSeconds) {
        return ($timestamp - $t) < $limitSeconds;
    });

    if (count($data) >= $maxRequests) {
        header("Location: index.html?status=limit#kontakt");
        exit;
    }
}

$data[] = $timestamp;
file_put_contents($limitFile, json_encode($data));

// 3) SANITACE VSTUPŮ
$name    = htmlspecialchars(trim($_POST["name"] ?? ""), ENT_QUOTES, "UTF-8");
$email   = filter_var($_POST["email"] ?? "", FILTER_VALIDATE_EMAIL);
$message = htmlspecialchars(trim($_POST["message"] ?? ""), ENT_QUOTES, "UTF-8");

if (!$email || empty($name) || empty($message)) {
    header("Location: index.html?status=invalid#kontakt");
    exit;
}

// 4) ODESLÁNÍ EMAILU
$to      = "info@jmlmont.eu";
$subject = "Nova zprava z webu JML mont"; // Bez diakritiky je jistější pro mail servery

$body = "Jméno: $name\n";
$body .= "E-mail: $email\n\n";
$body .= "Zpráva:\n$message\n";

$from_email = "info@jmlmont.eu";
$headers  = "From: JML Web <$from_email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $body, $headers)) {
    header("Location: index.html?status=success#kontakt");
} else {
    header("Location: index.html?status=error#kontakt");
}
exit;