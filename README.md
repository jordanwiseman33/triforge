# TriForge

AI-powered triathlon and endurance training app. Vite + React frontend, Express proxy for Anthropic, Firebase for auth/data, optional Strava sync.

## Quick start

```bash
npm install
cp .env.example .env       # then fill in real values
npm run dev
```

`npm run dev` runs the Express proxy on `http://localhost:3000` and Vite on `http://localhost:5173` concurrently. Open the Vite URL.

## Environment

Copy `.env.example` to `.env` and set the values below. Anything missing makes the corresponding feature break loudly rather than silently.

| Var | Required for | Where to get it |
|---|---|---|
| `ANTHROPIC_API_KEY` | AI plan builder, coach chat, race verification | https://console.anthropic.com/ |
| `VITE_MODEL_OPUS` | Optional override; defaults to `claude-opus-4-7` | — |
| `VITE_MODEL_SONNET` | Optional override; defaults to `claude-sonnet-4-6` | — |
| `VITE_SUPPORT_EMAIL` | Fallback "email us directly" address shown in the support form | — |
| `RESEND_API_KEY` | In-app support form sends through Resend | https://resend.com/api-keys |
| `SUPPORT_TO_EMAIL` | Where support tickets land (defaults to `TriForgeTraining@gmail.com`) | — |
| `SUPPORT_FROM_EMAIL` | Sender. Defaults to `onboarding@resend.dev` (Resend sandbox). Swap to a verified domain sender once you verify `triforgetraining.com` in Resend. | — |
| `VITE_FIREBASE_*` (6 vars) | Auth + Firestore persistence | Firebase console → Project Settings → Your apps → Web app SDK config |
| `STRAVA_CLIENT_ID` / `STRAVA_CLIENT_SECRET` | Strava activity sync | https://www.strava.com/settings/api |
| `STRAVA_REDIRECT_URI` | Strava OAuth callback | Defaults to `http://localhost:3000/api/strava/callback` |
| `APP_URL` | Where Strava callback redirects back to | Defaults to `http://localhost:5173` |

## Setup checklist for a new environment

1. **Firebase project** (https://console.firebase.google.com/) — create project, enable Email/Password auth and Firestore. Copy the web SDK config into the `VITE_FIREBASE_*` vars. The default project id in `.firebaserc` is `triforge-d4957`; change it if you own a different project.
2. **Anthropic key** — create one and add it to `.env` as `ANTHROPIC_API_KEY`.
3. **Strava app** (optional) — register at https://www.strava.com/settings/api. Set "Authorization Callback Domain" to `localhost` for dev, then your production domain when you deploy.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Express proxy + Vite dev server, concurrently |
| `npm run server` | Just the Express proxy (port 3000) |
| `npm run build` | Production Vite build → `dist/` |
| `npm run preview` | Serve the built `dist/` locally |

## Backend proxy options

Three implementations of the same Anthropic proxy exist. Pick whichever fits your deploy target:

- **`server.js`** — Express. Used by `npm run dev` and the recommended path for a Node host. Also serves the Strava OAuth flow.
- **`api/claude.js`** — Vercel-style serverless. Drop the repo on Vercel and it'll route `/api/claude` here. (Strava endpoints are not implemented here.)
- **`functions/index.js`** — Firebase Functions. Deploy with `firebase deploy --only functions`. The Anthropic key is loaded as a Functions secret (`firebase functions:secrets:set ANTHROPIC_API_KEY`).

The Vite dev server proxies `/api/*` to `localhost:3000` so the frontend code uses the same `/api/claude` path regardless of which backend is live.

## Deploy

No CI yet. Manual paths:

- **Vercel** — set env vars in Vercel dashboard, push to main. `api/claude.js` becomes the proxy automatically.
- **Firebase Hosting + Functions** — `npm run build`, `firebase deploy`. Make sure the Functions secret is set first.

## Project layout

```
src/
  App.jsx          Main UI (single-file, ~1200 lines)
  data.js          Static reference data (foods, sports, tiers, etc.)
  firebase.js      Firebase init (reads VITE_FIREBASE_* env vars)
  main.jsx
  index.css
api/claude.js      Vercel serverless proxy
functions/         Firebase Functions proxy
server.js          Express proxy + Strava OAuth
HANDOFF.md         Current open issues / recent fixes
```
