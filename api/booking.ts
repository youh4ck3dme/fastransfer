import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import mysql from 'mysql2/promise';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type')
      .end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      name,
      email,
      phone,
      pickupLocation,
      dropoffLocation,
      date,
      time,
      passengers,
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !pickupLocation || !dropoffLocation || !date || !time || !passengers) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Connect to MySQL database on Websupport
    const connection = await mysql.createConnection({
      host: '37.9.175.195', // Websupport server IP
      user: '6jbcai7w',
      password: 'HesD@Bu2022',
      database: '6jbcai7w',
    });

    // Insert booking into database
    const [result] = await connection.execute(
      `INSERT INTO bookings (
        customer_name, customer_email, customer_phone,
        pickup_location, dropoff_location,
        booking_date, booking_time, passengers,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [name, email, phone, pickupLocation, dropoffLocation, date, time, passengers]
    );

    await connection.end();

    // Send email notification
    const transporter = nodemailer.createTransport({
      host: 'smtp.m1.websupport.sk',
      port: 465,
      secure: true,
      auth: {
        user: 'info@fastransfer.sk',
        pass: 'Fastransfer.sk1',
      },
    });

    // Email to admin
    await transporter.sendMail({
      from: 'info@fastransfer.sk',
      to: 'info@fastransfer.sk',
      subject: `Nová rezervácia - ${name}`,
      html: `
        <h2>Nová rezervácia</h2>
        <p><strong>Meno:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefón:</strong> ${phone}</p>
        <p><strong>Odkiaľ:</strong> ${pickupLocation}</p>
        <p><strong>Kam:</strong> ${dropoffLocation}</p>
        <p><strong>Dátum:</strong> ${date}</p>
        <p><strong>Čas:</strong> ${time}</p>
        <p><strong>Počet cestujúcich:</strong> ${passengers}</p>
      `,
    });

    // Email to customer
    await transporter.sendMail({
      from: 'info@fastransfer.sk',
      to: email,
      subject: 'Potvrdenie rezervácie - FastTransfer',
      html: `
        <h2>Ďakujeme za vašu rezerváciu!</h2>
        <p>Dobrý deň ${name},</p>
        <p>Vaša rezervácia bola úspešne prijatá. Čoskoro vás budeme kontaktovať.</p>
        <h3>Detaily rezervácie:</h3>
        <p><strong>Odkiaľ:</strong> ${pickupLocation}</p>
        <p><strong>Kam:</strong> ${dropoffLocation}</p>
        <p><strong>Dátum:</strong> ${date}</p>
        <p><strong>Čas:</strong> ${time}</p>
        <p><strong>Počet cestujúcich:</strong> ${passengers}</p>
        <p>S pozdravom,<br>FastTransfer Team</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: 'Rezervácia bola úspešne prijatá',
    });
  } catch (error) {
    console.error('Booking error:', error);
    return res.status(500).json({
      error: 'Chyba pri spracovaní rezervácie',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
