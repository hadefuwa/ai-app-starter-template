# Building an Installable Computer Program (Windows / Mac / Linux)

**Instructions for the AI assistant:** Only follow this path if the user specifically needs something installed on their computer rather than running in a browser — for example, software that needs deep system access, works fully offline with local files, needs to run in the background, or is "technically challenging" in a way a website can't handle (e.g. heavy local file processing, system tray integration, hardware access).

If the use case doesn't clearly need this, suggest the [`website/`](../website/README.md) path (as a PWA, which can also feel like an installed app) instead.

## 1. Standard stack: Electron

This template uses **Electron** for all desktop apps — it lets you build the UI with normal HTML/CSS/JS (or React) and packages it into a real Windows/Mac/Linux installable app. It's the most approachable option for an AI assistant + non-coder team, since it reuses web skills.

Don't reach for a different desktop framework (Tauri, .NET, Qt, etc.) unless the user has a specific reason — consistency across projects is the point of this template. (If app size or performance becomes a real problem later, Tauri is the natural upgrade path, but start with Electron.)

### Setup required

1. Install **Node.js** (LTS version).
2. Scaffold the app: `npm create electron-app@latest app` (run inside this `computer-program/` folder) or use `electron-forge` / `electron-builder`.
3. Build the UI like a normal web page inside the Electron window.
4. Use `electron-builder` or `electron-forge` to package installers (`.exe` for Windows, `.dmg` for Mac, `.AppImage`/`.deb` for Linux).

**If you (the AI assistant) have computer use / desktop control access**, use it to run the install commands, launch the dev build, and click through the running app to test it, rather than only describing steps. See [`docs/computer-use-setup.md`](../docs/computer-use-setup.md).

## 2. Suggested folder layout

```
computer-program/
├── README.md     ← this file
└── app/           ← the actual Electron project goes here
```

## 3. Database / backend

If the app needs to store/search data and isn't purely local-file-based, use **[Supabase](../docs/supabase.md)** (free tier) via its REST API or JS client from inside the Electron app.

## 4. Adding an AI chatbot/agent feature

If the app should include an AI feature (chat, summarizing, Q&A, etc.), see [`docs/ai-llm-integration.md`](../docs/ai-llm-integration.md). For a desktop app specifically, the default should be **LM Studio** running a small local Gemma model, so the app works fully offline with no API costs — only use OpenRouter if the user is fine requiring an internet connection and (small) API costs.

## 5. Distributing the finished app

- For testing: just share the built installer file directly with users (email, Google Drive, etc.) — no store needed.
- Code signing (so Windows/Mac don't show scary "unknown publisher" warnings) costs money and is optional — only set this up if the user explicitly asks, since it requires buying a certificate.
- Auto-update: `electron-updater` works well if you're hosting releases somewhere like GitHub Releases.

## 6. Checklist before telling the user it's "done"

- [ ] App runs via `npm start` and the user has seen it working
- [ ] A packaged installer has been built and tested on at least one target OS
- [ ] If using Supabase: keys are stored safely, not hardcoded and committed to git
- [ ] User knows where the installer file is and how to share/install it
