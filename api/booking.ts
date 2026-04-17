import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// ---------------------------------------------------------------------------
// Environment – fail fast if SMTP config is missing
// ---------------------------------------------------------------------------
function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// ---------------------------------------------------------------------------
// CORS headers
// ---------------------------------------------------------------------------
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function setCors(res: VercelResponse): void {
  Object.entries(CORS_HEADERS).forEach(([key, value]) => res.setHeader(key, value));
}

// ---------------------------------------------------------------------------
// Payload validation
// ---------------------------------------------------------------------------
interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  pickupLocation: string;
  dropoffLocation: string;
  date: string;
  time: string;
  passengers: number;
  confirmRequest?: string; // honeypot
}

function validatePayload(body: unknown): { valid: true; data: BookingPayload } | { valid: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }
  const b = body as Record<string, unknown>;

  const required: (keyof BookingPayload)[] = [
    'name', 'email', 'phone', 'pickupLocation', 'dropoffLocation', 'date', 'time', 'passengers',
  ];

  for (const field of required) {
    if (b[field] === undefined || b[field] === null || b[field] === '') {
      return { valid: false, error: `Missing required field: ${field}` };
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(b.email))) {
    return { valid: false, error: 'Invalid email address' };
  }

  const passengers = Number(b.passengers);
  if (!Number.isInteger(passengers) || passengers < 1 || passengers > 20) {
    return { valid: false, error: 'Invalid passenger count' };
  }

  return {
    valid: true,
    data: {
      name: String(b.name).trim(),
      email: String(b.email).trim().toLowerCase(),
      phone: String(b.phone).trim(),
      pickupLocation: String(b.pickupLocation).trim(),
      dropoffLocation: String(b.dropoffLocation).trim(),
      date: String(b.date).trim(),
      time: String(b.time).trim(),
      passengers,
      confirmRequest: b.confirmRequest ? String(b.confirmRequest) : '',
    },
  };
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // --- Honeypot anti-spam check ---
  const body = req.body as Record<string, unknown>;
  if (body?.confirmRequest) {
    console.warn('[booking] Honeypot triggered — bot submission blocked');
    // Return fake success to fool the bot
    return res.status(200).json({ success: true, message: 'Rezervácia bola úspešne prijatá' });
  }

  // --- Payload validation ---
  const validation = validatePayload(req.body);
  if (!validation.valid) {
    console.warn('[booking] Validation failed:', validation.error);
    return res.status(400).json({ error: validation.error });
  }
  const { data } = validation;

  // --- SMTP config from env (no hardcoded fallbacks) ---
  let smtpConfig: {
    host: string;
    port: number;
    user: string;
    pass: string;
    mailFrom: string;
    adminEmail: string;
  };

  try {
    smtpConfig = {
      host: getRequiredEnv('SMTP_HOST'),
      port: parseInt(getRequiredEnv('SMTP_PORT'), 10),
      user: getRequiredEnv('SMTP_USER'),
      pass: getRequiredEnv('SMTP_PASS'),
      mailFrom: process.env.MAIL_FROM || getRequiredEnv('SMTP_USER'),
      adminEmail: process.env.ADMIN_EMAIL || getRequiredEnv('SMTP_USER'),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'SMTP configuration error';
    console.error('[booking] Config error:', message);
    return res.status(500).json({ error: 'Server configuration error — contact support' });
  }

  // --- Create transporter ---
  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.port === 465,
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass,
    },
  });

  // --- Send admin notification ---
  let adminAccepted = 0;
  let adminRejected = 0;
  try {
    const adminResult = await transporter.sendMail({
      from: `FastTransfer VIP <${smtpConfig.mailFrom}>`,
      to: smtpConfig.adminEmail,
      subject: `Nová rezervácia: ${data.name}`,
      html: `
        <h2>Nová rezervácia</h2>
        <p><strong>Meno:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefón:</strong> ${data.phone}</p>
        <hr>
        <p><strong>Odkiaľ:</strong> ${data.pickupLocation}</p>
        <p><strong>Kam:</strong> ${data.dropoffLocation}</p>
        <p><strong>Dátum:</strong> ${data.date}</p>
        <p><strong>Čas:</strong> ${data.time}</p>
        <p><strong>Počet cestujúcich:</strong> ${data.passengers}</p>
      `,
    });
    adminAccepted = adminResult.accepted?.length ?? 0;
    adminRejected = adminResult.rejected?.length ?? 0;
    console.log(`[booking] Admin email accepted=${adminAccepted} rejected=${adminRejected}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[booking] Admin email send failed:', message);
    return res.status(500).json({ error: 'Chyba pri odosielaní notifikácie. Skúste to prosím znova.' });
  }

  // --- Send customer confirmation ---
  let customerAccepted = 0;
  let customerRejected = 0;
  try {
    const customerResult = await transporter.sendMail({
      from: `FastTransfer VIP <${smtpConfig.mailFrom}>`,
      to: data.email,
      subject: 'Potvrdenie rezervácie – FastTransfer VIP',
      html: `
        <h2>Ďakujeme za vašu rezerváciu!</h2>
        <p>Dobrý deň ${data.name},</p>
        <p>Vaša rezervácia bola úspešne prijatá. Čoskoro vás budeme kontaktovať s potvrdením.</p>
        <h3>Detaily rezervácie:</h3>
        <p><strong>Odkiaľ:</strong> ${data.pickupLocation}</p>
        <p><strong>Kam:</strong> ${data.dropoffLocation}</p>
        <p><strong>Dátum:</strong> ${data.date}</p>
        <p><strong>Čas:</strong> ${data.time}</p>
        <p><strong>Počet cestujúcich:</strong> ${data.passengers}</p>
        <hr>
        <p>Urgentné zmeny: <strong>+421 902 609 940</strong></p>
        <p>S pozdravom,<br>FastTransfer VIP Team</p>
      `,
    });
    customerAccepted = customerResult.accepted?.length ?? 0;
    customerRejected = customerResult.rejected?.length ?? 0;
    console.log(`[booking] Customer email accepted=${customerAccepted} rejected=${customerRejected}`);
  } catch (err) {
    // Non-fatal: admin was notified, log and continue
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[booking] Customer confirmation email failed:', message);
  }

  return res.status(200).json({
    success: true,
    message: 'Rezervácia bola úspešne prijatá',
    emailDelivery: {
      adminAccepted,
      adminRejected,
      customerAccepted,
      customerRejected,
    },
  });
}
