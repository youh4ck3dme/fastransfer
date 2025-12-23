<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

// ===========================================
// CONFIGURATION - UPDATE THESE VALUES
// ===========================================

// Database Configuration
$db_host = 'localhost'; // Usually localhost on Websupport
$db_name = '6jbcai7w'; // Database name
$db_user = '6jbcai7w'; // Database user
$db_pass = 'HesD@Bu2022'; // Database password

// SMTP Configuration (VERIFIED)
$smtp_host = 'smtp.m1.websupport.sk';
$smtp_port = 465;
$smtp_user = 'info@fastransfer.sk';
$smtp_pass = 'Fastransfer.sk1';
$admin_email = 'info@fastransfer.sk';

// ===========================================
// END CONFIGURATION
// ===========================================

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON input"]);
    exit;
}

// Extract data
$customerName = htmlspecialchars($input['customerName'] ?? '', ENT_QUOTES, 'UTF-8');
$customerEmail = filter_var($input['customerEmail'] ?? '', FILTER_SANITIZE_EMAIL);
$customerPhone = htmlspecialchars($input['customerPhone'] ?? '', ENT_QUOTES, 'UTF-8');
$pickupLocation = htmlspecialchars($input['pickupLocation'] ?? '', ENT_QUOTES, 'UTF-8');
$dropoffLocation = htmlspecialchars($input['dropoffLocation'] ?? '', ENT_QUOTES, 'UTF-8');
$bookingDate = htmlspecialchars($input['bookingDate'] ?? '', ENT_QUOTES, 'UTF-8');
$bookingTime = htmlspecialchars($input['bookingTime'] ?? '', ENT_QUOTES, 'UTF-8');
$passengers = intval($input['passengers'] ?? 1);

// Basic Validation
if (empty($customerName) || empty($customerEmail) || empty($pickupLocation) || empty($dropoffLocation)) {
    http_response_code(400);
    echo json_encode(["error" => "Chýbajú povinné polia"]);
    exit;
}

if (!filter_var($customerEmail, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Neplatná emailová adresa"]);
    exit;
}

// ===========================================
// 1. SAVE TO DATABASE
// ===========================================
$dbSuccess = false;
try {
    $dsn = "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4";
    $pdo = new PDO($dsn, $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    // Create table if not exists
    $pdo->exec("CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50),
        pickup_location VARCHAR(255) NOT NULL,
        dropoff_location VARCHAR(255) NOT NULL,
        booking_date DATE,
        booking_time TIME,
        passengers INT,
        status ENUM('new', 'confirmed', 'completed', 'cancelled') DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $stmt = $pdo->prepare("INSERT INTO bookings (customer_name, customer_email, customer_phone, pickup_location, dropoff_location, booking_date, booking_time, passengers) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$customerName, $customerEmail, $customerPhone, $pickupLocation, $dropoffLocation, $bookingDate, $bookingTime, $passengers]);
    $dbSuccess = true;

} catch (PDOException $e) {
    // Log error but continue to send email
    error_log("FastTransfer DB Error: " . $e->getMessage());
}

// ===========================================
// 2. SEND EMAILS VIA SMTP
// ===========================================

// Email content
$messageBody = "
=================================
NOVÁ REZERVÁCIA - FastTransfer
=================================

Meno zákazníka: $customerName
Email: $customerEmail
Telefón: $customerPhone

DETAILY CESTY:
- Odkiaľ: $pickupLocation
- Kam: $dropoffLocation
- Dátum: $bookingDate
- Čas: $bookingTime
- Počet osôb: $passengers

=================================
Odoslané: " . date('d.m.Y H:i:s') . "
";

$customerMessageBody = "
Dobrý deň $customerName,

Ďakujeme za vašu rezerváciu na FastTransfer!

Vašu požiadavku sme úspešne prijali a budeme vás čoskoro kontaktovať pre potvrdenie.

DETAILY VAŠEJ REZERVÁCIE:
- Odkiaľ: $pickupLocation
- Kam: $dropoffLocation
- Dátum: $bookingDate
- Čas: $bookingTime
- Počet osôb: $passengers

Ak máte akékoľvek otázky, kontaktujte nás:
📞 +421 902 609 940
📧 info@fastransfer.sk

S pozdravom,
Tím FastTransfer
";

// Function to send email via SMTP socket
function sendSmtpEmail($host, $port, $user, $pass, $from, $to, $subject, $body) {
    $socket = @fsockopen("ssl://" . $host, $port, $errno, $errstr, 30);
    if (!$socket) {
        error_log("SMTP Connection failed: $errstr ($errno)");
        return false;
    }

    $response = fgets($socket, 515);
    if (substr($response, 0, 3) != '220') {
        fclose($socket);
        return false;
    }

    // EHLO
    fputs($socket, "EHLO " . $host . "\r\n");
    fgets($socket, 515);

    // AUTH LOGIN
    fputs($socket, "AUTH LOGIN\r\n");
    fgets($socket, 515);

    fputs($socket, base64_encode($user) . "\r\n");
    fgets($socket, 515);

    fputs($socket, base64_encode($pass) . "\r\n");
    $authResponse = fgets($socket, 515);
    if (substr($authResponse, 0, 3) != '235') {
        fclose($socket);
        error_log("SMTP Auth failed: $authResponse");
        return false;
    }

    // MAIL FROM
    fputs($socket, "MAIL FROM:<" . $from . ">\r\n");
    fgets($socket, 515);

    // RCPT TO
    fputs($socket, "RCPT TO:<" . $to . ">\r\n");
    fgets($socket, 515);

    // DATA
    fputs($socket, "DATA\r\n");
    fgets($socket, 515);

    // Headers and body
    $headers = "From: FastTransfer <$from>\r\n";
    $headers .= "To: <$to>\r\n";
    $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";
    $headers .= "\r\n";

    fputs($socket, $headers . $body . "\r\n.\r\n");
    fgets($socket, 515);

    // QUIT
    fputs($socket, "QUIT\r\n");
    fclose($socket);

    return true;
}

// Send email to admin
$adminEmailSent = sendSmtpEmail(
    $smtp_host,
    $smtp_port,
    $smtp_user,
    $smtp_pass,
    $smtp_user,
    $admin_email,
    "Nová rezervácia: $customerName",
    $messageBody
);

// Send confirmation to customer
$customerEmailSent = sendSmtpEmail(
    $smtp_host,
    $smtp_port,
    $smtp_user,
    $smtp_pass,
    $smtp_user,
    $customerEmail,
    "Potvrdenie rezervácie - FastTransfer",
    $customerMessageBody
);

// ===========================================
// 3. RETURN RESPONSE
// ===========================================
if ($adminEmailSent) {
    echo json_encode([
        "success" => true,
        "message" => "Rezervácia bola úspešne odoslaná",
        "dbSaved" => $dbSuccess,
        "emailSent" => $adminEmailSent,
        "customerNotified" => $customerEmailSent
    ]);
} else {
    // Try fallback with PHP mail() function
    $headers = "From: info@fastransfer.sk\r\n";
    $headers .= "Reply-To: $customerEmail\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $fallbackSent = mail($admin_email, "Nová rezervácia: $customerName", $messageBody, $headers);
    
    if ($fallbackSent || $dbSuccess) {
        echo json_encode([
            "success" => true,
            "message" => "Rezervácia bola prijatá",
            "dbSaved" => $dbSuccess
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Nepodarilo sa odoslať rezerváciu. Skúste to prosím znova."]);
    }
}
?>
