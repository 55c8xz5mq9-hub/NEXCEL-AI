# LOCKED – Homepage-Regeln (NICHT IGNORIEREN)

**Zweck:** Verhindern, dass Änderungen an einer Section (z.B. Tech Vision Lab, Features) die gesamte Seite zerstören – Navigation und Hero mit Karussell müssen immer sichtbar bleiben.

---

## 1. Error Boundaries – NICHT ENTFERNEN

- **`components/ErrorBoundaries.tsx`**  
  Enthält `SectionErrorBoundary` und `RootErrorBoundary`. Diese Datei und ihre Verwendung **nicht löschen oder abschwächen**.

- **`components/MinimalNavFallback.tsx`**  
  Fallback-Navigation, wenn `Navigation.tsx` abstürzt. **Nicht entfernen.**

- **`app/layout.tsx`**  
  `RootErrorBoundary` um den Content-`div` (**{children}**) – **nicht entfernen.**

- **`app/page.tsx`**  
  Jede Section ist in `<SectionErrorBoundary sectionName="…">` gewickelt.  
  - **Keine Section ohne Error Boundary.**  
  - **Neue Section?** Immer in `SectionErrorBoundary` packen.

---

## 2. Reihenfolge auf der Homepage – NICHT ÄNDERN

Die Reihenfolge in `app/page.tsx` muss exakt so bleiben:

1. **Navigation** (mit Fallback `MinimalNavFallback` bei Fehler)
2. **HeroLuxury** (mit Karussell/SystemGallery)
3. **NextGenSection** (Technologie der nächsten Generation)
4. **TechVisionLabTeaser** (Tech Vision Lab)
5. **Features**
6. **ProjectsSection**
7. **WhyMe**
8. **TargetAudience**
9. **Footer**

---

## 3. Bei neuen Sections

- Immer in `<SectionErrorBoundary sectionName="Name der Section">` wickeln.
- Nicht an der Reihenfolge von **Navigation** und **Hero** rütteln.
- Keine globalen Styles oder `position: fixed` / `z-index` einsetzen, die Navigation oder Hero überdecken oder ausblenden.

---

## 4. TechVisionLabTeaser / externe Bilder

- Externe Platzhalterbilder (z.B. Unsplash) in `TechVisionLabTeaser` mit `unoptimized` auf `Image` nutzen, um Fehler in der Next.js Bild-Pipeline zu vermeiden.
- Keine Änderungen an `Navigation`, `HeroLuxury`, `NextGenSection` oder anderen **bestehenden** Sections nur deshalb, weil eine **neue** Section ergänzt wird.
