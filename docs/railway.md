# Custom domains, always-on backends, and hosting with Railway

Best for: when you want to **buy and use a real domain name**, or you need an **always-on backend/server** (not just a static site or serverless functions) — e.g. a Node.js/Python server, a scheduled background job, a websocket server.

## Setup

1. Go to [railway.app](https://railway.app) and sign up (free) — "Login with GitHub" is easiest. Railway has a free trial credit, then usage-based pricing — check current pricing on their site before relying on it for anything long-term/production.
2. Click **"New Project" → "Deploy from GitHub repo"** and pick this repository (point it at the right subfolder if needed, e.g. `computer-program/app` for a backend service).
3. Railway auto-detects the project type (Node, Python, etc.) and deploys it.
4. In the project's **Settings → Networking**, generate a public domain, or add your own custom domain.

## Installing the CLI

The AI assistant should install the Railway CLI to manage deployments from the terminal:

```bash
npm install -g @railway/cli
railway login
railway init      # link this project to a Railway project
railway up        # deploy the current code
```

## Buying a domain

Railway doesn't sell domains itself, but once you own a domain (bought from any registrar — Namecheap, Google Domains successor, GoDaddy, etc.), you point its DNS at Railway following the instructions in **Settings → Networking → Custom Domain**.

## Environment variables

Set secrets (like a Supabase service role key, API keys, etc.) under the project's **Variables** tab in Railway — never commit secrets to git.
