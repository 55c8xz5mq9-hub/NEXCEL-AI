# Supabase Setup - Schnellstart

## ✅ Connection String erhalten

Deine Supabase Connection String:
```
postgresql://postgres:[YOUR-PASSWORD]@db.jzmyxsmiaxhbsgddbglj.supabase.co:5432/postgres
```

## 🔧 Setup-Schritte

### 1. Datenbank-Passwort finden

1. Gehe zu https://supabase.com/dashboard
2. Wähle dein Projekt aus
3. Gehe zu **Settings** → **Database**
4. Scrolle zu **Database password**
5. Kopiere das Passwort (oder setze ein neues)

### 2. DATABASE_URL setzen

**Wichtig:** Supabase verwendet Connection Pooling. Verwende die **Connection pooling** URL!

**Lokal (für Entwicklung):**

Erstelle eine Datei `.env.local` im Projekt-Root:

**Option A: Connection Pooling (Empfohlen)**
```env
DATABASE_URL="postgresql://postgres.jzmyxsmiaxhbsgddbglj:[DEIN-PASSWORT]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
```

**Option B: Direkte Verbindung**
```env
DATABASE_URL="postgresql://postgres:[DEIN-PASSWORT]@db.jzmyxsmiaxhbsgddbglj.supabase.co:5432/postgres"
```

**Wo findest du die richtige URL?**
1. Gehe zu Supabase Dashboard → Settings → Database
2. Scrolle zu "Connection string"
3. Wähle **Connection pooling** (empfohlen) oder **URI** (direkt)
4. Kopiere die URL und ersetze `[YOUR-PASSWORD]` mit deinem Passwort

**Wichtig:** Ersetze `[DEIN-PASSWORT]` mit deinem tatsächlichen Supabase-Datenbank-Passwort!

**Vercel (für Produktion):**

1. Gehe zu deinem Vercel-Projekt
2. Settings → Environment Variables
3. Add New:
   - **Name:** `DATABASE_URL`
   - **Value:** `postgresql://postgres:[DEIN-PASSWORT]@db.jzmyxsmiaxhbsgddbglj.supabase.co:5432/postgres`
   - **Environment:** Production, Preview, Development (alle auswählen)
4. Save

### 3. Datenbank-Schema erstellen

Nachdem die DATABASE_URL gesetzt ist:

```bash
# Prisma Client generieren
npx prisma generate

# Datenbank-Schema pushen (erstellt die Tabelle)
npx prisma db push
```

### 4. Testen

```bash
# Prisma Studio öffnen (GUI für Datenbank)
npx prisma studio
```

Öffnet einen Browser mit einer GUI, wo du die Datenbank-Inhalte sehen kannst.

## ✅ Fertig!

Nach diesen Schritten:
- ✅ Alle Kontaktanfragen werden dauerhaft in Supabase gespeichert
- ✅ Daten sind persistent und überall verfügbar
- ✅ Keine Datenverluste mehr

## 🔍 Troubleshooting

### "Error: P1001: Can't reach database server"
- Prüfe ob das Passwort korrekt ist
- Prüfe ob die DATABASE_URL korrekt formatiert ist
- Prüfe ob die Supabase-Datenbank aktiv ist

### "Error: P1000: Authentication failed"
- Das Passwort ist falsch
- Hole das korrekte Passwort aus Supabase Dashboard

### "Error: P2002: Unique constraint failed"
- Die Tabelle existiert bereits
- Führe `npx prisma db push --force-reset` aus (⚠️ löscht alle Daten!)

