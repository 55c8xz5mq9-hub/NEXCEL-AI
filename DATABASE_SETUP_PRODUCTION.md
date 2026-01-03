# 🚀 HIGH-END Datenbank-Setup für Production

Die Datenbank-Lösung verwendet **Supabase PostgreSQL** für Production und fällt automatisch auf JSON zurück für lokale Entwicklung.

## ✅ Was wurde implementiert:

1. **Supabase PostgreSQL Integration** (`lib/supabase-db.ts`)
   - Direkte PostgreSQL-Verbindung ohne Prisma
   - Automatische Tabellenerstellung
   - Robuste Fehlerbehandlung
   - Connection Pooling

2. **Hybride Datenbank-Logik** (`lib/database.ts`)
   - Verwendet Supabase wenn `DATABASE_URL` gesetzt ist
   - Fällt auf JSON zurück für lokale Entwicklung
   - Funktioniert automatisch in Production

## 📋 Setup-Schritte:

### 1. Supabase Connection String holen

1. Gehe zu: https://supabase.com/dashboard
2. Wähle dein Projekt: `wauwqvqxshxaswdqpusz`
3. Settings → Database
4. Scrolle zu **Connection string**
5. Klicke auf **"Connection pooling"** Tab
6. Kopiere die komplette URL
7. Ersetze `[YOUR-PASSWORD]` mit: `Rk-2209%12345`

**WICHTIG:** Das `%` im Passwort muss URL-encoded werden zu `%25`!

Die URL sollte so aussehen:
```
postgresql://postgres.wauwqvqxshxaswdqpusz:Rk-2209%2512345@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

### 2. .env.local erstellen/bearbeiten

Erstelle oder bearbeite `.env.local` im Projekt-Root:

```env
# Supabase PostgreSQL Connection (für Production)
DATABASE_URL="postgresql://postgres.wauwqvqxshxaswdqpusz:Rk-2209%2512345@aws-0-[REGION].pooler.supabase.com:6543/postgres"
```

**WICHTIG:** 
- Ersetze `[REGION]` mit deiner tatsächlichen Region (z.B. `eu-central-1`)
- Das `%` im Passwort muss als `%25` geschrieben werden

### 3. Verbindung testen

```bash
node test-supabase-connection.js
```

Wenn alles funktioniert, siehst du:
```
✅ Alle Tests erfolgreich! Datenbank ist bereit für Production.
```

### 4. Production Deploy

Die Datenbank funktioniert automatisch in Production, wenn:
- `DATABASE_URL` in Vercel/Production-Umgebung gesetzt ist
- Die URL korrekt formatiert ist
- Das Passwort URL-encoded ist

## 🔄 Wie es funktioniert:

1. **Mit DATABASE_URL (Production):**
   - Kontakte werden in Supabase PostgreSQL gespeichert
   - Sofort verfügbar im Admin-Panel
   - Persistente Speicherung
   - Funktioniert in Serverless-Umgebungen

2. **Ohne DATABASE_URL (Lokale Entwicklung):**
   - Kontakte werden in `data/contacts.json` gespeichert
   - Funktioniert lokal ohne Setup
   - Keine externe Abhängigkeit

## 🛠️ Troubleshooting:

### Fehler: "Connection timeout"
- Prüfe ob die URL korrekt ist
- Prüfe ob das Passwort URL-encoded ist (`%` → `%25`)
- Prüfe ob Connection Pooling verwendet wird (Port 6543)

### Fehler: "Table does not exist"
- Die Tabelle wird automatisch erstellt beim ersten Aufruf
- Prüfe die Logs für Fehlermeldungen

### Fehler: "Authentication failed"
- Prüfe ob das Passwort korrekt ist
- Prüfe ob URL-Encoding korrekt ist
- Prüfe ob die URL die richtige Region hat

## 📊 Datenbank-Schema:

Die Tabelle `contact_requests` wird automatisch erstellt mit:
- `id` (TEXT, PRIMARY KEY)
- `vorname`, `nachname`, `email`, `telefon`, `unternehmen`, `betreff`, `nachricht` (TEXT)
- `read`, `archived` (BOOLEAN)
- `created_at`, `updated_at` (TIMESTAMP)

## ✅ Fertig!

Nach dem Setup funktioniert die Datenbank automatisch:
- ✅ Kontaktformular speichert in Supabase
- ✅ Admin-Panel zeigt alle Kontakte
- ✅ Funktioniert in Production
- ✅ Automatischer Fallback auf JSON lokal

