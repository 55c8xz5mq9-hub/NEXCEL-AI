# Supabase Verbindungsfehler beheben

## Fehler: "Can't reach database server"

### Lösung 1: Connection Pooling URL verwenden

Supabase verwendet oft Connection Pooling. Prüfe in deinem Supabase-Dashboard:

1. Gehe zu **Settings** → **Database**
2. Scrolle zu **Connection string**
3. Wähle **Connection pooling** statt **URI**
4. Kopiere die Pooling-URL (beginnt mit `postgresql://postgres.xxx`)

Die Pooling-URL sieht so aus:
```
postgresql://postgres.jzmyxsmiaxhbsgddbglj:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

**Wichtig:** Port ist `6543` (nicht `5432`) für Pooling!

### Lösung 2: Direkte Verbindung (ohne Pooling)

Falls Pooling nicht funktioniert, verwende die direkte Verbindung:

1. Gehe zu **Settings** → **Database**
2. Scrolle zu **Connection string**
3. Wähle **URI** (nicht Connection pooling)
4. Kopiere die URL

### Lösung 3: Passwort prüfen

1. Gehe zu **Settings** → **Database**
2. Scrolle zu **Database password**
3. Falls du das Passwort vergessen hast:
   - Klicke auf **Reset database password**
   - Kopiere das neue Passwort
   - Aktualisiere deine `.env.local` Datei

### Lösung 4: Datenbank-Status prüfen

1. Gehe zu deinem Supabase-Dashboard
2. Prüfe ob die Datenbank aktiv ist
3. Falls nicht, starte sie neu

### Lösung 5: Firewall/Netzwerk

- Prüfe ob deine Firewall Port 5432 oder 6543 blockiert
- Prüfe ob du von deinem Standort aus auf Supabase zugreifen kannst

## Test-Verbindung

Nach dem Aktualisieren der `.env.local` Datei:

```bash
npx prisma db push
```

Falls es weiterhin nicht funktioniert, prüfe die Fehlermeldung genau.

