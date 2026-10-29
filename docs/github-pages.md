# Hosting a website with GitHub Pages (free)

Best for: simple static sites and PWAs with no backend/database.

## Setup

1. In this GitHub repo, go to **Settings → Pages**.
2. Under "Build and deployment", set **Source** to "Deploy from a branch".
3. Pick the branch (usually `main`) and the folder (`/` root, or `/docs` if your site files live there — this template keeps site code in `website/`, so either move the built site to the repo root/`docs` folder, or set up a simple GitHub Actions workflow that copies/builds `website/` into a `gh-pages` branch).
4. Save. GitHub will give you a URL like `https://<username>.github.io/<repo-name>/`.

## Simplest approach for this template

For a plain static site with no build step, the easiest setup is:
- Put the final HTML/CSS/JS files directly in a `docs/` folder at the repo root (confusingly named, but that's what GitHub Pages looks for), or
- Use a tiny GitHub Actions workflow to publish the `website/` folder automatically on every push to `main`.

Ask the AI assistant building your site to set this up for you — it's a one-time, few-minute task.

## Custom domain (optional)

GitHub Pages supports a custom domain for free (you still have to buy the domain somewhere). Add a `CNAME` file with your domain, and point your domain's DNS at GitHub's servers (instructions in GitHub's Pages settings page once you type in your domain).

If you want GitHub to also manage the domain purchase/hosting end-to-end with more flexibility (e.g. you also need a backend), see [`railway.md`](railway.md) instead.
