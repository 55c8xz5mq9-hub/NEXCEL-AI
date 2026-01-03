/**
 * Test Supabase Datenbank-Verbindung
 */

require('dotenv').config({ path: '.env.local' });

const { testConnection, saveContactToDB, getContactsFromDB } = require('./lib/supabase-db.ts');

async function test() {
  console.log('🔍 Teste Supabase Datenbank-Verbindung...\n');

  // 1. Teste Verbindung
  console.log('1️⃣ Teste Verbindung...');
  const connected = await testConnection();
  
  if (!connected) {
    console.error('❌ Verbindung fehlgeschlagen!');
    console.log('\n📝 Bitte prüfe:');
    console.log('   - Ist DATABASE_URL in .env.local gesetzt?');
    console.log('   - Ist die URL korrekt formatiert?');
    console.log('   - Ist das Passwort URL-encoded? (z.B. % wird zu %25)');
    process.exit(1);
  }

  // 2. Teste Speichern
  console.log('\n2️⃣ Teste Kontakt speichern...');
  try {
    const testContact = {
      vorname: 'Test',
      nachname: 'User',
      email: 'test@example.com',
      telefon: '+49123456789',
      unternehmen: 'Test GmbH',
      betreff: 'Test-Anfrage',
      nachricht: 'Dies ist eine Testnachricht mit mehr als 20 Zeichen für die Datenbank.',
    };

    const saved = await saveContactToDB(testContact);
    console.log('✅ Kontakt gespeichert:', saved.id);
  } catch (error) {
    console.error('❌ Fehler beim Speichern:', error.message);
    process.exit(1);
  }

  // 3. Teste Laden
  console.log('\n3️⃣ Teste Kontakte laden...');
  try {
    const contacts = await getContactsFromDB();
    console.log(`✅ ${contacts.length} Kontakte geladen`);
    if (contacts.length > 0) {
      console.log('   Neuester Kontakt:', contacts[0].vorname, contacts[0].nachname);
    }
  } catch (error) {
    console.error('❌ Fehler beim Laden:', error.message);
    process.exit(1);
  }

  console.log('\n✅ Alle Tests erfolgreich! Datenbank ist bereit für Production.');
}

test().catch(console.error);

