# Supabase API-Schlüssel

## Projekt-Informationen

**Projekt-Referenz:** `wauwqvqxshxaswdqpusz`  
**Projekt-URL:** `https://wauwqvqxshxaswdqpusz.supabase.co`

## API-Schlüssel

### Secret Key (Server-seitig)
```
sb_secret_c7tHa22sJZgUfpLFbEqMtg_YygmguZp
```

**Verwendung:**
- Server-seitige API-Operationen
- Admin-Operationen
- Nicht für Prisma/Datenbank-Verbindungen!

### Publishable Key (Frontend)
```
sb_publishable_VRseRHSOXvQvrUGfRCPP4w_7WUFPLkH
```

**Verwendung:**
- Client-seitige Operationen
- Frontend-Integrationen

## ⚠️ Wichtig für Datenbank-Verbindung

Für Prisma/PostgreSQL-Verbindungen brauchst du **NICHT** den API-Key, sondern die **DATABASE_URL** (Connection String)!

### So holst du die DATABASE_URL:

1. Gehe zu: https://supabase.com/dashboard
2. Wähle dein Projekt: `wauwqvqxshxaswdqpusz`
3. Settings → Database
4. Scrolle zu **Connection string**
5. Klicke auf **"Connection pooling"** Tab
6. Kopiere die komplette URL
7. Ersetze `[YOUR-PASSWORD]` mit deinem Passwort: `Rk-2209%12345`

Die URL sollte so aussehen:
```
postgresql://postgres.wauwqvqxshxaswdqpusz:Rk-2209%12345@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

### In .env.local eintragen:

```env
# Datenbank-Verbindung (für Prisma)
DATABASE_URL="postgresql://postgres.wauwqvqxshxaswdqpusz:Rk-2209%12345@aws-0-[REGION].pooler.supabase.com:6543/postgres"

# Supabase API Keys (optional, für zukünftige Frontend-Integrationen)
NEXT_PUBLIC_SUPABASE_URL="https://wauwqvqxshxaswdqpusz.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sb_publishable_VRseRHSOXvQvrUGfRCPP4w_7WUFPLkH"
SUPABASE_SERVICE_ROLE_KEY="sb_secret_c7tHa22sJZgUfpLFbEqMtg_YygmguZp"
```

## Nach dem Eintragen:

```bash
# Teste die Verbindung
node test-db-connection.js

# Erstelle das Datenbank-Schema
npx prisma db push
```

