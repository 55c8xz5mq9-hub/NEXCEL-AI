# E-Mail-Service Setup - High-End Kontaktformular

## Übersicht

Das Kontaktformular sendet automatisch:
1. **Bestätigungs-E-Mail** an den Kunden (nach erfolgreicher Übermittlung) mit Verifizierungslink
2. **Benachrichtigungs-E-Mail** an den Admin (mit allen Kontaktdaten)

## ⚠️ WICHTIG: E-Mails funktionieren nur mit konfiguriertem API Key!

Ohne `RESEND_API_KEY` werden E-Mails **nur in der Console geloggt** und **nicht wirklich versendet**.

## Konfiguration

### 1. Resend API Key einrichten

1. Gehe zu [https://resend.com](https://resend.com)
2. Erstelle einen kostenlosen Account (100 E-Mails/Tag kostenlos)
3. Erstelle einen API Key
4. Erstelle eine `.env.local` Datei im Projekt-Root (falls nicht vorhanden)
5. Füge den API Key hinzu:

```env
RESEND_API_KEY=re_your_api_key_here
FROM_EMAIL=noreply@nexcel-ai.de
ADMIN_EMAIL=kontakt@nexcel-ai.de
NEXT_PUBLIC_BASE_URL=https://nexcel-ai.de
```

### 2. Testen der E-Mail-Funktion

Nach dem Einrichten kannst du die E-Mail-Funktion testen:

```bash
# Im Browser öffnen:
http://localhost:3001/api/test-email?to=deine-email@example.com
```

Oder direkt im Terminal:
```bash
curl "http://localhost:3001/api/test-email?to=deine-email@example.com"
```

### 3. Prüfen ob E-Mails funktionieren

1. **Console-Logs prüfen**: Schaue in die Terminal-Console, wo `npm run dev` läuft
2. **Nach diesen Logs suchen**:
   - `📧 [EMAIL SERVICE] RESEND_API_KEY: ✅ Set` → API Key ist konfiguriert
   - `📧 [EMAIL SERVICE] RESEND_API_KEY: ❌ Not set` → API Key fehlt
   - `⚠️ [EMAIL SERVICE] DEV MODE` → E-Mails werden nur geloggt
   - `✅ [EMAIL SERVICE] Email sent successfully` → E-Mail wurde versendet

### 2. Domain verifizieren (Produktion)

Für die Produktion musst du deine Domain bei Resend verifizieren:
1. Gehe zu Resend Dashboard → Domains
2. Füge deine Domain hinzu (z.B. `nexcel-ai.de`)
3. Füge die DNS-Records hinzu
4. Warte auf Verifizierung

### 3. Development Mode

Ohne API Key läuft das System im Development-Mode:
- E-Mails werden in der Console geloggt
- Keine echten E-Mails werden versendet
- Perfekt für lokale Entwicklung

## Features

### Premium E-Mail-Templates

- **Bestätigungs-E-Mail**: High-End HTML-Design mit Gradienten, Glassmorphism-Effekten
- **Admin-Benachrichtigung**: Übersichtliche Darstellung aller Kontaktdaten mit Quick-Actions

### Automatische Verarbeitung

- Daten werden automatisch im Backend gespeichert (`data/contacts.json`)
- E-Mails werden asynchron versendet (blockiert nicht die Antwort)
- E-Mail-Status wird in der Datenbank gespeichert

### Backend-Speicherung

Alle Kontakte werden gespeichert in:
- `data/contacts.json` - Alle Kontaktanfragen
- Mit vollständigen Metadaten (ID, Timestamp, Status, etc.)

## API-Endpunkt

**POST** `/api/kontakt`

**Request Body:**
```json
{
  "vorname": "Max",
  "nachname": "Mustermann",
  "email": "max@example.com",
  "telefon": "+49 123 456789",
  "unternehmen": "Beispiel GmbH",
  "betreff": "Projektanfrage",
  "nachricht": "Ich interessiere mich für..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Ihre Anfrage wurde erfolgreich übermittelt...",
  "contactId": "contact_1234567890_abc123"
}
```

## Troubleshooting

### E-Mails werden nicht versendet

1. Prüfe, ob `RESEND_API_KEY` in `.env.local` gesetzt ist
2. Prüfe die Console-Logs für Fehler
3. Im Development-Mode werden E-Mails nur geloggt

### Domain-Verifizierung

- Ohne verifizierte Domain funktioniert nur `@resend.dev`
- Für Produktion: Domain bei Resend verifizieren

