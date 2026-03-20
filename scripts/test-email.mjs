import fetch from 'node-fetch';

const API_URL = 'https://fastransfer.sk/api/booking';

async function testRealEmail() {
  console.log('📧 Spúšťam test REÁLNEHO odoslania emailu...');

  const payload = {
    name: 'Test Email Verify',
    email: 'info@fastransfer.sk', // Pošleme to adminovi na kontrolu
    phone: '+421902609940',
    pickupLocation: 'TEST LOCATION A',
    dropoffLocation: 'TEST LOCATION B',
    date: '2025-12-31',
    time: '23:59',
    passengers: 1,
    // confirmRequest NEVYPĹŇAME (aby to nebol honeypot)
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (res.ok && data.success) {
      console.log('✅ API odpovedalo SUCCESS.');
      if (data.emailDelivery) {
        console.log('📊 SMTP diagnostika:', data.emailDelivery);
      }
      console.log('📨 Skontroluj inbox info@fastransfer.sk - mal by prísť nový email.');
      console.log('📨 Ak testuješ aj klienta, skontroluj aj jeho inbox/spam.');
    } else {
      console.error('❌ CHYBA API:', res.status, data);
    }
  } catch (error) {
    console.error('❌ CHYBA PRIPOJENIA:', error);
  }
}

testRealEmail();
