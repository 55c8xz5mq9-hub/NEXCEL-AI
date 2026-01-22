# Hero Component Visibility Diagnosis

## 1. Hero Import & Rendering

**File**: `app/page.tsx`
- Line 4: `import Hero from "@/components/Hero";` ✅ CORRECT
- Line 1579: `<Hero />` ✅ RENDERED
- Line 1578: Wrapped in `<div id="hero" className="relative" style={{ zIndex: 1 }}>` ⚠️ POTENTIAL ISSUE

**Hero Component Location**: `components/Hero.tsx` ✅ EXISTS

**Duplicate Check**: 
- Only one Hero.tsx in main project ✅
- Another exists in `NEXCEL AI Webseite 2/` (separate project, not used)

## 2. Background Overlays (Covering Hero)

### A) Body Pseudo-Elements (globals.css)
- `body::before` (Line 83-95): 
  - `position: fixed`
  - `z-index: 0`
  - Radial gradients with animation
  - **COVERS ENTIRE VIEWPORT**

- `body::after` (Line 97-107):
  - `position: fixed`
  - `z-index: 0`
  - Noise texture overlay
  - **COVERS ENTIRE VIEWPORT**

### B) AppBackground Component (app/layout.tsx)
- Line 216: `<AppBackground />` rendered in layout
- Contains:
  1. **NeuralAIBackground** (Canvas) - z-index: -1
  2. **RadialGradientOverlays** - z-index: 0 (fixed)
  3. **FloatingParticles** - z-index: 0 (fixed)

### C) Layout Content Wrapper (app/layout.tsx)
- Line 222-228: Content wrapper with `zIndex: 1`
- Hero is inside this wrapper

## 3. Z-Index Hierarchy (Current)

```
z-index: -1  → NeuralAIBackground (canvas)
z-index: 0   → body::before (fixed gradients)
z-index: 0   → body::after (fixed noise)
z-index: 0   → RadialGradientOverlays (fixed)
z-index: 0   → FloatingParticles (fixed)
z-index: 0   → hero-bg-layer (absolute) ❌ TOO LOW
z-index: 1   → Layout content wrapper
z-index: 1   → Hero wrapper div in page.tsx
z-index: 2   → hero-bg section (needs isolation)
z-index: 10  → Hero content
```

## 4. Problem Identified

**ROOT CAUSE**: 
- `hero-bg-layer` has `z-index: 0` but body::before/after are `fixed` with `z-index: 0`
- Fixed elements with same z-index render AFTER absolute elements
- Hero background layer is being covered by body pseudo-elements

## 5. Fixes Required

1. ✅ Add diagnostic marker to Hero (DONE)
2. ⚠️ Increase hero-bg-layer z-index to 1 (above body::before/after)
3. ⚠️ Add isolation: isolate to hero-bg section
4. ⚠️ Ensure hero-bg section has higher z-index than background overlays
