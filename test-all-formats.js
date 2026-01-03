// Teste verschiedene Connection String Formate
require('dotenv').config({ path: '.env.local' });

const postgres = require('postgres');

const baseUrl = process.env.DATABASE_URL;
if (!baseUrl) {
  console.error('❌ DATABASE_URL nicht gefunden');
  process.exit(1);
}

// Extrahiere Passwort aus der URL
const passwordMatch = baseUrl.match(/postgres(?:\.jzmyxsmiaxhbsgddbglj)?:([^@]+)@/);
if (!passwordMatch) {
  console.error('❌ Konnte Passwort nicht aus URL extrahieren');
  process.exit(1);
}
const password = passwordMatch[1];

console.log('🔍 Teste verschiedene Connection String Formate...\n');

const formats = [
  {
    name: 'Format 1: Connection Pooling (postgres.PROJECT)',
    url: `postgresql://postgres.jzmyxsmiaxhbsgddbglj:${password}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`
  },
  {
    name: 'Format 2: Connection Pooling (nur postgres)',
    url: `postgresql://postgres:${password}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
  },
  {
    name: 'Format 3: Direkt (db.PROJECT)',
    url: `postgresql://postgres:${password}@db.jzmyxsmiaxhbsgddbglj.supabase.co:5432/postgres`
  },
  {
    name: 'Format 4: Direkt mit Projekt-Ref im User',
    url: `postgresql://postgres.jzmyxsmiaxhbsgddbglj:${password}@db.jzmyxsmiaxhbsgddbglj.supabase.co:5432/postgres`
  }
];

async function testFormat(format) {
  const sql = postgres(format.url, {
    max: 1,
    connect_timeout: 10,
  });
  
  try {
    const result = await sql`SELECT version()`;
    console.log(`✅ ${format.name}`);
    console.log(`   PostgreSQL: ${result[0].version.substring(0, 60)}...`);
    await sql.end();
    console.log(`\n💡 Verwende diese URL in deiner .env.local:`);
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
  for (const format of formats) {
    const success = await testFormat(format);
    if (success) {
      process.exit(0);
    }
    await new Promise(resolve => setTimeout(resolve, 1000)); // Kurze Pause zwischen Tests
  }
  
  console.log('\n❌ Keine der Formate hat funktioniert.');
  console.log('\n💡 Mögliche Probleme:');
  console.log('   1. Das Passwort ist falsch');
  console.log('   2. Die Datenbank ist nicht aktiv');
  console.log('   3. Hole die korrekte URL direkt aus Supabase Dashboard');
  console.log('      → Settings → Database → Connection string → Connection pooling');
  process.exit(1);
}

testAll();

