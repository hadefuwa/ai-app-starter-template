# AI App Starter Template

This repository is a starting point for building an app **with the help of an AI coding assistant** (like Claude, ChatGPT, Cursor, etc.), even if you have never written code before.

You don't need to know how to code. You need to:
1. Open this repository in your AI assistant (e.g. drag the folder into Claude Code, Cursor, or paste this repo's GitHub link to a chatbot that can browse/clone it).
2. Tell it what you want to build, in plain English.
3. Let the assistant read this file and follow the instructions below.

---

## 👋 Instructions for the AI assistant reading this

If you are an AI assistant that has just been pointed at this repository, **do the following before writing any code:**

### Step 1 — Ask the human what they want to build

Ask the user this question directly, in plain language, and wait for their answer:

> "What do you want to build?
> **A) A website / web app** (something people use in a browser) — *recommended for most projects*
> **B) A mobile app** (something installed on an Android or iPhone)
> **C) A computer program** (something installed on Windows/Mac/Linux, not in a browser)"

**Default recommendation: push the user towards option A (website).** A website is the fastest to build, easiest to update, free to host, works on every device automatically, and doesn't require app store approval. Only go with B or C if the user has a specific reason they need it (e.g. "it must work offline on a phone with no internet" or "it needs to control hardware on the user's computer").

If the user picks B (mobile) or C (computer program), confirm with them once that a website genuinely won't work for their use case before proceeding — but respect their choice if they insist.

### Step 2 — Send them into the right folder

Once you know the answer, **open and follow the README inside the matching folder**:

| Answer | Go to | Technology used |
|---|---|---|
| A) Website | [`website/README.md`](website/README.md) | PWA + GitHub Pages, or Vercel |
| B) Mobile app | [`mobile-app/README.md`](mobile-app/README.md) | Flutter |
| C) Computer program | [`computer-program/README.md`](computer-program/README.md) | Electron |

That folder's README contains the exact architecture, tools, and step-by-step setup instructions you should follow. Don't improvise a different stack — this template exists so every project built from it looks and works the same way, which makes it much easier for the human (and future AI assistants) to maintain.

### Step 3 — Set up "computer use" if you can

Before diving in, check whether you (the AI assistant) have **computer use / desktop control** available in this environment (the ability to click, type, and operate applications on the user's computer directly, not just edit files).

- **If you do have it:** turn it on and use it. It lets you install software, run installers, click through setup wizards, and test the running app yourself, instead of reading instructions aloud to the user and hoping they type things correctly. This is much easier for a non-technical user than following a CLI tutorial.
- **If you don't have it:** tell the user plainly that you'll need to give them copy-paste commands and click-by-click instructions instead, and that this will be slower. Suggest they could also try an assistant with computer-use access (e.g. Claude with the desktop app / computer use) if they get stuck.

### Step 4 — Shared services

Regardless of which path they take, this template standardizes on these services so the user builds "muscle memory" across projects. See [`docs/`](docs) for setup guides:

- **Hosting a website (quick & free):** [GitHub Pages](docs/github-pages.md) or [Vercel](docs/vercel.md)
- **Database / lots of data** (e.g. "a list of every hospital in the UK"): [Supabase](docs/supabase.md)
- **A real domain name + always-on hosting/backend:** [Railway](docs/railway.md)
- **Mobile development environment:** [Flutter + Android Studio setup](docs/flutter-android-studio-setup.md)
- **Letting your AI assistant control your computer:** [Computer use setup](docs/computer-use-setup.md)

---

## 🧭 The standard architecture (for humans)

Every app built from this template follows the same basic shape, so once you've built one, the next one feels familiar:

- **Website** → built as a simple PWA (Progressive Web App) or plain HTML/JS site → hosted free on **GitHub Pages**, or on **Vercel** if you want nicer previews/custom domains.
- **Mobile app** → built with **Flutter** (one codebase → both Android and iPhone).
- **Computer program** → built with **Electron** (one codebase → Windows, Mac, and Linux).
- **Database** (only if your app needs to store/search a lot of data) → **Supabase** free tier.
- **Custom domain / always-on backend / paid hosting** → **Railway**, with its CLI installed.

## 🚀 Quick start for humans

1. Click **"Use this template"** on GitHub (top of this repo), or just fork/clone it.
2. Give the new repo to your AI assistant.
3. Tell the assistant what you want to build.
4. Answer its questions (website vs mobile vs desktop, what the app does, etc).
5. Let it build, test, and deploy following the guides in this repo.

## 📁 What's in this repo

```
.
├── README.md                  ← you are here (routes to the right folder)
├── website/README.md          ← build a website (PWA / Electron-less / GitHub Pages / Vercel)
├── mobile-app/README.md       ← build a mobile app (Flutter)
├── computer-program/README.md ← build an installable desktop app (Electron)
└── docs/
    ├── github-pages.md
    ├── vercel.md
    ├── supabase.md
    ├── railway.md
    ├── flutter-android-studio-setup.md
    └── computer-use-setup.md
```
