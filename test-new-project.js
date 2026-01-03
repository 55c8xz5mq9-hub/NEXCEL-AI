// Test mit neuem Projekt: wauwqvqxshxaswdqpusz
require('dotenv').config({ path: '.env.local' });

const postgres = require('postgres');

// Passwort URL-encoden
const password = 'Rk-2209%12345';
const encodedPassword = encodeURIComponent(password);

// Teste verschiedene Formate mit neuem Projekt
const formats = [
  {
    name: 'Connection Pooling (postgres.PROJECT)',
    url: `postgresql://postgres.wauwqvqxshxaswdqpusz:${encodedPassword}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`
  },
  {
    name: 'Connection Pooling (nur postgres)',
    url: `postgresql://postgres:${encodedPassword}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`
  },
  {
    name: 'Direkt (Port 5432)',
    url: `postgresql://postgres:${encodedPassword}@db.wauwqvqxshxaswdqpusz.supabase.co:5432/postgres`
  }
];

async function testFormat(format) {
  const sql = postgres(format.url, {
    max: 1,
    connect_timeout: 15,
  });
  
  try {
    const result = await sql`SELECT version()`;
    console.log(`✅ ${format.name} - FUNKTIONIERT!`);
    console.log(`   PostgreSQL: ${result[0].version.substring(0, 60)}...`);
    
    // Prüfe Tabellen
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log(`   Tabellen: ${tables.length}`);
    if (tables.length > 0) {
      tables.forEach(table => {
        console.log(`     - ${table.table_name}`);
      });
    }
    
    await sql.end();
    
    console.log(`\n💡 Verwende diese URL in .env.local:`);
    console.log(`DATABASE_URL="${format.url}"\n`);
    return true;
  } catch (error) {
    console.log(`❌ ${format.name}`);
    console.log(`   Fehler: ${error.message.substring(0, 80)}`);
    await sql.end();
    return false;
  }
}

async function testAll() {
  console.log('🔍 Teste Verbindung mit neuem Projekt: wauwqvqxshxaswdqpusz\n');
  
  for (const format of formats) {
    const success = await testFormat(format);
    if (success) {
      console.log('✅ Verbindung erfolgreich!');
      process.exit(0);
    }
    await new Promise(resolve => setTimeout(resolve, 2000)); // Pause zwischen Tests
  }
  
  console.log('\n❌ Keine Verbindung hat funktioniert.');
  console.log('\n💡 Bitte hole die exakte URL aus Supabase Dashboard:');
  console.log('   → Settings → Database → Connection string → Connection pooling');
  process.exit(1);
}

testAll();

