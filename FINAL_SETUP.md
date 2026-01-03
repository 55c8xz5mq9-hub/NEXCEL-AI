# ✅ Finale Datenbank-Setup Anleitung

## Projekt-Informationen

**Projekt-Referenz:** `wauwqvqxshxaswdqpusz`  
**Projekt-URL:** `https://wauwqvqxshxaswdqpusz.supabase.co`  
**Passwort:** `Rk-2209%12345`

## 🔧 Connection String aus Supabase Dashboard kopieren

Die automatisch generierten Formate funktionieren nicht. Du musst die **exakte URL** aus dem Supabase-Dashboard kopieren.

### Schritt-für-Schritt:

1. **Gehe zu Supabase Dashboard:**
   - https://supabase.com/dashboard
   - Wähle dein Projekt: **wauwqvqxshxaswdqpusz**

2. **Gehe zu Database Settings:**
   - Klicke auf **Settings** (⚙️ Zahnrad-Icon)
   - Klicke auf **Database** im linken Menü

3. **Kopiere Connection String:**
   - Scrolle zu **Connection string**
   - Klicke auf den Tab **"Connection pooling"** (empfohlen für Next.js)
   - **Kopiere die komplette URL** - sie sieht so aus:
     ```
     postgresql://postgres.wauwqvqxshxaswdqpusz:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
     ```
   
   **Wichtig:** 
   - Die **Region** könnte anders sein (z.B. `us-east-1`, `eu-west-1`, etc.)
   - Kopiere die **exakte URL** - nicht manuell erstellen!

4. **Ersetze [YOUR-PASSWORD]:**
   - In der kopierten URL, ersetze `[YOUR-PASSWORD]` mit: `Rk-2209%12345`
   - **Oder:** Wenn Supabase die URL bereits mit Passwort anzeigt, kopiere sie direkt!

5. **In .env.local eintragen:**
   ```env
   DATABASE_URL="postgresql://postgres.wauwqvqxshxaswdqpusz:Rk-2209%12345@aws-0-[REGION].pooler.supabase.com:6543/postgres"
   ```
   
   **Wichtig:** Ersetze `[REGION]` mit der tatsächlichen Region aus der kopierten URL!

### Alternative: Direkte Verbindung (URI)

Falls Connection Pooling nicht funktioniert:
1. Gehe zu **Connection string** → **URI** Tab
2. Kopiere die URL
3. Ersetze `[YOUR-PASSWORD]` mit `Rk-2209%12345`
4. Format:
   ```env
   DATABASE_URL="postgresql://postgres:Rk-2209%12345@db.wauwqvqxshxaswdqpusz.supabase.co:5432/postgres"
   ```

## Nach dem Eintragen:

```bash
# Teste die Verbindung
node test-db-connection.js

# Falls erfolgreich, erstelle das Schema
npx prisma db push
```

## ⚠️ Wichtig

- **Kopiere die URL direkt aus Supabase** - nicht manuell erstellen!
- Die **Region** muss korrekt sein
- Das Passwort muss **exakt** sein: `Rk-2209%12345`

