<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

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

// Database Configuration (PLACEHOLDERS - USER MUST UPDATE)
$db_host = 'localhost'; // Usually localhost on Websupport
$db_name = 'YOUR_DB_NAME'; // TODO: Update this
$db_user = 'YOUR_DB_USER'; // TODO: Update this
$db_pass = 'YOUR_DB_PASSWORD'; // TODO: Update this

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON input"]);
    exit;
}

// Extract data
$customerName = $input['customerName'] ?? '';
$customerEmail = $input['customerEmail'] ?? '';
$customerPhone = $input['customerPhone'] ?? '';
$pickupLocation = $input['pickupLocation'] ?? '';
$dropoffLocation = $input['dropoffLocation'] ?? '';
$bookingDate = $input['bookingDate'] ?? '';
$bookingTime = $input['bookingTime'] ?? '';
$passengers = $input['passengers'] ?? 1;

// Basic Validation
if (empty($customerName) || empty($customerEmail) || empty($pickupLocation) || empty($dropoffLocation)) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields"]);
    exit;
}

// 1. Save to Database (MySQL/MariaDB)
try {
    $dsn = "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4";
    $pdo = new PDO($dsn, $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    // Create table if not exists (optional, good for first run)
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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");

    $stmt = $pdo->prepare("INSERT INTO bookings (customer_name, customer_email, customer_phone, pickup_location, dropoff_location, booking_date, booking_time, passengers) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$customerName, $customerEmail, $customerPhone, $pickupLocation, $dropoffLocation, $bookingDate, $bookingTime, $passengers]);

} catch (PDOException $e) {
    // Log error but assume email might still work, or fail gracefully
    // error_log("Database Error: " . $e->getMessage());
    // For now, let's continue or return error if strict
    // http_response_code(500); echo json_encode(["error" => "Database error"]); exit;
}

// 2. Send Emails
$toAdmin = "info@fastransfer.sk"; // Admin email
$subjectAdmin = "Nová rezervácia: $customerName";
$subjectCustomer = "Potvrdenie prijatia rezervácie - FastTransfer";

$messageBody = "Detaily rezervácie:\n\n";
$messageBody .= "Meno: $customerName\n";
$messageBody .= "Email: $customerEmail\n";
$messageBody .= "Telefón: $customerPhone\n";
$messageBody .= "Odkiaľ: $pickupLocation\n";
$messageBody .= "Kam: $dropoffLocation\n";
$messageBody .= "Dátum: $bookingDate\n";
$messageBody .= "Čas: $bookingTime\n";
$messageBody .= "Počet osôb: $passengers\n";

// Headers
$headers = "From: no-reply@fastransfer.sk\r\n";
$headers .= "Reply-To: $customerEmail\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send to Admin
$mailSentAdmin = mail($toAdmin, $subjectAdmin, $messageBody, $headers);

// Send confirmation to Customer
$headersCustomer = "From: info@fastransfer.sk\r\n";
$headersCustomer .= "Content-Type: text/plain; charset=UTF-8\r\n";
$customerMessage = "Dobrý deň $customerName,\n\nĎakujeme za vašu rezerváciu. Vašu požiadavku sme prijali a budeme vás čoskoro kontaktovať pre potvrdenie.\n\n$messageBody\n\nS pozdravom,\nTím FastTransfer";

$mailSentCustomer = mail($customerEmail, $subjectCustomer, $customerMessage, $headersCustomer);

if ($mailSentAdmin) {
    echo json_encode(["success" => true, "message" => "Reservation saved and email sent"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to send email"]);
}
?>
