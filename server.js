import 'dotenv/config';
import express from 'express';
import https from 'https';

const app = express();
app.use(express.json({ limit: '10mb' }));

const API_KEY = process.env.ANTHROPIC_API_KEY;

app.post('/api/claude', (req, res) => {
  if (!API_KEY) {
    console.error('ANTHROPIC_API_KEY is not set. Copy .env.example to .env and add your key.');
    return res.status(500).json({ error: 'Server is missing ANTHROPIC_API_KEY.' });
  }

  const body = JSON.stringify(req.body);
  const hasWebSearch = (req.body.tools || []).some(t => t.type === 'web_search_20250305');

  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
    'anthropic-version': '2023-06-01',
    'Content-Length': Buffer.byteLength(body),
  };
  if (hasWebSearch) {
    headers['anthropic-beta'] = 'web-search-2025-03-05';
  }

  const apiReq = https.request(
    { hostname: 'api.anthropic.com', path: '/v1/messages', method: 'POST', headers },
    (apiRes) => {
      res.status(apiRes.statusCode);
      apiRes.pipe(res);
    }
  );

  apiReq.on('error', (err) => {
    console.error('Anthropic API request failed:', err.message);
    if (!res.headersSent) res.status(502).json({ error: 'Failed to reach Anthropic API.' });
  });

  apiReq.write(body);
  apiReq.end();
});

// ── Support form (Resend) ──
app.post('/api/support', async (req, res) => {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set. Add it to .env to enable the support form.');
    return res.status(500).json({ error: 'Support is misconfigured on the server.' });
  }
  const { from, subject, message } = req.body || {};
  if (!subject || !message) {
    return res.status(400).json({ error: 'Subject and message are required.' });
  }
  const toEmail = process.env.SUPPORT_TO_EMAIL || 'TriForgeTraining@gmail.com';
  const fromEmail = process.env.SUPPORT_FROM_EMAIL || 'TriForge Support <onboarding@resend.dev>';
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        reply_to: from || undefined,
        subject: `[TriForge Support] ${subject}`,
        text: `From: ${from || 'unknown user'}\n\n${message}\n\n---\nSent from TriForge app`,
      }),
    });
    if (!r.ok) {
      const body = await r.text();
      console.error('Resend API error', r.status, body);
      let detail = '';
      try { detail = (JSON.parse(body).message) || ''; } catch (_) {}
      return res.status(502).json({ error: 'Failed to send.', detail });
    }
    res.json({ ok: true });
  } catch (e) {
    console.error('Support send error:', e.message);
    res.status(502).json({ error: 'Failed to reach email service.' });
  }
});

// ── Strava OAuth ──
const pendingStravaTokens = new Map();

app.get('/api/strava/auth', (req, res) => {
  const { uid } = req.query;
  if (!uid) return res.status(400).json({ error: 'Missing uid' });
  const params = new URLSearchParams({
    client_id: process.env.STRAVA_CLIENT_ID,
    redirect_uri: process.env.STRAVA_REDIRECT_URI || 'http://localhost:3000/api/strava/callback',
    response_type: 'code',
    scope: 'activity:read_all',
    state: uid,
    approval_prompt: 'auto',
  });
  res.redirect(`https://www.strava.com/oauth/authorize?${params}`);
});

app.get('/api/strava/callback', async (req, res) => {
  const { code, state: uid, error } = req.query;
  const appUrl = process.env.APP_URL || 'http://localhost:5173';
  if (error || !code || !uid) return res.redirect(`${appUrl}?stravaError=true`);
  try {
    const r = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
      }),
    });
    const data = await r.json();
    if (!data.access_token) throw new Error(data.message || 'Token exchange failed');
    pendingStravaTokens.set(uid, {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: data.expires_at,
      athleteId: data.athlete?.id || null,
      athleteName: data.athlete ? `${data.athlete.firstname} ${data.athlete.lastname}`.trim() : '',
    });
    setTimeout(() => pendingStravaTokens.delete(uid), 5 * 60 * 1000);
    res.redirect(`${appUrl}?stravaConnected=true`);
  } catch (e) {
    console.error('Strava callback error:', e.message);
    res.redirect(`${appUrl}?stravaError=true`);
  }
});

app.get('/api/strava/tokens', (req, res) => {
  const { uid } = req.query;
  const tokens = pendingStravaTokens.get(uid);
  if (!tokens) return res.status(404).json({ error: 'No pending tokens' });
  pendingStravaTokens.delete(uid);
  res.json(tokens);
});

app.post('/api/strava/activities', async (req, res) => {
  let { accessToken, refreshToken, expiresAt } = req.body;
  if (!accessToken) return res.status(400).json({ error: 'Missing access token' });
  let updatedTokens = null;
  if (Date.now() / 1000 > expiresAt - 300) {
    try {
      const r = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: process.env.STRAVA_CLIENT_ID,
          client_secret: process.env.STRAVA_CLIENT_SECRET,
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }),
      });
      const refreshed = await r.json();
      if (refreshed.access_token) {
        accessToken = refreshed.access_token;
        updatedTokens = { accessToken: refreshed.access_token, refreshToken: refreshed.refresh_token, expiresAt: refreshed.expires_at };
      }
    } catch (e) { console.error('Strava token refresh failed:', e.message); }
  }
  try {
    const r = await fetch('https://www.strava.com/api/v3/athlete/activities?per_page=50', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const activities = await r.json();
    if (!Array.isArray(activities)) throw new Error(activities.message || 'Failed to fetch activities');
    res.json({ activities, updatedTokens });
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`TriForge proxy → http://localhost:${PORT}`);
  if (!API_KEY) console.warn('WARNING: ANTHROPIC_API_KEY not set.');
});
