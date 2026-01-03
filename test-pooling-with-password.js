// Test Connection Pooling mit Passwort
const postgres = require('postgres');

// Passwort URL-encoden
const password = 'Rk-2209%12345';
const encodedPassword = encodeURIComponent(password);

// Teste verschiedene Pooling-Formate
const formats = [
  {
    name: 'Pooling Format 1 (postgres.PROJECT)',
    url: `postgresql://postgres.jzmyxsmiaxhbsgddbglj:${encodedPassword}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`
  },
  {
    name: 'Pooling Format 2 (nur postgres)',
    url: `postgresql://postgres:${encodedPassword}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`
  },
  {
    name: 'Direkt (Port 5432)',
    url: `postgresql://postgres:${encodedPassword}@db.jzmyxsmiaxhbsgddbglj.supabase.co:5432/postgres`
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
  console.log('🔍 Teste verschiedene Connection String Formate mit Passwort...\n');
  
  for (const format of formats) {
    const success = await testFormat(format);
    if (success) {
      console.log('✅ Eine Verbindung hat funktioniert!');
      process.exit(0);
    }
    await new Promise(resolve => setTimeout(resolve, 2000)); // Pause zwischen Tests
  }
  
  console.log('\n❌ Keine Verbindung hat funktioniert.');
  console.log('\n💡 Mögliche Probleme:');
  console.log('   1. Die Supabase-Datenbank ist nicht aktiv');
  console.log('   2. Port 5432/6543 ist blockiert (Firewall)');
  console.log('   3. Die Datenbank-Region ist anders (nicht eu-central-1)');
  console.log('   4. Hole die exakte URL aus Supabase Dashboard → Settings → Database');
  process.exit(1);
}

testAll();

