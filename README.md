# Binaural Finder

A desktop app that helps you find the right binaural beats and background noise for any activity — whether you're studying, doing deep work, meditating, or falling asleep.

Built with **Tauri v2**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

## What It Does

Binaural Finder maps 11 common activities to their ideal brainwave frequencies and noise colors, then gives you curated audio recommendations from YouTube, Spotify, and other sources.

### Activities

| Activity | Frequency | Brainwave | Best Noise |
|---|---|---|---|
| Reading | 10–12 Hz | Alpha | Pink |
| Light Study | 10–14 Hz | Alpha | Pink, White |
| Focus | 14–18 Hz | Low Beta | Pink, White |
| Deep Work | 16–20 Hz | Beta | White, Pink |
| Writing | 10–14 Hz | Alpha | Pink, Brown |
| Analytical Work | 18–24 Hz | High Beta | White |
| Creative Thinking | 8–10 Hz | Alpha | Pink, Brown |
| Relaxation | 8–10 Hz | Alpha | Brown, Pink |
| Meditation | 4–8 Hz | Theta | Brown, Pink |
| Pre-Sleep | 4–6 Hz | Theta | Brown |
| Sleep | 1–4 Hz | Delta | Brown |

### Features

- **Built-in binaural player** — generates real binaural beats directly in the app using the Web Audio API, with adjustable carrier frequency, beat frequency, and noise layer (white, pink, or brown)
- **Curated recommendations** — handpicked YouTube videos, Spotify playlists, and web tools for each activity
- **Session timer** — set a timer for your session with a notification when it's done
- **Favorites** — save activities you use often for quick access
- **Recent activities** — automatically tracks what you've used lately
- **Settings** — choose your default provider, session length, and link behavior
- **Dark theme** — easy on the eyes for late-night sessions

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Rust](https://www.rust-lang.org/tools/install) (latest stable)
- Tauri v2 system dependencies — see the [Tauri prerequisites guide](https://v2.tauri.app/start/prerequisites/)

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npx tauri dev
```

This starts both the Vite dev server and the Tauri window. Changes to the frontend hot-reload automatically.

### Build for production

```bash
npx tauri build
```

The built app will be in `src-tauri/target/release/bundle/`.

> **Note:** On macOS, the `.app` bundle is the most reliable output. DMG bundling may occasionally fail, but the app itself works fine.

## How to Use

1. **Pick an activity** — on the home screen, choose what you're about to do (e.g. Focus, Deep Work, Sleep)
2. **Read why it works** — each activity page explains the science behind the recommended frequency range and noise color
3. **Use the built-in player** — hit play to generate binaural beats right in the app. Adjust the carrier frequency, beat frequency, volume, and optional noise layer to your liking. **Use headphones** — binaural beats only work when each ear receives a slightly different frequency
4. **Browse recommendations** — scroll down for curated YouTube videos, Spotify playlists, and web tools. Click any recommendation to open it in your browser
5. **Set a timer** — choose a session length and start the timer. You'll get a notification when time is up
6. **Save favorites** — click the heart icon on any activity to save it for quick access from the Favorites page
7. **Adjust settings** — use the Settings page to set your default provider filter, session length, and whether links open in the browser

## Project Structure

```
src/                    # React frontend
  audio/engine.ts       # Web Audio API binaural beat generator
  components/           # Reusable UI components
  data/activities.ts    # Activity definitions with frequency mappings
  data/recommendations.ts # Curated audio recommendations
  hooks/useStore.ts     # App state management with localStorage persistence
  pages/                # Home, Activity, Favorites, Settings pages
  types/index.ts        # TypeScript type definitions
src-tauri/              # Rust backend (Tauri v2)
```

## License

MIT
