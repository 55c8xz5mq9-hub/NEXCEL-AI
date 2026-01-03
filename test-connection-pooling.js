// Test Connection Pooling URL
require('dotenv').config({ path: '.env.local' });

const postgres = require('postgres');

async function testPooling() {
  // Versuche Connection Pooling URL (Port 6543)
  const directUrl = process.env.DATABASE_URL;
  
  if (!directUrl) {
    console.error('❌ DATABASE_URL ist nicht gesetzt!');
    process.exit(1);
  }
  
  // Erstelle Pooling URL (Port 6543 statt 5432)
  const poolingUrl = directUrl
    .replace(':5432/', ':6543/')
    .replace('@db.', '@aws-0-eu-central-1.pooler.supabase.com:6543/')
    .replace('postgres://', 'postgresql://')
    .replace('postgres@', 'postgres.jzmyxsmiaxhbsgddbglj@');
  
  console.log('🔍 Teste direkte Verbindung (Port 5432)...');
  await testUrl(directUrl, 'Direkt');
  
  console.log('\n🔍 Teste Connection Pooling (Port 6543)...');
  await testUrl(poolingUrl, 'Pooling');
}

async function testUrl(url, type) {
  const sql = postgres(url, {
    max: 1,
    connect_timeout: 10,
  });
  
  try {
    const result = await sql`SELECT version()`;
    console.log(`✅ ${type} Verbindung erfolgreich!`);
    console.log('   PostgreSQL Version:', result[0].version.substring(0, 50) + '...');
    await sql.end();
    return true;
  } catch (error) {
    console.log(`❌ ${type} Verbindung fehlgeschlagen:`);
    console.log('   Fehler:', error.message);
    await sql.end();
    return false;
  }
}

testPooling().then(() => {
  console.log('\n💡 Tipp: Verwende die funktionierende URL in deiner .env.local Datei');
  process.exit(0);
}).catch(err => {
  console.error('Fehler:', err);
  process.exit(1);
});

