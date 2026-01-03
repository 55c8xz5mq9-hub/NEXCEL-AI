# ❌ Verbindungsfehler beheben

## Problem
Alle Connection String Formate schlagen fehl. Das bedeutet, dass wir die **exakte URL** aus dem Supabase-Dashboard benötigen.

## ✅ Lösung: Hole die URL direkt aus Supabase

### Schritt 1: Gehe zu Supabase Dashboard
1. Öffne: https://supabase.com/dashboard
2. Wähle dein Projekt aus (jzmyxsmiaxhbsgddbglj)

### Schritt 2: Gehe zu Database Settings
1. Klicke auf **Settings** (Zahnrad-Icon links unten)
2. Klicke auf **Database** im linken Menü

### Schritt 3: Hole Connection String
1. Scrolle nach unten zu **Connection string**
2. Du siehst mehrere Tabs:
   - **URI** (direkte Verbindung)
   - **Connection pooling** (empfohlen)
   - **Session mode**
   - **Transaction mode**

3. **Klicke auf "Connection pooling" Tab**
4. **Kopiere die komplette URL** - sie sollte so aussehen:
   ```
   postgresql://postgres.jzmyxsmiaxhbsgddbglj:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```

### Schritt 4: Hole das Passwort
1. Scrolle weiter nach unten zu **Database password**
2. Falls du das Passwort nicht siehst:
   - Klicke auf **Reset database password**
   - **Kopiere das neue Passwort sofort** (wird nur einmal angezeigt!)
3. Ersetze `[YOUR-PASSWORD]` in der kopierten URL mit dem Passwort

### Schritt 5: In .env.local eintragen
Öffne `.env.local` und füge ein:
```env
DATABASE_URL="postgresql://postgres.jzmyxsmiaxhbsgddbglj:DEIN_PASSWORT_HIER@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
```

**Wichtig:**
- Ersetze `DEIN_PASSWORT_HIER` mit dem tatsächlichen Passwort
- Die URL muss in Anführungszeichen stehen
- Keine Leerzeichen

### Schritt 6: Testen
```bash
node test-db-connection.js
```

Falls es funktioniert:
```bash
npx prisma db push
```

## 🔍 Falls es weiterhin nicht funktioniert:

### Prüfe Datenbank-Status
1. Gehe zu Supabase Dashboard
2. Prüfe ob die Datenbank **aktiv** ist
3. Prüfe ob das Projekt **nicht pausiert** ist

### Prüfe Passwort
- Das Passwort muss **exakt** so sein wie im Dashboard
- Keine zusätzlichen Leerzeichen
- URL-Encoding beachten (Sonderzeichen müssen escaped sein)

### Alternative: Verwende URI statt Connection Pooling
Falls Connection Pooling nicht funktioniert:
1. Gehe zu **Connection string** → **URI** Tab
2. Kopiere die direkte URL
3. Verwende Port **5432** statt 6543

