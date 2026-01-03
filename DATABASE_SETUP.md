# Datenbank-Setup für Produktion

Das Projekt verwendet jetzt **Prisma mit PostgreSQL** für persistente Datenspeicherung in der Produktion.

## 🚀 Schnellstart

### Option 1: Supabase (Empfohlen - Kostenlos & Einfach)

1. **Supabase-Projekt erstellen:**
   - Gehe zu [supabase.com](https://supabase.com)
   - Erstelle ein neues Projekt
   - Warte bis die Datenbank bereit ist

2. **DATABASE_URL finden:**
   - Gehe zu deinem Supabase-Projekt
   - Settings → Database
   - Scrolle zu "Connection string" → "URI"
   - Kopiere die Connection String (beginnt mit `postgresql://`)

3. **DATABASE_URL setzen:**
   - **Lokal:** Erstelle `.env.local`:
     ```env
     DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
     ```
   - **Vercel:** Gehe zu Project Settings → Environment Variables → Add:
     - Name: `DATABASE_URL`
     - Value: Deine Supabase Connection String

4. **Migration ausführen:**
   ```bash
   npx prisma db push
   ```

5. **Prisma Client generieren:**
   ```bash
   npx prisma generate
   ```

**Supabase Publishable Key:** `sb_publishable_VRseRHSOXvQvrUGfRCPP4w_7WUFPLkH`
*(Diese wird für Frontend-Integrationen verwendet, nicht für Prisma)*

### Option 2: Vercel Postgres (Empfohlen für Vercel-Deployments)

1. **Vercel Postgres erstellen:**
   - Gehe zu deinem Vercel-Dashboard
   - Wähle dein Projekt aus
   - Gehe zu "Storage" → "Create Database" → "Postgres"
   - Erstelle eine neue Postgres-Datenbank

2. **DATABASE_URL automatisch gesetzt:**
   - Vercel setzt die `DATABASE_URL` Umgebungsvariable automatisch
   - Keine manuelle Konfiguration nötig!

3. **Migration ausführen:**
   ```bash
   npx prisma db push
   ```
   Oder in Vercel: Die Migration läuft automatisch beim Build

### Option 2: Externe PostgreSQL-Datenbank

1. **DATABASE_URL in `.env` setzen:**
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
   ```

2. **Migration ausführen:**
   ```bash
   npx prisma db push
   ```

## 📋 Lokale Entwicklung

### Ohne Datenbank (JSON-Dateien)
- Funktioniert automatisch ohne `DATABASE_URL`
- Daten werden in `data/contacts.json` gespeichert

### Mit lokaler Datenbank
1. **SQLite für lokale Entwicklung:**
   ```env
   DATABASE_URL="file:./dev.db"
   ```
   
2. **Prisma Schema auf SQLite umstellen** (optional):
   - In `prisma/schema.prisma`: `provider = "sqlite"` statt `"postgresql"`
   - Dann: `npx prisma db push`

## 🔧 Nützliche Befehle

```bash
# Prisma Client generieren
npm run db:generate

# Datenbank-Schema pushen (ohne Migration)
npm run db:push

# Migration erstellen und anwenden
npm run db:migrate

# Prisma Studio öffnen (GUI für Datenbank)
npm run db:studio
```

## 📝 Wichtige Hinweise

- **Produktion:** `DATABASE_URL` muss gesetzt sein für persistente Speicherung
- **Lokale Entwicklung:** Funktioniert auch ohne `DATABASE_URL` (verwendet JSON-Dateien)
- **Automatischer Fallback:** Wenn keine `DATABASE_URL` vorhanden ist, werden JSON-Dateien verwendet
- **Supabase:** Die Publishable Key wird für Frontend-Integrationen verwendet, Prisma benötigt die Connection String (DATABASE_URL)

## 🔑 Supabase Connection String finden

1. Gehe zu deinem Supabase-Projekt-Dashboard
2. Klicke auf **Settings** (Zahnrad-Icon)
3. Wähle **Database** aus dem Menü
4. Scrolle zu **Connection string**
5. Wähle **URI** aus
6. Kopiere die Connection String - sie sieht so aus:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
   ```
7. Ersetze `[YOUR-PASSWORD]` mit deinem tatsächlichen Datenbank-Passwort (findest du in Project Settings → Database → Database password)

## 🐛 Troubleshooting

### "Prisma Client not generated"
```bash
npx prisma generate
```

### "Database connection failed"
- Prüfe ob `DATABASE_URL` korrekt gesetzt ist
- Prüfe ob die Datenbank erreichbar ist
- Prüfe Firewall/Netzwerk-Einstellungen

### "Migration failed"
```bash
npx prisma migrate reset  # ⚠️ Löscht alle Daten!
npx prisma db push        # Erstellt Schema neu
```

