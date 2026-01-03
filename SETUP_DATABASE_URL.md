# ✅ Datenbank-URL korrekt einrichten

## Problem
Die automatisch generierten Connection Strings funktionieren nicht. Wir benötigen die **exakte URL** aus dem Supabase-Dashboard.

## Lösung: Hole die URL direkt aus Supabase

### Schritt 1: Gehe zu Supabase Dashboard
1. Öffne: https://supabase.com/dashboard
2. Wähle dein Projekt: **jzmyxsmiaxhbsgddbglj**

### Schritt 2: Gehe zu Database Settings
1. Klicke auf **Settings** (⚙️ Zahnrad-Icon)
2. Klicke auf **Database** im linken Menü

### Schritt 3: Kopiere Connection String
1. Scrolle zu **Connection string**
2. Du siehst mehrere Tabs:
   - **URI** (direkte Verbindung)
   - **Connection pooling** (empfohlen)
   - **Session mode**
   - **Transaction mode**

3. **Klicke auf "Connection pooling"** Tab
4. **Kopiere die komplette URL** - sie sollte so aussehen:
   ```
   postgresql://postgres.jzmyxsmiaxhbsgddbglj:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```
   
   **Wichtig:** Die Region könnte anders sein als `eu-central-1`!

### Schritt 4: Ersetze [YOUR-PASSWORD]
In der kopierten URL, ersetze `[YOUR-PASSWORD]` mit: `Rk-2209%12345`

**Wichtig:** Das `%` Zeichen muss URL-encoded sein! Verwende: `Rk-2209%2512345`

Oder noch besser: Kopiere die URL aus Supabase und Supabase ersetzt automatisch `[YOUR-PASSWORD]` mit dem korrekten Passwort!

### Schritt 5: In .env.local eintragen
Öffne `.env.local` und füge ein:
```env
DATABASE_URL="postgresql://postgres.jzmyxsmiaxhbsgddbglj:Rk-2209%2512345@aws-0-[REGION].pooler.supabase.com:6543/postgres"
```

**Ersetze `[REGION]`** mit der tatsächlichen Region aus der kopierten URL!

### Schritt 6: Testen
```bash
node test-db-connection.js
```

Falls es funktioniert:
```bash
npx prisma db push
```

## 🔍 Alternative: Verwende URI (direkte Verbindung)

Falls Connection Pooling nicht funktioniert:
1. Gehe zu **Connection string** → **URI** Tab
2. Kopiere die URL
3. Ersetze `[YOUR-PASSWORD]` mit `Rk-2209%2512345`
4. Verwende Port **5432**

## ⚠️ Wichtig

- Die **Region** in der URL muss korrekt sein (z.B. `eu-central-1`, `us-east-1`, etc.)
- Das Passwort muss **URL-encoded** sein: `Rk-2209%12345` → `Rk-2209%2512345`
- Oder: Kopiere die URL direkt aus Supabase, dann wird das Passwort automatisch richtig eingefügt

