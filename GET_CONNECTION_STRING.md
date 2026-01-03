# So holst du die korrekte Connection String aus Supabase

## Schritt-für-Schritt Anleitung:

1. **Gehe zu Supabase Dashboard:**
   - https://supabase.com/dashboard
   - Wähle dein Projekt aus

2. **Gehe zu Settings:**
   - Klicke auf das Zahnrad-Icon (⚙️) links unten
   - Oder: Klicke auf dein Projekt → Settings

3. **Gehe zu Database:**
   - Klicke auf **Database** im linken Menü

4. **Finde Connection string:**
   - Scrolle nach unten zu **Connection string**
   - Du siehst mehrere Optionen:
     - **URI** (direkte Verbindung)
     - **Connection pooling** (empfohlen für Serverless)
     - **Session mode**
     - **Transaction mode**

5. **Wähle Connection pooling:**
   - Klicke auf **Connection pooling**
   - Kopiere die URL (sie sieht so aus):
     ```
     postgresql://postgres.jzmyxsmiaxhbsgddbglj:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
     ```
   
   **Oder manuell erstellen:**
   - Projekt-URL: `https://jzmyxsmiaxhbsgddbglj.supabase.co`
   - Connection Pooling URL:
     ```
     postgresql://postgres.jzmyxsmiaxhbsgddbglj:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
     ```

6. **Hole das Passwort:**
   - Scrolle weiter nach unten zu **Database password**
   - Falls du das Passwort nicht kennst:
     - Klicke auf **Reset database password**
     - Kopiere das neue Passwort
   - Ersetze `[YOUR-PASSWORD]` in der URL mit dem Passwort

7. **Kopiere die komplette URL:**
   - Die URL sollte so aussehen:
     ```
     postgresql://postgres.jzmyxsmiaxhbsgddbglj:deinPasswort123@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
     ```

8. **Füge sie in .env.local ein:**
   ```env
   DATABASE_URL="postgresql://postgres.jzmyxsmiaxhbsgddbglj:deinPasswort123@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
   ```

## Wichtig:

- ✅ Verwende **Connection pooling** (Port 6543) für Serverless/Next.js
- ✅ Das Passwort muss korrekt sein
- ✅ Keine Leerzeichen in der URL
- ✅ Die URL muss in Anführungszeichen stehen

## Nach dem Eintragen:

```bash
npx prisma db push
```

Falls es weiterhin nicht funktioniert, prüfe:
- Ist die Supabase-Datenbank aktiv?
- Ist das Projekt nicht pausiert?
- Funktioniert deine Internetverbindung?

