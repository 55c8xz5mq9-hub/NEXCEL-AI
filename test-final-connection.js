// Test mit der finalen Connection String
require('dotenv').config({ path: '.env.local' });

const postgres = require('postgres');

// Passwort URL-encoden (das % Zeichen muss encoded sein)
const password = 'Rk-2209%12345';
const encodedPassword = encodeURIComponent(password);

// Connection String mit neuem Projekt
const connectionString = `postgresql://postgres:${encodedPassword}@db.wauwqvqxshxaswdqpusz.supabase.co:5432/postgres`;

console.log('🔍 Teste Datenbankverbindung mit neuem Projekt...');
console.log('Connection String:', connectionString.replace(/:[^:@]+@/, ':****@'));

const sql = postgres(connectionString, {
  max: 1,
  connect_timeout: 15,
});

async function test() {
  try {
    const result = await sql`SELECT version()`;
    console.log('✅ Verbindung erfolgreich!');
    console.log('PostgreSQL Version:', result[0].version.substring(0, 60) + '...');
    
    // Prüfe Tabellen
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('\n📋 Vorhandene Tabellen:');
    if (tables.length === 0) {
      console.log('  (keine Tabellen vorhanden - Schema wird erstellt)');
    } else {
      tables.forEach(table => {
        console.log('  -', table.table_name);
      });
    }
    
    await sql.end();
    
    console.log('\n✅ Die Connection String funktioniert!');
    console.log('\n💡 Füge diese Zeile in deine .env.local ein:');
    console.log(`DATABASE_URL="${connectionString}"`);
    console.log('\n📝 Dann führe aus:');
    console.log('   npx prisma db push');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Verbindungsfehler:');
    console.error('  Fehler:', error.message);
    console.error('  Code:', error.code);
    
    if (error.message.includes('password') || error.message.includes('authentication')) {
      console.error('\n💡 Tipp: Das Passwort könnte falsch sein.');
      console.error('   Prüfe dein Passwort in Supabase Dashboard → Settings → Database');
    } else if (error.message.includes('CONNECT_TIMEOUT') || error.message.includes("Can't reach")) {
      console.error('\n💡 Tipp: Die Datenbank ist nicht erreichbar.');
      console.error('   - Prüfe ob die Supabase-Datenbank aktiv ist');
      console.error('   - Versuche Connection Pooling URL (Port 6543)');
      console.error('   - Prüfe deine Firewall/Netzwerk-Einstellungen');
    }
    
    await sql.end();
    process.exit(1);
  }
}

test();

