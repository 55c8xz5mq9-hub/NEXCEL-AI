# ✅ Neues Supabase-Projekt Setup

## Projekt-Informationen

**Neue Projekt-Referenz:** `wauwqvqxshxaswdqpusz`  
**Projekt-URL:** `https://wauwqvqxshxaswdqpusz.supabase.co`  
**Datenbank-Host:** `db.wauwqvqxshxaswdqpusz.supabase.co`

## 🔧 Connection String aus Supabase Dashboard holen

### Schritt 1: Gehe zu Supabase Dashboard
1. Öffne: https://supabase.com/dashboard
2. Wähle dein **neues Projekt** aus (wauwqvqxshxaswdqpusz)

### Schritt 2: Gehe zu Database Settings
1. Klicke auf **Settings** (⚙️ Zahnrad-Icon)
2. Klicke auf **Database** im linken Menü

### Schritt 3: Kopiere Connection String
1. Scrolle zu **Connection string**
2. Klicke auf den Tab **"Connection pooling"** (empfohlen)
3. **Kopiere die komplette URL** - sie sollte so aussehen:
   ```
   postgresql://postgres.wauwqvqxshxaswdqpusz:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```
   
   **Wichtig:** 
   - Die **Region** könnte anders sein (z.B. `us-east-1`, `eu-west-1`, etc.)
   - Kopiere die **exakte URL** aus dem Dashboard!

### Schritt 4: Ersetze [YOUR-PASSWORD]
In der kopierten URL, ersetze `[YOUR-PASSWORD]` mit: `Rk-2209%12345`

**Oder noch besser:** Wenn Supabase die URL bereits mit Passwort anzeigt, kopiere sie direkt!

### Schritt 5: In .env.local eintragen
Öffne `.env.local` und füge ein:
```env
DATABASE_URL="postgresql://postgres.wauwqvqxshxaswdqpusz:Rk-2209%12345@aws-0-[REGION].pooler.supabase.com:6543/postgres"
```

**Wichtig:** Ersetze `[REGION]` mit der tatsächlichen Region aus der kopierten URL!

### Schritt 6: Testen
```bash
node test-db-connection.js
```

Falls es funktioniert:
```bash
npx prisma db push
```

## 🔍 Alternative: Direkte Verbindung (URI)

Falls Connection Pooling nicht funktioniert:
1. Gehe zu **Connection string** → **URI** Tab
2. Kopiere die URL
3. Ersetze `[YOUR-PASSWORD]` mit `Rk-2209%12345`
4. Format:
   ```env
   DATABASE_URL="postgresql://postgres:Rk-2209%12345@db.wauwqvqxshxaswdqpusz.supabase.co:5432/postgres"
   ```

## ⚠️ Wichtig

- **Kopiere die URL direkt aus Supabase** - nicht manuell erstellen!
- Die **Region** muss korrekt sein
- Das Passwort muss **exakt** sein (keine Leerzeichen)

