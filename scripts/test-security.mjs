import fetch from 'node-fetch';

const API_URL = 'https://fastransfer.sk/api/booking';

async function testSecurity() {
  console.log('🛡️  Spúšťam bezpečnostné testy pre FastTransfer API...\n');

  // 1. Test: Honeypot (Bot Simulation)
  console.log('🧪 1. Test: Honeypot (Simulácia Bota)');
  console.log('   Odosielam request s vyplneným poľom "confirmRequest"...');

  try {
    const start = Date.now();
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Bot Tester',
        email: 'bot@test.com',
        phone: '000000000',
        pickupLocation: 'Test A',
        dropoffLocation: 'Test B',
        date: '2025-01-01',
        time: '12:00',
        passengers: 1,
        confirmRequest: 'Bot Content' // 🚨 Honeypot!
      })
    });
    
    const data = await res.json();
    const duration = Date.now() - start;

    if (res.ok && data.success) {
      console.log(`✅ USPECH: API vrátilo "success" (${duration}ms)`);
      console.log('   (Bot si myslí, že uspel, ale email nebol odoslaný)');
    } else {
      console.error('❌ CHYBA: API malo vrátiť fake success, ale vrátilo:', res.status);
    }
  } catch (error) {
    console.error('❌ CHYBA PRIPOJENIA:', error);
  }

  // 2. Test: Missing Fields
  console.log('\n🧪 2. Test: Validácia (Chýbajúce polia)');
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // Missing name, email, etc.
        pickupLocation: 'Test'
      })
    });

    if (res.status === 400) {
      console.log('✅ USPECH: API správne odmietlo nekompletný request (400 Bad Request)');
    } else {
      console.error('❌ CHYBA: API malo vrátiť 400, ale vrátilo:', res.status);
    }
  } catch (error) {
    console.error('❌ CHYBA:', error);
  }

  console.log('\n🏁 Testy dokončené.');
}

testSecurity();
