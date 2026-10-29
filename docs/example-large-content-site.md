# Example architecture: a large website with lots of content/data

This is a worked example of how to structure a bigger site when it has a lot of content or records to manage — more than a simple landing page, but still built entirely from this template's standard stack (no new tools needed).

Use this as a reference pattern when the user wants something like "a site with a big searchable list of X", "a members area", "a course/content platform", or anything else with a meaningful amount of structured data and logged-in users.

## High-level shape

```
                ┌─────────────────────────────┐
                │           Vercel            │
                │  (hosts + runs everything)   │
                │                              │
                │  ┌────────────┐ ┌──────────┐ │
                │  │   Pages/    │ │   API    │ │
                │  │     UI      │ │  routes  │ │
                │  └─────┬───────┘ └────┬─────┘ │
                └────────┼──────────────┼───────┘
                         │              │
                         ▼              ▼
                ┌─────────────────────────────┐
                │           Supabase           │
                │  - Postgres database          │
                │  - Auth (login/signup/sessions)│
                │  - Row-level security rules    │
                └─────────────────────────────┘
                         ▲
                         │ (optional)
                ┌─────────────────────────────┐
                │   Payments provider (e.g.     │
                │   Stripe) for paid tiers       │
                └─────────────────────────────┘
```

## The pieces

- **One framework, hosted on Vercel, handles both the pages people see and the backend logic.** Instead of a separate frontend and backend, a single app serves the UI *and* small backend "API routes" (e.g. "save this record", "check this user's access") from the same deployment. This avoids managing two separate hosted services.

- **Supabase is the single source of truth for data and accounts.** All the structured content/records (the big list of whatever-it-is — items, entries, lessons, listings, etc.) lives in Postgres tables. User accounts, logins, and sessions are handled by Supabase's built-in auth rather than custom-built login code.

- **Access rules live next to the data, not scattered through the app.** Supabase's row-level security lets you say things like "a user can only see their own records" or "only admins can edit this table" directly on the database, so every part of the app that touches the data automatically respects the same rules.

- **The database schema is written down and version-controlled**, as a set of migration files that live in the repo alongside the code, rather than changes being made by hand through a dashboard with no record of what changed. This means the database structure has the same history/traceability as the code.

- **Different areas of the site are gated by who's logged in and what role they have.** A shared layer checks "is this person logged in, and are they allowed to be here?" before showing protected pages — e.g. a general area anyone can use, and a separate admin area only staff can reach, both built as part of the same app rather than as a separate project.

- **Per-user data (progress, saved items, activity, rankings, etc.) is stored per-user in the same database**, queried for whoever is currently logged in — so the "my stuff" experience is just normal rows in the same tables, filtered by who's asking.

- **Payments, if the site needs them, plug in as a separate well-known provider (e.g. Stripe)** rather than anything custom — used to gate paid features/content behind a subscription or one-off purchase, with the provider handling the actual card handling/compliance.

## Why this still fits the template

Everything above is still just: **Vercel** (hosting + the app itself) + **Supabase** (database/auth) — the same two tools already recommended in [`website/README.md`](../website/README.md) for option C. A "big" site doesn't need a different architecture, just more tables, more rules, and more pages built on the same foundation.
