<?php
/**
 * LEGACY ENDPOINT - DISABLED
 *
 * This PHP endpoint has been decommissioned.
 * The booking flow now runs exclusively through the Vercel serverless function at /api/booking.
 *
 * Do NOT add logic, credentials, or SMTP config here.
 * This file is served from public/ and is world-readable.
 */
header("Content-Type: application/json; charset=utf-8");
http_response_code(410);
echo json_encode([
    "error" => "This endpoint has been removed. Use /api/booking instead."
]);
exit;
