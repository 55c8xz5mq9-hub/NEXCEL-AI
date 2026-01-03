// Test mit dem tatsächlichen Passwort
require('dotenv').config({ path: '.env.local' });

const postgres = require('postgres');

// Passwort URL-encoden (Sonderzeichen müssen escaped werden)
const password = 'Rk-2209%12345';
const encodedPassword = encodeURIComponent(password);

const connectionString = `postgresql://postgres:${encodedPassword}@db.jzmyxsmiaxhbsgddbglj.supabase.co:5432/postgres`;

console.log('🔍 Teste Datenbankverbindung mit Passwort...');
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
      console.log('  (keine Tabellen vorhanden)');
    } else {
      tables.forEach(table => {
        console.log('  -', table.table_name);
      });
    }
    
    await sql.end();
    
    console.log('\n✅ Die Connection String funktioniert!');
    console.log('\n💡 Füge diese Zeile in deine .env.local ein:');
    console.log(`DATABASE_URL="${connectionString}"`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Verbindungsfehler:');
    console.error('  Fehler:', error.message);
    console.error('  Code:', error.code);
    
    await sql.end();
    process.exit(1);
  }
}

test();

