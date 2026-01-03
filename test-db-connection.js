// Test-Datei um die Datenbankverbindung zu prüfen
require('dotenv').config({ path: '.env.local' });

const postgres = require('postgres');

async function testConnection() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('❌ DATABASE_URL ist nicht gesetzt!');
    console.error('Bitte setze DATABASE_URL in .env.local');
    process.exit(1);
  }
  
  console.log('🔍 Teste Datenbankverbindung...');
  console.log('Connection String:', connectionString.replace(/:[^:@]+@/, ':****@')); // Passwort verstecken
  
  const sql = postgres(connectionString);
  
  try {
    // Teste die Verbindung
    const result = await sql`SELECT version()`;
    console.log('✅ Verbindung erfolgreich!');
    console.log('PostgreSQL Version:', result[0].version);
    
    // Prüfe ob die Tabelle existiert
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('\n📋 Vorhandene Tabellen:');
    tables.forEach(table => {
      console.log('  -', table.table_name);
    });
    
    await sql.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Verbindungsfehler:');
    console.error('  Fehler:', error.message);
    console.error('  Code:', error.code);
    
    if (error.message.includes('password')) {
      console.error('\n💡 Tipp: Das Passwort könnte falsch sein.');
      console.error('   Prüfe dein Passwort in Supabase Dashboard → Settings → Database');
    } else if (error.message.includes('ECONNREFUSED') || error.message.includes("Can't reach")) {
      console.error('\n💡 Tipp: Die Datenbank ist nicht erreichbar.');
      console.error('   - Prüfe ob die Supabase-Datenbank aktiv ist');
      console.error('   - Versuche die Connection Pooling URL (Port 6543)');
      console.error('   - Prüfe deine Firewall/Netzwerk-Einstellungen');
    }
    
    await sql.end();
    process.exit(1);
  }
}

testConnection();

