# Database with Supabase (free tier)

Best for: any app that needs to store, search, or filter a meaningful amount of data — e.g. "a list of every hospital in the UK", "every farm in the UK", user accounts, saved records, anything beyond a handful of hardcoded values.

Supabase gives you a hosted Postgres database, auto-generated APIs, authentication, and file storage, all with a generous free tier.

## Setup

1. Go to [supabase.com](https://supabase.com) and sign up (free) — "Continue with GitHub" is easiest.
2. Click **"New Project"**. Pick a name, generate/save a database password, and pick a region close to your users (e.g. `London` / `eu-west-2` for a UK audience).
3. Wait a minute or two for the project to provision.
4. In the project dashboard, go to **Table Editor** to create tables through a UI (like a spreadsheet), or use the **SQL Editor** to run `CREATE TABLE` statements.
5. Go to **Project Settings → API** to find your:
   - **Project URL**
   - **anon public key** (safe to use in frontend code)
   - **service_role key** (⚠️ secret — never put this in frontend code or commit it to git; only use it in secure backend code)

## Connecting your app

- **Web app:** install `@supabase/supabase-js`, initialize with the Project URL + anon key.
- **Flutter mobile app:** install the `supabase_flutter` package.
- **Electron desktop app:** install `@supabase/supabase-js` same as a web app.

Store the URL/anon key in environment variables (`.env` file), and make sure `.env` is listed in `.gitignore` so it never gets committed.

## Importing large datasets

If you already have a big dataset (e.g. a CSV of all UK hospitals), use the **Table Editor → Insert → Import data from CSV** feature, or the SQL Editor to bulk-insert.

## Free tier limits (good to know)

The free tier includes a generous amount of database storage, bandwidth, and monthly active users — more than enough for most hobby/small projects. If a project outgrows it, Supabase has a straightforward paid upgrade path.
