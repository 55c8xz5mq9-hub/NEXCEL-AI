# ⚠️ Wichtig: Verwende Connection Pooling!

## Problem
Die direkte Verbindung (Port 5432) schlägt fehl mit `CONNECT_TIMEOUT`.

## Lösung: Connection Pooling verwenden

Supabase verwendet **Connection Pooling** für Serverless-Umgebungen (wie Next.js). Du musst die **Connection Pooling URL** verwenden, nicht die direkte URI.

### So holst du die Connection Pooling URL:

1. **Gehe zu Supabase Dashboard:**
   - https://supabase.com/dashboard
   - Wähle Projekt: **wauwqvqxshxaswdqpusz**

2. **Settings → Database → Connection string**
3. **Klicke auf "Connection pooling" Tab** (nicht URI!)
4. **Kopiere die komplette URL**

Die URL sieht so aus:
```
postgresql://postgres.wauwqvqxshxaswdqpusz:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

**Wichtig:**
- Port ist **6543** (nicht 5432!)
- Host ist **pooler.supabase.com** (nicht db.wauwqvqxshxaswdqpusz.supabase.co)
- User ist **postgres.wauwqvqxshxaswdqpusz** (mit Projekt-Ref)

### In .env.local eintragen:

```env
DATABASE_URL="postgresql://postgres.wauwqvqxshxaswdqpusz:Rk-2209%2512345@aws-0-[REGION].pooler.supabase.com:6543/postgres"
```

**Wichtig:**
- Ersetze `[REGION]` mit der tatsächlichen Region aus der kopierten URL
- Passwort ist URL-encoded: `Rk-2209%2512345` (das `%` wird zu `%25`)

### Nach dem Eintragen:

```bash
# Teste die Verbindung
node test-db-connection.js

# Erstelle das Schema
npx prisma db push
```

## Warum Connection Pooling?

- ✅ Funktioniert in Serverless-Umgebungen (Vercel, etc.)
- ✅ Bessere Performance
- ✅ Automatisches Connection Management
- ✅ Port 5432 ist oft blockiert, 6543 funktioniert

