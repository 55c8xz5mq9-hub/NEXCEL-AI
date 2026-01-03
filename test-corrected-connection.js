// Test mit korrigierter Connection String
const postgres = require('postgres');

// Passwort URL-encoden (das % Zeichen muss zu %25 werden)
const password = 'Rk-2209%12345';
const encodedPassword = encodeURIComponent(password); // Wird zu: Rk-2209%2512345

// Korrigierte Connection String (ohne Klammern, mit URL-encoded Passwort)
const connectionString = `postgresql://postgres:${encodedPassword}@db.wauwqvqxshxaswdqpusz.supabase.co:5432/postgres`;

console.log('🔍 Teste korrigierte Datenbankverbindung...');
console.log('Connection String:', connectionString.replace(/:[^:@]+@/, ':****@'));
console.log('Passwort (encoded):', encodedPassword);

const sql = postgres(connectionString, {
  max: 1,
  connect_timeout: 15,
});

async function test() {
  try {
    const result = await sql`SELECT version()`;
    console.log('\n✅ Verbindung erfolgreich!');
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
    console.error('\n❌ Verbindungsfehler:');
    console.error('  Fehler:', error.message);
    console.error('  Code:', error.code);
    
    if (error.message.includes('password') || error.message.includes('authentication')) {
      console.error('\n💡 Tipp: Das Passwort könnte falsch sein.');
      console.error('   Prüfe dein Passwort in Supabase Dashboard → Settings → Database');
    } else if (error.message.includes('CONNECT_TIMEOUT') || error.message.includes("Can't reach")) {
      console.error('\n💡 Tipp: Die Datenbank ist nicht erreichbar.');
      console.error('   Mögliche Ursachen:');
      console.error('   1. Die Supabase-Datenbank ist nicht aktiv');
      console.error('   2. Port 5432 ist blockiert (versuche Connection Pooling mit Port 6543)');
      console.error('   3. Firewall/Netzwerk blockiert die Verbindung');
      console.error('\n   Versuche Connection Pooling URL aus Supabase Dashboard');
    }
    
    await sql.end();
    process.exit(1);
  }
}

test();

