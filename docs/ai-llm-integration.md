# Adding an AI agent / chatbot (LLM) to your app

If the user wants their app to include an AI chatbot or AI agent feature (answer questions, summarize something, chat with users, etc.), this template standardizes on two options depending on where the app runs and whether the user wants to pay for usage.

## Decide which one to use

Ask the user: **"Do you want to pay a small amount for AI usage online, or run the AI completely free on your own computer?"**

| Situation | Use |
|---|---|
| Website, mobile app, or any app that needs to work for multiple people over the internet, and the user is OK with (small, usage-based) API costs | **[OpenRouter](#openrouter-paid-api-online)** |
| Computer program (Electron) running on one person's machine, and the user wants it fully free with no API costs or accounts | **[LM Studio](#lm-studio-free-local)**, running a small local model |

If unsure, default to **OpenRouter's free tier first** (see below) before reaching for paid credits or a local model — it's the lowest-effort way to get something working.

## OpenRouter (paid API, online)

[OpenRouter](https://openrouter.ai) gives one API that can call many different AI models (OpenAI, Anthropic, Google, Meta, etc.) through a single account and API key — useful so the app isn't locked into one AI provider.

### Always try the free tier first

1. Sign up at [openrouter.ai](https://openrouter.ai).
2. Go to **Models** and filter for **free models** (models with `:free` in their name, e.g. `meta-llama/llama-3.1-8b-instruct:free` or similar — the exact free models available change over time, so check the current list).
3. Build and test the app's AI feature against a free model first. Free models are rate-limited and sometimes slower/less capable, but they're enough to build and demo the feature with zero cost.
4. Only move to a paid model (and add billing/credits on the OpenRouter account) once the user has seen the feature working and decides the free tier isn't good enough for what they need.

### Setup

1. Create an API key in OpenRouter's dashboard (**Keys** section).
2. Store it as an environment variable (`OPENROUTER_API_KEY`) — never hardcode it or commit it to git.
3. Call it using the OpenAI-compatible API format, pointed at OpenRouter's endpoint (`https://openrouter.ai/api/v1`) — most AI SDKs that support OpenAI can be pointed at OpenRouter just by changing the base URL and key.
4. If/when the user wants to add paid credits, that's done directly in the OpenRouter dashboard under **Credits**.

## LM Studio (free, local)

[LM Studio](https://lmstudio.ai) is a free desktop app that downloads and runs AI models entirely on the user's own computer — no internet connection, no API costs, no account needed to use it. This is the right choice when the app itself is a **computer program (Electron)** that should work fully offline/free.

### Setup

1. Download and install [LM Studio](https://lmstudio.ai) (Windows/Mac/Linux).
2. Inside LM Studio, search the model catalog for a **small Gemma model** — specifically the smallest available, e.g. **Gemma 2B** (or an even smaller **Gemma 1B** if one is available) — and download it. Small models like this run acceptably even on modest laptops without a dedicated GPU, which matters since the target user is a non-technical friend, not someone with high-end hardware.
3. In LM Studio, start the **local server** (usually under a "Developer" or "Local Server" tab) — this exposes an OpenAI-compatible API on `http://localhost:1234` (or whatever port LM Studio shows) that the Electron app can call.
4. In the Electron app's code, call that local endpoint the same way you'd call any OpenAI-compatible API, just pointed at `localhost` instead of a cloud provider — no API key needed for the local server.

### Things to tell the user

- The AI quality from a 1B–2B parameter model is noticeably more limited than a large cloud model — fine for simple tasks (short answers, basic classification, simple chat), not for complex reasoning.
- LM Studio and the model need to be downloaded/running on the same computer as the Electron app for this to work — it's not something that works for other people unless they also install LM Studio.
- If the user later wants better AI quality and is fine with internet + API costs, that's the point to switch to OpenRouter instead.

## Checklist before telling the user it's "done"

- [ ] AI feature works and the user has seen it respond to a real test input
- [ ] If using OpenRouter: API key stored in an environment variable, not committed to git; free-tier model tried first
- [ ] If using LM Studio: the user understands they need LM Studio running locally with the model loaded for the feature to work
