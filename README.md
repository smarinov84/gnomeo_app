# Gnomeo – Onboarding & Garden Setup (Web)

AI‑first onboarding flow to set location, beds, units, and goals with a warm, modern UI.

## Tech
- React 18 + TypeScript
- Vite (fast dev/build)

## Getting started

1) Install deps
```bash
pnpm install
# or
npm install
# or
yarn
```

2) Run dev server
```bash
pnpm dev
# or: npm run dev / yarn dev
```

3) Build & preview
```bash
pnpm build && pnpm preview
```

## What’s included
- Warm theme with accessible contrast and responsive layout (`src/styles.css`).
- Onboarding wizard with steps:
  - Welcome
  - Location (geolocation + manual; editable zone)
  - Beds (units, dimensions, types; list management)
  - Goals (experience, focus)
  - Summary (review and finish)
- Local persistence to restore progress (`localStorage`).

## Notes & next steps
- Zone detection is a placeholder heuristic in `src/services/geoZone.ts`. Replace with a proper dataset/API lookup when licenses are confirmed.
- After finishing onboarding, the app currently displays an alert. Wire this to your garden overview route/screen when ready.
- This repo focuses on the Onboarding & Garden Setup epic for MVP.

## Architecture diagram (current MVP)

```mermaid
  flowchart TD
  subgraph UI[Web App (React + Vite)]
    A[Home / Landing]\nCTA: Get started
    B[AuthModal]\nEmail + Password
    C[OnboardingWizard]\nSteps: Welcome → Location → Beds → Goals → Summary
    A -->|Click Get started| B
    B -->|Sign up/in success| C
  end

  subgraph State[Providers / State]
    D[AuthProvider]\nclient-only user
    E[OnboardingProvider]\ncontext + reducer
  end

  subgraph Data[Local Storage]
    F[(gnomeo:auth:user)]
    G[(gnomeo:onboarding:v1)]
  end

  subgraph Services[Services]
    H[suggestZoneFromLocation]\nplaceholder heuristic
  end

  subgraph Routing[Routing]
    R[BrowserRouter]\n/ and /onboarding
  end

  subgraph Tests[Tests]
    T1[Vitest + RTL]\nhome.test.tsx
    T2[beds.test.tsx]
    T3[goals.test.tsx]
    T4[location.test.tsx]
  end

  R --> A
  R --> C
  D --> A
  D --> B
  D --> C
  E --> C
  D <--> F
  E <--> G
  C --> H
  T1 --> A
  T2 --> C
  T3 --> C
  T4 --> C
```

