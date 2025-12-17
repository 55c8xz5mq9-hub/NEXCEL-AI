# 🚀 E-Mail-Setup - Schritt für Schritt Anleitung

## ⚠️ WICHTIG: Ohne API Key werden E-Mails NICHT versendet!

Ohne `RESEND_API_KEY` werden E-Mails nur in der Console geloggt, aber **nicht wirklich versendet**.

## 📋 Schritt-für-Schritt Anleitung

### 1. Resend Account erstellen

1. Gehe zu **[https://resend.com](https://resend.com)**
2. Klicke auf **"Sign Up"** (kostenlos)
3. Erstelle einen Account (100 E-Mails/Tag kostenlos)

### 2. API Key erstellen

1. Nach dem Login, gehe zu **"API Keys"** im Dashboard
2. Klicke auf **"Create API Key"**
3. Gib einen Namen ein (z.B. "NEXCEL AI Website")
4. Kopiere den API Key (beginnt mit `re_...`)
   - ⚠️ **WICHTIG**: Kopiere den Key sofort, er wird nur einmal angezeigt!

### 3. API Key in .env.local eintragen

1. Öffne die Datei `.env.local` im Projekt-Root
2. Ersetze `re_dein_api_key_hier` mit deinem echten API Key:

```env
RESEND_API_KEY=re_dein_echter_api_key_hier
```

3. Speichere die Datei

### 4. Server neu starten

```bash
# Stoppe den Server (Ctrl+C im Terminal)
# Dann starte neu:
npm run dev
```

### 5. E-Mail-Funktion testen

Öffne im Browser:
```
http://localhost:3001/api/test-email?to=deine-email@example.com
```

Ersetze `deine-email@example.com` mit deiner echten E-Mail-Adresse.

**Erwartetes Ergebnis:**
- ✅ Wenn API Key gesetzt ist: E-Mail wird versendet
- ⚠️ Wenn API Key fehlt: E-Mail wird nur in Console geloggt

### 6. Console-Logs prüfen

Schaue in die Terminal-Console, wo `npm run dev` läuft:

**✅ Erfolg:**
```
📧 [EMAIL SERVICE] RESEND_API_KEY: ✅ Set
📧 [EMAIL SERVICE] Using Resend API...
✅ [EMAIL SERVICE] Email sent successfully via Resend API
```

**❌ Problem:**
```
📧 [EMAIL SERVICE] RESEND_API_KEY: ❌ Not set
⚠️ [EMAIL SERVICE] DEV MODE - No RESEND_API_KEY found
📧 [DEV MODE] Email would be sent:
```

## 🔍 Troubleshooting

### E-Mails werden nicht versendet

1. **Prüfe ob API Key gesetzt ist:**
   ```bash
   # In .env.local sollte stehen:
   RESEND_API_KEY=re_...
   ```

2. **Prüfe Console-Logs:**
   - Suche nach `📧 [EMAIL SERVICE] RESEND_API_KEY:`
   - Wenn `❌ Not set` → API Key fehlt oder Server nicht neu gestartet

3. **Server neu starten:**
   - `.env.local` Änderungen werden nur beim Start geladen
   - Stoppe Server (Ctrl+C) und starte neu: `npm run dev`

4. **API Key prüfen:**
   - Gehe zu Resend Dashboard → API Keys
   - Stelle sicher, dass der Key aktiv ist

### Domain-Verifizierung (für Produktion)

Für die Produktion musst du deine Domain bei Resend verifizieren:

1. Gehe zu Resend Dashboard → **Domains**
2. Klicke auf **"Add Domain"**
3. Füge deine Domain hinzu (z.B. `nexcel-ai.de`)
4. Füge die DNS-Records hinzu (werden angezeigt)
5. Warte auf Verifizierung (kann einige Minuten dauern)

**Ohne verifizierte Domain:**
- E-Mails können nur von `@resend.dev` gesendet werden
- Für Produktion: Domain verifizieren!

## 📧 E-Mail-Templates

Das System sendet automatisch:

1. **Bestätigungs-E-Mail** an den Kunden
   - Mit Verifizierungslink (Double Opt-In)
   - Premium HTML-Design

2. **Benachrichtigungs-E-Mail** an Admin
   - Mit allen Kontaktdaten
   - Quick-Actions (Antworten, Anrufen)

## ✅ Checkliste

- [ ] Resend Account erstellt
- [ ] API Key erstellt und kopiert
- [ ] `.env.local` Datei erstellt
- [ ] API Key in `.env.local` eingetragen
- [ ] Server neu gestartet
- [ ] Test-E-Mail gesendet
- [ ] E-Mail erhalten ✅

## 🆘 Hilfe

Wenn du Probleme hast:

1. Prüfe die Console-Logs (detaillierte Fehlermeldungen)
2. Teste mit `/api/test-email?to=...`
3. Prüfe Resend Dashboard → Logs für E-Mail-Status
4. Stelle sicher, dass Server nach `.env.local` Änderungen neu gestartet wurde

