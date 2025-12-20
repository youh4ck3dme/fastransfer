import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingNotificationRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupLocation: string;
  dropoffLocation: string;
  bookingDate: string;
  bookingTime: string;
  passengers: number;
}

const sendEmail = async (to: string[], subject: string, html: string) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "FastTransfer VIP <onboarding@resend.dev>",
      to,
      subject,
      html,
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send email: ${error}`);
  }
  
  return response.json();
};

// Inline SVG icons as data URIs for email compatibility
const icons = {
  car: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`,
  location: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  arrow: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  star: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#d4af37" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const booking: BookingNotificationRequest = await req.json();
    console.log("Received booking notification request:", booking);

    // Send confirmation email to customer
    const customerEmailResponse = await sendEmail(
      [booking.customerEmail],
      "✓ Vaša rezervácia bola prijatá | FastTransfer VIP",
      `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
              background: linear-gradient(180deg, #0a0a0a 0%, #111111 100%); 
              color: #ffffff; 
              margin: 0; 
              padding: 0; 
              line-height: 1.6;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 48px 24px; 
            }
            .header { 
              text-align: center; 
              margin-bottom: 48px; 
              padding-bottom: 32px;
              border-bottom: 1px solid rgba(212, 175, 55, 0.2);
            }
            .logo-container {
              display: inline-block;
              padding: 16px 32px;
              background: linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 100%);
              border-radius: 12px;
              border: 1px solid rgba(212, 175, 55, 0.3);
            }
            .logo { 
              font-size: 32px; 
              font-weight: 800; 
              background: linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              letter-spacing: 3px; 
              margin: 0;
            }
            .tagline {
              color: #d4af37;
              font-size: 12px;
              letter-spacing: 4px;
              text-transform: uppercase;
              margin-top: 8px;
              font-weight: 500;
            }
            .success-badge {
              display: inline-flex;
              align-items: center;
              gap: 12px;
              background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%);
              border: 1px solid rgba(34, 197, 94, 0.3);
              border-radius: 50px;
              padding: 12px 24px;
              margin-bottom: 32px;
            }
            .success-text {
              color: #22c55e;
              font-weight: 600;
              font-size: 14px;
            }
            .card { 
              background: linear-gradient(135deg, #1a1a1a 0%, #141414 100%); 
              border: 1px solid rgba(212, 175, 55, 0.2); 
              border-radius: 20px; 
              padding: 40px; 
              margin-bottom: 24px;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            }
            .title { 
              font-size: 28px; 
              font-weight: 700;
              color: #ffffff; 
              margin: 0 0 8px 0;
              text-align: center;
            }
            .subtitle { 
              color: #888; 
              font-size: 15px;
              text-align: center;
              margin-bottom: 32px;
            }
            .route-section {
              background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%);
              border: 1px solid rgba(212, 175, 55, 0.2);
              border-radius: 16px;
              padding: 24px;
              margin-bottom: 24px;
            }
            .route-point {
              display: flex;
              align-items: flex-start;
              gap: 16px;
              padding: 12px 0;
            }
            .route-icon {
              flex-shrink: 0;
              width: 40px;
              height: 40px;
              background: rgba(212, 175, 55, 0.15);
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .route-label {
              color: #888;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 4px;
            }
            .route-value {
              color: #fff;
              font-weight: 600;
              font-size: 16px;
            }
            .route-divider {
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 8px 0;
              color: #d4af37;
            }
            .details-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 16px;
              margin-top: 8px;
            }
            .detail-card {
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-radius: 12px;
              padding: 16px;
              text-align: center;
            }
            .detail-icon {
              margin-bottom: 8px;
            }
            .detail-label {
              color: #666;
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 4px;
            }
            .detail-value {
              color: #fff;
              font-weight: 600;
              font-size: 15px;
            }
            .cta-section { 
              background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%); 
              color: #000; 
              padding: 24px 32px; 
              border-radius: 16px; 
              text-align: center; 
              margin-top: 32px;
              box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);
            }
            .cta-label {
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 2px;
              opacity: 0.8;
              margin-bottom: 8px;
            }
            .cta-phone {
              font-size: 22px;
              font-weight: 700;
              letter-spacing: 1px;
            }
            .features {
              display: flex;
              justify-content: center;
              gap: 24px;
              margin-top: 32px;
              padding-top: 24px;
              border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
            .feature {
              display: flex;
              align-items: center;
              gap: 8px;
              color: #888;
              font-size: 13px;
            }
            .footer { 
              text-align: center; 
              color: #555; 
              font-size: 12px; 
              margin-top: 48px;
              padding-top: 32px;
              border-top: 1px solid rgba(255, 255, 255, 0.05);
            }
            .footer a {
              color: #d4af37;
              text-decoration: none;
            }
            .social-links {
              margin-top: 16px;
            }
            @media only screen and (max-width: 480px) {
              .details-grid {
                grid-template-columns: 1fr;
              }
              .features {
                flex-direction: column;
                align-items: center;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo-container">
                <div class="logo">FASTRANSFER</div>
                <div class="tagline">VIP Preprava</div>
              </div>
            </div>
            
            <div style="text-align: center;">
              <div class="success-badge">
                ${icons.check}
                <span class="success-text">Rezervácia prijatá</span>
              </div>
            </div>
            
            <div class="card">
              <h1 class="title">Ďakujeme, ${booking.customerName}!</h1>
              <p class="subtitle">Vaša rezervácia bola úspešne prijatá. Ozveme sa vám do 30 minút s potvrdením.</p>
              
              <div class="route-section">
                <div class="route-point">
                  <div class="route-icon">${icons.location}</div>
                  <div>
                    <div class="route-label">Miesto vyzdvihnutia</div>
                    <div class="route-value">${booking.pickupLocation}</div>
                  </div>
                </div>
                
                <div class="route-divider">
                  ${icons.arrow} ${icons.arrow} ${icons.arrow}
                </div>
                
                <div class="route-point">
                  <div class="route-icon">${icons.location}</div>
                  <div>
                    <div class="route-label">Cieľová destinácia</div>
                    <div class="route-value">${booking.dropoffLocation}</div>
                  </div>
                </div>
              </div>
              
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 8px;">
                <tr>
                  <td width="33%" style="padding: 8px;">
                    <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 16px; text-align: center;">
                      <div style="margin-bottom: 8px;">${icons.calendar}</div>
                      <div style="color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Dátum</div>
                      <div style="color: #fff; font-weight: 600; font-size: 15px;">${booking.bookingDate}</div>
                    </div>
                  </td>
                  <td width="33%" style="padding: 8px;">
                    <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 16px; text-align: center;">
                      <div style="margin-bottom: 8px;">${icons.clock}</div>
                      <div style="color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Čas</div>
                      <div style="color: #fff; font-weight: 600; font-size: 15px;">${booking.bookingTime}</div>
                    </div>
                  </td>
                  <td width="33%" style="padding: 8px;">
                    <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 16px; text-align: center;">
                      <div style="margin-bottom: 8px;">${icons.users}</div>
                      <div style="color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Cestujúci</div>
                      <div style="color: #fff; font-weight: 600; font-size: 15px;">${booking.passengers}</div>
                    </div>
                  </td>
                </tr>
              </table>
              
              <div class="cta-section">
                <div class="cta-label">${icons.phone} Urgentné zmeny</div>
                <div class="cta-phone">+421 911 620 520</div>
              </div>
              
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding: 0 16px;">
                          <span style="color: #888; font-size: 13px;">${icons.star} Prémiové vozidlá</span>
                        </td>
                        <td style="padding: 0 16px;">
                          <span style="color: #888; font-size: 13px;">${icons.star} Profesionálni vodiči</span>
                        </td>
                        <td style="padding: 0 16px;">
                          <span style="color: #888; font-size: 13px;">${icons.star} 24/7 dostupnosť</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
            
            <div class="footer">
              <p style="margin: 0 0 8px 0;"><strong style="color: #d4af37;">FastTransfer VIP</strong></p>
              <p style="margin: 0;">Prémiová preprava po Slovensku a Európe</p>
              <p style="margin: 16px 0 0 0;">© 2024 FastTransfer. Všetky práva vyhradené.</p>
            </div>
          </div>
        </body>
        </html>
      `
    );

    console.log("Customer email sent:", customerEmailResponse);

    // Send notification to admin
    const adminEmailResponse = await sendEmail(
      ["onboarding@resend.dev"],
      `🚗 Nová rezervácia: ${booking.customerName}`,
      `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); 
              color: #333; 
              margin: 0; 
              padding: 32px; 
              line-height: 1.6;
            }
            .card { 
              background: #fff; 
              border-radius: 20px; 
              padding: 32px; 
              max-width: 500px; 
              margin: 0 auto; 
              box-shadow: 0 10px 40px rgba(0,0,0,0.1); 
            }
            .header {
              display: flex;
              align-items: center;
              gap: 16px;
              margin-bottom: 32px;
              padding-bottom: 24px;
              border-bottom: 2px solid #f0f0f0;
            }
            .header-icon {
              width: 56px;
              height: 56px;
              background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
              border-radius: 14px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
            }
            h1 { 
              color: #1a1a1a; 
              margin: 0;
              font-size: 24px;
              font-weight: 700;
            }
            .subtitle {
              color: #888;
              font-size: 14px;
              margin-top: 4px;
            }
            .section {
              margin-bottom: 24px;
            }
            .section-title {
              color: #888;
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 2px;
              margin-bottom: 12px;
              font-weight: 600;
            }
            .info-row {
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 14px 16px;
              background: #f8f9fa;
              border-radius: 12px;
              margin-bottom: 8px;
            }
            .info-icon {
              flex-shrink: 0;
            }
            .info-content {
              flex: 1;
            }
            .info-label {
              color: #888;
              font-size: 12px;
            }
            .info-value {
              color: #1a1a1a;
              font-weight: 600;
              font-size: 15px;
            }
            .route-card {
              background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
              border-radius: 16px;
              padding: 20px;
              color: #fff;
            }
            .route-row {
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 8px 0;
            }
            .route-text {
              font-weight: 600;
            }
            .route-arrow {
              text-align: center;
              padding: 8px 0;
              color: #d4af37;
            }
            .contact-card { 
              background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
              padding: 20px; 
              border-radius: 16px; 
              margin-top: 24px;
              color: #000;
            }
            .contact-row {
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 8px 0;
            }
            .contact-value {
              font-weight: 600;
              font-size: 16px;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <div class="header-icon">
                ${icons.car}
              </div>
              <div>
                <h1>Nová rezervácia</h1>
                <div class="subtitle">od ${booking.customerName}</div>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">Trasa</div>
              <div class="route-card">
                <div class="route-row">
                  <span style="color: #d4af37;">${icons.location}</span>
                  <span class="route-text">${booking.pickupLocation}</span>
                </div>
                <div class="route-arrow">↓</div>
                <div class="route-row">
                  <span style="color: #d4af37;">${icons.location}</span>
                  <span class="route-text">${booking.dropoffLocation}</span>
                </div>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">Detaily</div>
              <div class="info-row">
                ${icons.calendar}
                <div class="info-content">
                  <div class="info-label">Dátum a čas</div>
                  <div class="info-value">${booking.bookingDate} o ${booking.bookingTime}</div>
                </div>
              </div>
              <div class="info-row">
                ${icons.users}
                <div class="info-content">
                  <div class="info-label">Počet cestujúcich</div>
                  <div class="info-value">${booking.passengers}</div>
                </div>
              </div>
            </div>
            
            <div class="contact-card">
              <div class="section-title" style="color: rgba(0,0,0,0.6);">Kontakt na zákazníka</div>
              <div class="contact-row">
                ${icons.phone}
                <span class="contact-value">${booking.customerPhone}</span>
              </div>
              <div class="contact-row">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span class="contact-value">${booking.customerEmail}</span>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    );

    console.log("Admin email sent:", adminEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        customerEmail: customerEmailResponse,
        adminEmail: adminEmailResponse 
      }), 
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-booking-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
