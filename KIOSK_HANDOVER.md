# 🏛️ BIO-AI KIOSK MODE: Technical Architecture & Codex Handover Specification

> **Target Audience:** OpenAI Codex / GPT Astra / Engineering Partner  
> **Kiosk GitHub Repository:** https://github.com/ASHxOnAIR-MEH/kikos-bio-ai-  
> **Main Site Repository:** https://github.com/ASHxOnAIR-MEH/BIO-AI  
> **Live Kiosk Route:** `/kiosk` (or root `/` on the `kikos-bio-ai-` Vercel deployment)  
> **Local Dev Server:** `http://localhost:3000/kiosk`

---

## 1. ⚙️ Technology Stack & Dependencies

```json
{
  "framework": "Next.js 16.3.0 (App Router, Turbopack)",
  "language": "TypeScript 5.x",
  "core_library": "React 19.2.8 & React-DOM 19.2.8",
  "styling": "Tailwind CSS 4.x (@tailwindcss/postcss)",
  "animations": "Framer Motion 13.0.0",
  "3d_graphics": "Three.js 0.185.1, @react-three/fiber 9.7.0, @react-three/drei 10.7.8",
  "icons": "Lucide React 1.31.0, React Icons 5.7.0",
  "qr_generation": "qrcode 1.5.4",
  "database": "@supabase/supabase-js 2.118.0 (with autonomous in-memory fallback)"
}
```

---

## 2. 📱 Physical Hardware & UX Design System

- **Display Target:** 43" to 55" Portrait Touchscreen Kiosks (`1080 × 1920` px, Aspect Ratio: `9:16`).
- **Touch Accessibility:** Minimum button height of `56px` to `64px`, large touch targets, `touch-manipulation` CSS utility to avoid double-tap zoom delay.
- **Bilingual Engine:** 100% bilingual (**English `en`** and **Malayalam `ml`**) with native Malayalam typography (`font-malayalam`).
- **Auto-Reset Inactivity Watcher:** `src/components/kiosk/KioskInactivityMonitor.tsx` automatically resets the kiosk back to the welcome/language selection screen after **90 seconds of idle time**.
- **Color Palette Tokens:**
  - Deep Heritage Green: `#073B30`
  - Forest Emerald: `#0B5D46`
  - Accent Leaf Green: `#55B96A`
  - Kerala Kasavu Gold: `#D4AF37`
  - Background Canvas: `#FAFAF7` / `#F0F7F1`

---

## 3. 🗺️ Application Routing Architecture

### A. The Master Kiosk Hub (`/kiosk`)
- **File:** `src/app/kiosk/page.tsx`
- Contains the 4 main interactive experience cards:
  1. **Meet VEDA / Arogyamithran** (`/kiosk/arogyamithran`)
  2. **VedaVerse Flora Library** (`/kiosk/vedaverse`)
  3. **VEDA – The Lost Leaves Storybook** (`/kiosk/storybook`)
  4. **Connect with the Ecosystem** (`/kiosk/ecosystem`)

---

### B. Module 1: Arogyamithran 7-Screen Challenge Flow
- **Context Provider:** `src/components/kiosk/ArogyamithranContext.tsx` (holds selected language, registration ID, attempt ID)
- **Question Data Bank:** `src/data/arogyamithranQuizBank.json` (50+ curated bilingual questions across 5 classical Ayurveda & Bio-AI domains)
- **Scoring Engine:** `src/lib/quizEngine.ts` (+10 per correct answer, -5 negative marking per incorrect answer, 60s question timer)

| Step | Route | Component File | Description |
| :--- | :--- | :--- | :--- |
| **1** | `/kiosk/arogyamithran/language` | `src/app/kiosk/arogyamithran/language/page.tsx` | Select English or Malayalam. VEDA welcoming pose. |
| **2** | `/kiosk/arogyamithran/welcome` | `src/app/kiosk/arogyamithran/welcome/page.tsx` | Guide introduction & purpose. |
| **3** | `/kiosk/arogyamithran/register` | `src/app/kiosk/arogyamithran/register/page.tsx` | Fast touchscreen registration (Full Name, Mobile Number, optional Email, consent). |
| **4** | `/kiosk/arogyamithran/completed` | `src/app/kiosk/arogyamithran/completed/page.tsx` | Registration confirmation & Reg ID pill. |
| **5** | `/kiosk/arogyamithran/instructions` | `src/app/kiosk/arogyamithran/instructions/page.tsx` | Rules overview (10 questions, 60s per question, +10/-5 scoring). |
| **6** | `/kiosk/arogyamithran/challenge` | `src/app/kiosk/arogyamithran/challenge/page.tsx` | Live interactive quiz with VEDA reactions and speech bubbles. |
| **7** | `/kiosk/arogyamithran/results` | `src/app/kiosk/arogyamithran/results/page.tsx` | Final scorecard, golden trophy, dynamic VEDA celebration pose, and QR code to take result home on mobile. |
| **QR** | `/kiosk/result/[token]` | `src/app/kiosk/result/[token]/page.tsx` | Mobile certificate page loaded when scanning the results QR code. |

---

### C. Module 2: VedaVerse Flora Library (`/kiosk/vedaverse`)
- **Data Source:** `src/data/vedaversePlantBank.json` (100 complete botanical species monographs with Sanskrit names, Malayalam names, botanical names, chemical constituents, and medicinal uses).
- **Sub-pages:**
  - Catalog Grid: `/kiosk/vedaverse` (`src/app/kiosk/vedaverse/page.tsx`)
  - Dynamic Monograph: `/kiosk/vedaverse/[id]` (`src/app/kiosk/vedaverse/[id]/page.tsx`)
  - Interactive Game: `/kiosk/vedaverse/spice-quest` (`src/app/kiosk/vedaverse/spice-quest/page.tsx`) (**Spice Quest** - 6 puzzle levels including Spice Detective, Part Match, Memory Grid, Knowledge Match, Jigsaw, and Grand Master).

---

### D. Module 3: VEDA – The Lost Leaves Digital Storybook (`/kiosk/storybook`)
- **Component:** `src/components/kiosk/storybook/StorybookReader.tsx`
- **Manifest:** `src/lib/storybookData.ts`
- **Assets:** `public/storybook/` (`cover.png`, `pages/page-01.png` to `page-30.png`)
- **Features:**
  - Realistic 3D book cover opening animation (`transform: rotateY(-180deg)`).
  - Vertical CSS scroll snapping (`snap-y snap-mandatory`).
  - Preloaded adjacent pages (`page.isAvailable` check).
  - Optional ambient page-turn audio.
  - Slide-out contents drawer with thumbnail grid.
  - Page 30 completion modal with "Read Again" and "Return to Kiosk" actions.

---

### E. Module 4: Connect with the Ecosystem (`/kiosk/ecosystem`)
- **File:** `src/app/kiosk/ecosystem/page.tsx`
- Partners: Kerala Startup Mission (KSUM), Digital Hub Kochi, Kerala IT, Huddle Global, and Bio-AI CoE research facilities.

---

## 4. 🎭 VEDA Expression System & Asset Manifest

Managed centrally in `src/lib/kioskAssets.ts` and rendered via `src/components/kiosk/VedaGuide.tsx`:

```text
public/images/veda/
├── veda-welcome.png / .webp     → Welcoming (Language Selection)
├── veda-curious.png / .webp     → Curious / Surprised (Vedaverse Explorer)
├── veda-thinking.png / .webp    → Thinking (Active Question in Quiz)
├── veda-explaining.png / .webp  → Explaining (Meet VEDA Intro)
├── veda-happy.png / .webp       → Happy (Correct Answer Reaction)
├── veda-neutral.png / .webp     → Friendly / Neutral (Low-Score Reassurance)
├── veda-concerned.png / .webp   → Concerned / Reassuring (Wrong Answer Reaction)
├── veda-celebrating.png / .webp → Celebrating (Quiz Completion & High Scores >= 60)
└── veda-attentive.png / .webp   → Attentive Listening
```

**Usage in Code:**
```tsx
import VedaGuide from "@/components/kiosk/VedaGuide";

<VedaGuide
  expression="thinking" // "welcome" | "explaining" | "curious" | "happy" | "concerned" | "celebrating" | "attentive"
  language="en"         // "en" | "ml"
  dialogue="Take your time to analyze the classical verse."
  showDialogue={true}
/>
```

---

## 5. 🌐 Deployment & Dual-Repository Routing System

The codebase is pushed to two repositories with different root behaviors:
1. **`ASHxOnAIR-MEH/BIO-AI`:** The official marketing site. Root `/` serves the Bio-AI CoE landing page with MeitY, IndiaAI, Digital India, KSUM, and Kerala IT logos.
2. **`ASHxOnAIR-MEH/kikos-bio-ai-`:** The dedicated kiosk deployment.
   - Handled by:
     - **`next.config.ts`:** `redirects()` sends `/` to `/kiosk` (307) when `KIOSK_MODE` or `NEXT_PUBLIC_IS_KIOSK` is `"true"`, or `VERCEL_GIT_REPO_SLUG` / `VERCEL_URL` contains `kiko`/`kiosk`. This is evaluated at **build time** (the config is serialized into the build), so set these env vars before `next build`; setting them only at runtime has no effect.
     - **`src/components/kiosk/KioskAutoRedirect.tsx`:** Client-side fallback redirect on `kiko*` domains. Note: this component is not currently rendered by any layout or page, so it is inactive until mounted.
   - There is intentionally no `middleware.ts` / `proxy.ts`: a former `src/middleware.ts` duplicated the env-var check above and never ran ahead of it (config redirects run before Proxy), so it was removed when Next 16 deprecated the `middleware` convention.

---

## 6. 📝 Checklist for Codex / GPT Astra (Balance Work)

1. **Page 08 of Storybook:**
   - Asset pending: `public/storybook/pages/page-08.png`.
   - Update in `src/lib/storybookData.ts`: Set `isAvailable: true` for Page 08 once the design asset is added.
2. **Registration Touch Optimization:**
   - In `src/app/kiosk/arogyamithran/register/page.tsx`, ensure keyboard popups don't obstruct the "Start Challenge" button on physical touchscreen monitors.
3. **Supabase Cloud Sync (Optional):**
   - Provide `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel to sync leaderboard scores; currently runs seamlessly with memory fallbacks.
4. **Preserve Main Website Isolation:**
   - Do NOT modify the main website (`src/components/Navbar.tsx`, `Hero.tsx`, `About.tsx`) when working on Kiosk screens to keep the institutional government logos pristine.

