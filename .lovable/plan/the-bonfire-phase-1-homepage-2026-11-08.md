# THE BONFIRE — Phase 1 Homepage

## What you'll get
A dark, cinematic homepage at `/`: a quiet scene of an original, cute ivory-white skeleton sitting on a log beside a small fire, with the headline "EVERY JOURNEY NEEDS A LIGHT." and a "Choose your journey" area for Elden Ring, Hollow Knight and Sekiro. Plus a short About page so the "About" link actually goes somewhere.

## Design
- Palette exactly as briefed (#101010 / #171717 / #202020, bone-white text, ember #D4773C used sparingly).
- Fonts: Cormorant Garamond (display serif headings) + Manrope (interface text).
- Header blends into the scene: wordmark left, "About" + "A COMPANION FOR THE JOURNEY" right.
- Hero: big two-line serif headline, supporting line, lots of empty space.
- Scene: generated illustration of an original chibi skeleton (oversized skull, hollow black eyes, ivory bones, holding a plain wooden stick) on a log beside a small fire, on a dark background, blended in with a soft vignette. Layered on top: a gentle flickering glow and a few drifting CSS embers. Motion stops for users who prefer reduced motion.
- Game selection: three "paths" laid out as tall, borderless typographic columns divided by thin lines — distinct title treatment per game (no game artwork). Hover: ember underline + warmer text; selected: lit marker and glow line. Keyboard accessible as a radio group with visible focus rings.
- After selecting: a small elegant message, e.g. "Elden Ring chosen. Its path opens in a later chapter." No navigation to unfinished pages.

## Not in this phase
AI features, login, database, game dashboards, 3D models, weapon swaps, skeleton animations. The skeleton is clearly a still illustration, wrapped so it can be swapped for a 3D model later.

## Technical details
- Files: `src/types/game.ts`, `src/data/games.ts`, `src/components/layout/Header.tsx`, `src/components/homepage/{HeroSection,BonfireScene,SkeletonPlaceholder,FireEffects,GameSelector,GameOption}.tsx`, `src/context/journey.tsx` (selected + hovered game state, single source of truth; hovered state reserved for future weapon swap), routes `index.tsx` and `about.tsx` with own head() metadata.
- `SkeletonPlaceholder` exposes props (`hoveredGame`, `selectedGame`) so a future R3F `SkeletonModel` can replace it without touching the page.
- Install `framer-motion` for entrance/selection transitions; embers/flicker in CSS. Tokens in `src/styles.css`, fonts via `<link>` in `__root.tsx`.
- Verify with Playwright: load, hover, click, keyboard selection, laptop + desktop widths, no console errors. Record architecture rules in AGENTS.md; save palette/fonts to memory.
