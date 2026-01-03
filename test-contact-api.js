/**
 * Test-Skript für die Kontakt-API
 * Führt verschiedene Tests durch, um sicherzustellen, dass die API korrekt funktioniert
 */

const testCases = [
  {
    name: "Vollständige, gültige Anfrage",
    data: {
      vorname: "Max",
      nachname: "Mustermann",
      email: "max.mustermann@example.com",
      telefon: "+49123456789",
      unternehmen: "Test GmbH",
      betreff: "Test-Anfrage",
      nachricht: "Dies ist eine Testnachricht mit mehr als 20 Zeichen."
    },
    expectedStatus: 201,
    expectedSuccess: true
  },
  {
    name: "Fehlende Pflichtfelder",
    data: {
      vorname: "Max",
      nachname: "Mustermann"
      // email, telefon, etc. fehlen
    },
    expectedStatus: 400,
    expectedSuccess: false
  },
  {
    name: "Ungültige E-Mail",
    data: {
      vorname: "Max",
      nachname: "Mustermann",
      email: "ungültige-email",
      telefon: "+49123456789",
      unternehmen: "Test GmbH",
      betreff: "Test",
      nachricht: "Dies ist eine Testnachricht mit mehr als 20 Zeichen."
    },
    expectedStatus: 400,
    expectedSuccess: false
  },
  {
    name: "Nachricht zu kurz",
    data: {
      vorname: "Max",
      nachname: "Mustermann",
      email: "max@example.com",
      telefon: "+49123456789",
      unternehmen: "Test GmbH",
      betreff: "Test",
      nachricht: "Kurz" // < 20 Zeichen
    },
    expectedStatus: 400,
    expectedSuccess: false
  }
];

async function testAPI() {
  const baseUrl = process.env.API_URL || "http://localhost:3000";
  console.log(`🧪 Teste Kontakt-API auf ${baseUrl}/api/kontakt\n`);

  let passed = 0;
  let failed = 0;

  for (const testCase of testCases) {
    try {
      console.log(`📋 Test: ${testCase.name}`);
      
      const response = await fetch(`${baseUrl}/api/kontakt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testCase.data),
      });

      const data = await response.json();
      const statusOk = response.status === testCase.expectedStatus;
      const successOk = data.success === testCase.expectedSuccess;

      if (statusOk && successOk) {
        console.log(`  ✅ Status: ${response.status}, Success: ${data.success}`);
        if (data.id) {
          console.log(`  ✅ Contact ID: ${data.id}`);
        }
        if (data.error) {
          console.log(`  ℹ️  Error: ${data.error}`);
        }
        passed++;
      } else {
        console.log(`  ❌ FEHLER:`);
        console.log(`     Erwartet: Status ${testCase.expectedStatus}, Success ${testCase.expectedSuccess}`);
        console.log(`     Erhalten: Status ${response.status}, Success ${data.success}`);
        if (data.error) {
          console.log(`     Error: ${data.error}`);
        }
        failed++;
      }
    } catch (error) {
      console.log(`  ❌ FEHLER: ${error.message}`);
      failed++;
    }
    console.log("");
  }

  console.log(`\n📊 Ergebnis: ${passed} Tests bestanden, ${failed} Tests fehlgeschlagen`);
  
  if (failed === 0) {
    console.log("✅ Alle Tests erfolgreich!");
    process.exit(0);
  } else {
    console.log("❌ Einige Tests sind fehlgeschlagen");
    process.exit(1);
  }
}

// Prüfe ob fetch verfügbar ist (Node.js 18+)
if (typeof fetch === "undefined") {
  console.error("❌ fetch ist nicht verfügbar. Bitte Node.js 18+ verwenden oder node-fetch installieren.");
  process.exit(1);
}

testAPI().catch(error => {
  console.error("❌ Unerwarteter Fehler:", error);
  process.exit(1);
});

