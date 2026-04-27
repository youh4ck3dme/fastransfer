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
// HTML escaping – prevents XSS in email bodies
// ---------------------------------------------------------------------------
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ---------------------------------------------------------------------------
// Payload validation
// ---------------------------------------------------------------------------
interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  confirmContact?: string; // honeypot
}

function validatePayload(body: unknown): { valid: true; data: ContactPayload } | { valid: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }
  const b = body as Record<string, unknown>;

  const required: (keyof ContactPayload)[] = ['name', 'email', 'subject', 'message'];

  for (const field of required) {
    if (b[field] === undefined || b[field] === null || b[field] === '') {
      return { valid: false, error: `Missing required field: ${field}` };
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(b.email))) {
    return { valid: false, error: 'Invalid email address' };
  }

  const message = String(b.message).trim();
  if (message.length < 10) {
    return { valid: false, error: 'Message is too short' };
  }
  if (message.length > 5000) {
    return { valid: false, error: 'Message is too long' };
  }

  return {
    valid: true,
    data: {
      name: String(b.name).trim(),
      email: String(b.email).trim().toLowerCase(),
      phone: b.phone ? String(b.phone).trim() : undefined,
      subject: String(b.subject).trim(),
      message,
      confirmContact: b.confirmContact ? String(b.confirmContact) : '',
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
  if (body?.confirmContact) {
    console.warn('[contact] Honeypot triggered — bot submission blocked');
    // Return fake success to fool the bot
    return res.status(200).json({ success: true, message: 'Správa bola úspešne odoslaná' });
  }

  // --- Payload validation ---
  const validation = validatePayload(req.body);
  if (!validation.valid) {
    console.warn('[contact] Validation failed:', validation.error);
    return res.status(400).json({ error: validation.error });
  }
  const { data } = validation;

  // --- SMTP config from env ---
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
    console.error('[contact] Config error:', message);
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
  try {
    await transporter.sendMail({
      from: `FastTransfer VIP <${smtpConfig.mailFrom}>`,
      to: smtpConfig.adminEmail,
      replyTo: data.email,
      subject: `Nová správa od zákazníka: ${data.subject}`,
      html: `
        <h2>Nová správa od zákazníka</h2>
        <p><strong>Meno:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        ${data.phone ? `<p><strong>Telefón:</strong> ${escapeHtml(data.phone)}</p>` : ''}
        <hr>
        <p><strong>Predmet:</strong> ${escapeHtml(data.subject)}</p>
        <p><strong>Správa:</strong></p>
        <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
      `,
    });
    console.log('[contact] Admin notification sent');
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[contact] Admin email send failed:', message);
    return res.status(500).json({ error: 'Chyba pri odosielaní správy. Skúste to prosím znova.' });
  }

  // --- Send customer confirmation ---
  try {
    await transporter.sendMail({
      from: `FastTransfer VIP <${smtpConfig.mailFrom}>`,
      to: data.email,
      subject: 'Vaša správa bola prijatá – FastTransfer VIP',
      html: `
        <h2>Ďakujeme za vašu správu!</h2>
        <p>Dobrý deň ${escapeHtml(data.name)},</p>
        <p>Vašu správu sme úspešne prijali. Odpovieme vám v čo najkratšom čase.</p>
        <hr>
        <p><strong>Predmet:</strong> ${escapeHtml(data.subject)}</p>
        <p><strong>Vaša správa:</strong></p>
        <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
        <hr>
        <p>Urgentné veci: <strong>+421 911 923 573</strong></p>
        <p>S pozdravom,<br>FastTransfer VIP Team</p>
      `,
    });
    console.log('[contact] Customer confirmation email sent');
  } catch (err) {
    // Non-fatal: admin was notified, log and continue
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[contact] Customer confirmation email failed:', message);
  }

  return res.status(200).json({
    success: true,
    message: 'Správa bola úspešne odoslaná',
  });
}
