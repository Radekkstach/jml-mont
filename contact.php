<?php
// Přidáme hlavičku, aby frontend věděl, že mu posíláme JSON
header('Content-Type: application/json; charset=utf-8');

// 1) HONEYPOT (Proti spamu)
if (!empty($_POST["hp-check"])) {
    http_response_code(400); // 400 Bad Request
    echo json_encode(["status" => "spam", "message" => "Spam detekován."]);
    exit;
}

// 2) RATE LIMIT (Ochrana proti zahlcení)
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
        http_response_code(429); // 429 Too Many Requests
        echo json_encode(["status" => "limit", "message" => "Příliš mnoho pokusů. Prosím chvíli počkejte."]);
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
    http_response_code(400); // 400 Bad Request
    echo json_encode(["status" => "invalid", "message" => "Prosím vyplňte správně všechna pole."]);
    exit;
}

// 4) ODESLÁNÍ EMAILU
$to      = "info@jmlmont.eu";
$subject = "Nova zprava z webu JML mont"; 

$body = "Jméno: $name\n";
$body .= "E-mail: $email\n\n";
$body .= "Zpráva:\n$message\n";

$from_email = "info@jmlmont.eu";
$headers  = "From: JML Web <$from_email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $body, $headers)) {
    http_response_code(200); // 200 OK
    echo json_encode(["status" => "success"]);
} else {
    http_response_code(500); // 500 Internal Server Error
    echo json_encode(["status" => "error", "message" => "Chyba na serveru při odesílání e-mailu."]);
}
exit;