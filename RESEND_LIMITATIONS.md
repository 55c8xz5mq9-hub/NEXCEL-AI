# ⚠️ Resend E-Mail-Limitierungen

## Problem identifiziert

Resend hat bestimmte Limitierungen für unverifizierte Domains:

### Mit `onboarding@resend.dev` (Test-Modus)

- ✅ **Funktioniert**: E-Mails können nur an die **registrierte Account-E-Mail-Adresse** gesendet werden
- ❌ **Funktioniert NICHT**: E-Mails an andere Adressen werden blockiert

**Deine registrierte E-Mail:** `55c8xz5mq9@privaterelay.appleid.com`

### Lösung für Produktion

Um E-Mails an **beliebige Adressen** zu senden, musst du:

1. **Domain verifizieren** bei Resend:
   - Gehe zu https://resend.com/domains
   - Klicke auf "Add Domain"
   - Füge `nexcel-ai.de` hinzu
   - Füge die DNS-Records hinzu (werden angezeigt)
   - Warte auf Verifizierung (kann einige Minuten dauern)

2. **FROM_EMAIL ändern** in `.env.local`:
   ```env
   FROM_EMAIL=noreply@nexcel-ai.de
   ```

3. **Server neu starten**

## Aktueller Status

- ✅ API Key ist gesetzt
- ✅ Resend SDK funktioniert
- ⚠️ Domain nicht verifiziert → E-Mails nur an registrierte Adresse möglich

## Testen

### Option 1: Test an registrierte Adresse
```
http://localhost:3001/api/test-email?to=55c8xz5mq9@privaterelay.appleid.com
```

### Option 2: Kontaktformular testen
- Fülle das Kontaktformular aus
- Verwende deine registrierte E-Mail-Adresse als Empfänger
- Du solltest die E-Mail erhalten

## Für Produktion

1. Domain bei Resend verifizieren
2. FROM_EMAIL auf `noreply@nexcel-ai.de` ändern
3. Server neu starten
4. Fertig! ✅

