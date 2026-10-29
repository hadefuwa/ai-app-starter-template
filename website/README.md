# Building a Website (recommended path)

**Instructions for the AI assistant:** This is the default, preferred path. Follow this section to decide exactly what to build and how to deploy it.

## 1. Decide the complexity level

Ask the user (if not already clear) what the site needs to do, then pick ONE of these:

### A) Simple static site / informational site
If it's mostly content — a landing page, a portfolio, a brochure, a simple tool with no login — build it as **plain HTML/CSS/JS** (or a lightweight framework like Vite + React if it'll grow). No backend needed.

**Deploy with:** [GitHub Pages](../docs/github-pages.md) — free, built into this repo already, zero extra accounts needed.

### B) App-like site that should feel installable / work offline
If the user wants something that behaves like an app — works offline, can be "installed" to a phone/desktop home screen, sends notifications — build it as a **PWA (Progressive Web App)**:
- A standard web app (HTML/CSS/JS or a framework) PLUS:
  - A `manifest.json` (name, icons, theme color, `display: standalone`)
  - A service worker (`sw.js`) for offline caching
- This is still just a website under the hood — same hosting options apply.

**Deploy with:** [GitHub Pages](../docs/github-pages.md) for the free/simple route, or [Vercel](../docs/vercel.md) if you want a nicer dashboard, preview deployments per change, custom domains, or server-side functions (API routes).

### C) Site with a database / backend logic
If the app needs to **store data**, have **user accounts/login**, or deal with **large datasets** (e.g. "every hospital in the UK", "every farm in the UK", any searchable list with hundreds+ rows):

- Use **[Supabase](../docs/supabase.md)** (free tier) as the database + auth backend.
- Keep the frontend the same as A or B above.
- Host the frontend on **Vercel** (recommended once you have a backend, since it handles environment variables and API routes cleanly) — see [`docs/vercel.md`](../docs/vercel.md).
- If the site is genuinely large (lots of records, logged-in users, maybe an admin area or paid tiers), see [`docs/example-large-content-site.md`](../docs/example-large-content-site.md) for a worked example of how to structure that with the same Vercel + Supabase stack.

### D) Site that needs a real domain name and/or an always-on server process
If the user wants to **buy and use a custom domain**, or needs a backend server that's always running (not just serverless functions) — e.g. a Node/Python backend, a scheduled job, a websocket server:

- Use **[Railway](../docs/railway.md)** for hosting the backend/server and the domain.
- Install the Railway CLI as described in that guide.

> You can combine these: e.g. a PWA frontend on Vercel + a Supabase database + a custom domain bought through Railway. Pick the simplest combination that satisfies what the user actually asked for — don't add a database or Railway if a static GitHub Pages site would do.

## 2. Recommended default stack (when the user has no strong preference)

- Plain HTML/CSS/JS, or React via Vite if the app has real interactivity/state.
- PWA manifest + service worker if "app-like" or offline use was mentioned.
- GitHub Pages for hosting, unless a database is needed → then Vercel + Supabase.
- If an AI chatbot/agent feature is wanted, see [`docs/ai-llm-integration.md`](../docs/ai-llm-integration.md) — default to **OpenRouter's free tier** first.

## 3. Suggested folder layout for the actual app code

Build the real website code in this `website/` folder (or move it to the repo root if this is the only thing being built):

```
website/
├── README.md        ← this file
├── index.html
├── manifest.json     ← only if building a PWA
├── sw.js              ← only if building a PWA
├── src/               ← your JS/CSS/components
└── public/            ← static assets, icons
```

## 4. Checklist before telling the user it's "done"

- [ ] App runs locally and the user has seen it working in a browser
- [ ] If a PWA: manifest + service worker tested, "Add to Home Screen" works
- [ ] If using Supabase: `.env` keys are NOT committed to git (add to `.gitignore`)
- [ ] Deployed and the user has a live URL to click
- [ ] README in this folder updated with the live URL and any project-specific notes
