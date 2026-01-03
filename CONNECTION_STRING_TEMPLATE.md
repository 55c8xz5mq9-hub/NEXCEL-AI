# Deine Supabase Connection Strings

## Projekt-URL
```
https://wauwqvqxshxaswdqpusz.supabase.co
```

## Connection Pooling (Empfohlen für Next.js/Serverless)

**Format:**
```
postgresql://postgres.wauwqvqxshxaswdqpusz:[DEIN-PASSWORT]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

**Für .env.local:**
```env
DATABASE_URL="postgresql://postgres.wauwqvqxshxaswdqpusz:[DEIN-PASSWORT]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
```

## Direkte Verbindung (Alternative)

**Format:**
```
postgresql://postgres:[DEIN-PASSWORT]@db.wauwqvqxshxaswdqpusz.supabase.co:5432/postgres
```

**Für .env.local:**
```env
DATABASE_URL="postgresql://postgres:[DEIN-PASSWORT]@db.wauwqvqxshxaswdqpusz.supabase.co:5432/postgres"
```

## ⚠️ Wichtig:

1. **Ersetze `[DEIN-PASSWORT]`** mit deinem tatsächlichen Supabase-Datenbank-Passwort
2. **Hole das Passwort aus:** Supabase Dashboard → Settings → Database → Database password
3. **Falls du das Passwort nicht kennst:** Klicke auf "Reset database password" im Supabase Dashboard

## Nach dem Eintragen in .env.local:

```bash
# Teste die Verbindung
node test-db-connection.js

# Erstelle das Datenbank-Schema
npx prisma db push
```

