# Hosting with Vercel (free tier)

Best for: PWAs/web apps that benefit from fast previews, custom domains, and simple serverless API routes (e.g. talking to Supabase).

## Setup

1. Go to [vercel.com](https://vercel.com) and sign up (free) — the easiest way is "Continue with GitHub", which also lets Vercel auto-deploy from your repo.
2. Click **"Add New... → Project"**, and import this GitHub repository.
3. If your site code lives in a subfolder (e.g. `website/`), set that as the **Root Directory** in the project's settings during import.
4. Leave the framework preset on "Other" for plain HTML, or let Vercel auto-detect if you used a framework like Vite/Next.js.
5. Click **Deploy**. Vercel gives you a live URL immediately (e.g. `your-project.vercel.app`), and will re-deploy automatically every time you push to `main`.

## Environment variables (e.g. Supabase keys)

In the Vercel project → **Settings → Environment Variables**, add any keys the app needs (like your Supabase URL/anon key). Never commit these directly into your code or git history — always use environment variables.

## Custom domain

Project → **Settings → Domains** → add your domain and follow the DNS instructions shown. Vercel's free tier supports custom domains.

## CLI (optional)

If your AI assistant has terminal access, it can also deploy via the CLI instead of the dashboard:

```bash
npm install -g vercel
vercel login
vercel         # deploy a preview
vercel --prod  # deploy to production
```
