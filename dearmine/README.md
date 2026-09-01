# Dearmine ❤️

Turn your feelings into a beautiful memory.

Dearmine is a romantic digital-surprise site. Pick an occasion, add a name,
message, photos, a theme and (optionally) a song, and get a private link like
`/s/dearmine-7K2P` you can send to someone. Everything is stored in the
browser's `localStorage` — no backend, no account, no server costs.

## Stack

- React 19 + Vite
- Tailwind CSS v4
- Framer Motion
- react-router-dom
- canvas-confetti

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview   # serves the production build locally
```

## How it works

1. **Home** (`/`) — brand, tagline, and a grid of 9 occasions.
2. **Create** (`/create/:occasionId`) — a form (recipient, sender, message,
   date, photos, theme, music) with a **live preview** of the real
   experience right next to it (stacked as tabs on mobile). Submitting
   generates a unique slug, saves everything to `localStorage`, and routes
   to the shareable page.
3. **Surprise page** (`/s/:slug`) — loads the saved data by slug and renders
   the occasion-specific interactive experience (birthday countdown, the
   proposal's dodging "No" button, an animated anniversary timeline, an
   opening envelope, etc.), themed with the chosen palette. A share sheet
   offers **Copy Link**, **WhatsApp**, and the **native Web Share API**
   where supported.
4. **My surprises** (`/my-surprises`) — lists everything created on this
   device, with quick open/delete.

## Data & privacy

Surprises (including uploaded photos and music, stored as base64 data URLs)
live entirely in the browser's `localStorage` on the device that created
them. There is no server, so a surprise link only works on the device that
made it unless you deploy this app with a real backend/database — the
storage layer (`src/utils/storage.js`) is written as a small, swappable
module so you can later replace it with a real API without touching the UI.

## Folder structure

```
src/
  components/     reusable UI (buttons, cards, uploader, share modal, ...)
  data/           occasions + theme definitions
  experiences/    one component per occasion's interactive experience
  pages/          Home, CreateSurprise, SurprisePage, MySurprises, NotFound
  utils/          storage, id generation, date helpers, confetti helpers
  App.jsx         router
  main.jsx        entry point
  index.css       Tailwind v4 theme tokens + base styles
```

## Notes

- Music never autoplays with sound — playback only starts when the visitor
  taps play.
- Reduced-motion preference is respected globally.
- All original branding, copy, and visual design — no third-party assets.
