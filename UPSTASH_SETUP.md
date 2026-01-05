# Upstash Redis Setup (ohne Vercel Marketplace)

Da der Vercel Marketplace für Upstash Redis nicht verfügbar ist, kannst du Upstash Redis direkt über die Upstash-Website einrichten.

## Schritt 1: Upstash-Konto erstellen

1. Gehe zu: https://console.upstash.com/
2. Erstelle ein kostenloses Konto (kostenlos für bis zu 10.000 Requests/Tag)
3. Klicke auf "Create Database"

## Schritt 2: Redis-Datenbank erstellen

1. Wähle "Redis" als Datenbanktyp
2. Wähle eine Region (z.B. "eu-central-1" für Deutschland)
3. Klicke auf "Create"
4. **WICHTIG**: Notiere dir die folgenden Werte:
   - `UPSTASH_REDIS_REST_URL` (z.B. `https://xxx.upstash.io`)
   - `UPSTASH_REDIS_REST_TOKEN` (ein langer Token-String)

## Schritt 3: Umgebungsvariablen in Vercel setzen

1. Gehe zu deinem Vercel-Dashboard
2. Wähle dein Projekt aus
3. Gehe zu "Settings" → "Environment Variables"
4. Füge folgende Variablen hinzu:
   - **Name**: `UPSTASH_REDIS_REST_URL`
     **Value**: Die URL aus Schritt 2
   - **Name**: `UPSTASH_REDIS_REST_TOKEN`
     **Value**: Der Token aus Schritt 2
5. Wähle für beide Variablen "Production", "Preview" und "Development"
6. Klicke auf "Save"
7. **WICHTIG**: Führe ein neues Deployment aus, damit die Variablen aktiv werden

## Schritt 4: Deployment

Nach dem Setzen der Umgebungsvariablen:
1. Gehe zu "Deployments"
2. Klicke auf die drei Punkte bei dem neuesten Deployment
3. Wähle "Redeploy"
4. Oder pushe einen neuen Commit zu GitHub

## Alternative: Ohne Upstash Redis

**WICHTIG**: Ohne Upstash Redis funktioniert die persistente Speicherung **NICHT** in Vercel Production, da `/tmp` nicht persistent ist.

Die Daten werden nur temporär gespeichert und gehen bei neuen Lambda-Instanzen verloren.

## Kosten

Upstash Redis ist **kostenlos** für:
- Bis zu 10.000 Requests pro Tag
- Bis zu 256 MB Speicher
- Perfekt für kleine bis mittlere Projekte

## Support

Falls du Hilfe brauchst:
- Upstash Docs: https://docs.upstash.com/redis
- Upstash Discord: https://discord.gg/upstash

