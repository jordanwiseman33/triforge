# TriForge — Issue Handoff
_Last updated: 2026-05-18_

---

## OPEN

### Bug: invalid `anthropic-beta` header in Firebase Functions
**File:** `functions/index.js:33`

`anthropic-beta: "web-search-1"` is not a valid beta identifier — Anthropic will reject any web-search-enabled request with a 400. `server.js:26` correctly uses `web-search-2025-03-05`.

**Fix:** Change the header to `web-search-2025-03-05` (or align with whatever the Express proxy is using). Only matters if you actually deploy to Firebase Functions; the Express proxy is currently the path used by `npm run dev`.

---

### Stale default model identifiers
**File:** `src/App.jsx:534, 573` (and `.env.example:5-6`)

Fallback models are `claude-opus-4-6` / `claude-sonnet-4-6`. Current latest is **Opus 4.7** (`claude-opus-4-7`) and **Sonnet 4.6** (`claude-sonnet-4-6`). Opus calls fall back to a non-latest model when `VITE_MODEL_OPUS` isn't set.

**Fix:** Bump the fallback constant to `claude-opus-4-7`, or set `VITE_MODEL_OPUS=claude-opus-4-7` in `.env`.

---

### Generic API error messages
**File:** `src/App.jsx` — fetch chains around lines 534, 573

Failures throw `new Error('API error')` with `err.status` attached, but the user-facing message doesn't differentiate 401 vs 429 vs 500. Still hard to debug a real outage.

**Fix:** Branch on `err.status` and surface specific messages ("rate-limited, try again in a minute" vs "auth failed, contact support").

---

### Support form is still a `mailto:`
**File:** `src/App.jsx:321`

Opens the user's email client rather than capturing tickets server-side. Acceptable for MVP, not production. The fallback email is now `TriForgeTraining@gmail.com`.

**Fix:** Add a serverless support endpoint (Resend/SendGrid) when ready to scale.

---

### No README
No setup/run/deploy instructions checked in. New environment = guess.

**Fix:** Add `README.md` covering `.env` setup, `npm run dev`, Firebase project creation, and Strava app registration (callback domain = `localhost`).

---

### Only one git commit on the branch
`git log` shows a single `TriForge v1` commit. All Firebase, proxy, Strava, and verification work is uncommitted history.

**Fix:** Start committing incrementally so rollback is possible. No CI is configured yet either.

---

## RESOLVED (kept for context)

- ✅ **API proxy** — Three options exist: `server.js` (Express, used by `npm run dev`), `api/claude.js` (Vercel), `functions/index.js` (Firebase). Key is server-side everywhere.
- ✅ **Firebase wired up** — Auth + Firestore in `src/firebase.js`, used in `App.jsx`.
- ✅ **JSON.parse hardened** — `try/catch` around storage reads (e.g. `App.jsx:336`).
- ✅ **Race verification** — Parses JSON, validates `status` against `["verified","needs_review","rejected"]` enum (`App.jsx:388-389, 407`).
- ✅ **Phone validation** — `isValidPhone` E.164-ish regex at `App.jsx:452`; SMS toggle and save both gate on it.
- ✅ **Static data extracted** — Moved out of `App.jsx` into `src/data.js`.
- ✅ **Vite config** — `/api` proxy to `localhost:3000` and `chunkSizeWarningLimit` configured.
- ✅ **`.env.example`** — All required vars documented (Anthropic, Firebase, Strava, models, support email).
- ✅ **Strava integration** — Full OAuth + activity fetch + token refresh in `server.js:46-136`.
- ✅ **Support email consolidated** — All source references now point to `TriForgeTraining@gmail.com` as the working interim address. Swap to `support@triforgetraining.com` once domain mail is set up on the production domain.
