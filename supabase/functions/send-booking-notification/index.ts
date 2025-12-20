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
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0a0a0a; color: #ffffff; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .header { text-align: center; margin-bottom: 40px; }
            .logo { font-size: 28px; font-weight: bold; color: #d4af37; letter-spacing: 2px; }
            .card { background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%); border: 1px solid #d4af3730; border-radius: 16px; padding: 32px; margin-bottom: 24px; }
            .title { font-size: 24px; color: #d4af37; margin-bottom: 8px; }
            .subtitle { color: #888; font-size: 14px; }
            .detail-row { display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #333; }
            .detail-row:last-child { border-bottom: none; }
            .label { color: #888; font-size: 14px; }
            .value { color: #fff; font-weight: 600; }
            .highlight { background: linear-gradient(135deg, #d4af37 0%, #b8942d 100%); color: #000; padding: 16px 24px; border-radius: 8px; text-align: center; margin-top: 24px; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 40px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">FASTRANSFER</div>
              <p style="color: #d4af37; margin-top: 8px;">VIP PREPRAVA</p>
            </div>
            
            <div class="card">
              <h1 class="title">Ďakujeme za vašu rezerváciu!</h1>
              <p class="subtitle">Ozveme sa vám do 30 minút s potvrdením.</p>
              
              <div style="margin-top: 32px;">
                <div class="detail-row">
                  <span class="label">Odkiaľ</span>
                  <span class="value">${booking.pickupLocation}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Kam</span>
                  <span class="value">${booking.dropoffLocation}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Dátum</span>
                  <span class="value">${booking.bookingDate}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Čas vyzdvihnutia</span>
                  <span class="value">${booking.bookingTime}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Počet cestujúcich</span>
                  <span class="value">${booking.passengers}</span>
                </div>
              </div>
              
              <div class="highlight">
                <strong>Číslo pre urgentné zmeny: +421 911 620 520</strong>
              </div>
            </div>
            
            <div class="footer">
              <p>FastTransfer VIP | Prémiová preprava po Slovensku a Európe</p>
              <p>© 2024 FastTransfer. Všetky práva vyhradené.</p>
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
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f5f5; color: #333; margin: 0; padding: 20px; }
            .card { background: #fff; border-radius: 12px; padding: 24px; max-width: 500px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
            h1 { color: #d4af37; margin-bottom: 24px; }
            .row { padding: 12px 0; border-bottom: 1px solid #eee; }
            .label { color: #666; font-size: 12px; text-transform: uppercase; margin-bottom: 4px; }
            .value { font-weight: 600; font-size: 16px; }
            .contact { background: #f9f9f9; padding: 16px; border-radius: 8px; margin-top: 24px; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>🚗 Nová rezervácia</h1>
            
            <div class="row">
              <div class="label">Zákazník</div>
              <div class="value">${booking.customerName}</div>
            </div>
            <div class="row">
              <div class="label">Trasa</div>
              <div class="value">${booking.pickupLocation} → ${booking.dropoffLocation}</div>
            </div>
            <div class="row">
              <div class="label">Dátum a čas</div>
              <div class="value">${booking.bookingDate} o ${booking.bookingTime}</div>
            </div>
            <div class="row">
              <div class="label">Cestujúci</div>
              <div class="value">${booking.passengers}</div>
            </div>
            
            <div class="contact">
              <div class="label">Kontakt</div>
              <div class="value">📞 ${booking.customerPhone}</div>
              <div class="value">✉️ ${booking.customerEmail}</div>
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
