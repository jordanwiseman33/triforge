# TriForge — Issue Handoff
_Last updated: 2026-05-18_

---

## OPEN

### Sparse git history
Now committing incrementally (good). Older work is bundled in the `Catch repo up` snapshot — `git blame` won't be useful for lines that landed before 2026-05-18, but going forward it will be.

**Fix:** Keep committing per logical change.

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
- ✅ **Firebase Functions `anthropic-beta` header** — Corrected from `web-search-1` to `web-search-2025-03-05` so the Firebase Functions proxy matches `server.js`.
- ✅ **Opus model fallback bumped to 4.7** — `src/App.jsx:534` and `.env.example` now default to `claude-opus-4-7`. Sonnet stays at `claude-sonnet-4-6` (current latest).
- ✅ **API error handling** — `apiErrorMsg` was already branching on 400/401/429/5xx, but no caller read the response body. Added `handleApiResponse` helper that reads the body on `!r.ok`, logs Anthropic's error message via `console.error`, attaches it as `detail`, and surfaces it in the 400 user message. Replaced four duplicated `if (!r.ok)` blocks at the four `/api/claude` callsites.
- ✅ **README** — Quick start, env var reference, setup checklist for new environments, scripts, proxy options, deploy notes, project layout.
- ✅ **CI** — `.github/workflows/ci.yml` runs `npm ci && npm run build` on push to `main` and on PRs (Node 20, npm cache). First run on `ba60e10` passed.
- ✅ **Support form** — `POST /api/support` in `server.js` now sends tickets through Resend. Client posts to the endpoint with `{from, subject, message}`; user email goes in `reply_to` so replies thread back. Requires `RESEND_API_KEY` env var. Until a domain is verified in Resend, sender is `onboarding@resend.dev` (sandbox).
