# Gideon Amowogbaje — Portfolio

A single-page portfolio built with React, Vite, and Tailwind CSS.

## Design concept

The site is framed as a developer's own version history. The "Domains"
section — faith, songwriting, teaching, marriage — is laid out as a git
commit log with branches that merge back into one trunk (`main` = backend
development), because that's the most honest way to describe someone who
genuinely thinks in commits but lives a much wider life than the job title
suggests. Everything else (the terminal-styled contact card, the PR-style
project cards) extends that same vocabulary instead of introducing a second
visual language.

Palette: ink navy background, warm parchment text, a hymnal gold accent, and
a muted sage used only for code/stack tags — warm enough to carry the faith
and music side, precise enough to still read as a developer's site.

Fonts: Fraunces (display, for headlines and the closing quote), Inter (body
copy), JetBrains Mono (tags, labels, terminal lines).

## Local development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into ./dist
npm run preview  # preview the production build
```

## What to edit first

- `src/components/Work.jsx` — swap the four placeholder project cards for
  real projects, links, and stack tags.
- `src/components/Domains.jsx` — adjust the five "branches" if any of the
  wording doesn't sound like you.
- `src/components/Contact.jsx` — already wired to your real email, phone,
  Calendly link, and socials pulled from your current site.

## Deployment (GitHub Actions → Namecheap)

`.github/workflows/deploy.yml` builds the site with Node and rsyncs the
`dist/` folder to your Namecheap hosting over SSH, the same way your Laravel
projects deploy — just without the PHP/Composer/migration steps, since this
is a static site.

Set these in your repo (or in a `NAMECHEAP` environment, as referenced in
the workflow):

**Variables**
- `HOST` — server hostname/IP
- `USERNAME` — cPanel/SSH username
- `PORT` — SSH port
- `DEPLOY_PATH` *(optional)* — folder under `/home/$USERNAME/` that
  `amowogbaje.com` points to. Defaults to `public_html`, which is standard
  for the primary domain on Namecheap shared hosting. If your domain is
  mapped to a different folder, set this explicitly.

**Secrets**
- `SSH_PRIVATE_KEY` — private key for the deploy user

The workflow triggers on push to `main`. If your default branch is `master`,
update the `branches:` value in the workflow file to match.

## AI chatbot ("Ask about Gideon")

`src/components/ChatWidget.jsx` talks to `public/api/chat.php`, which calls the
Agnes AI API (OpenAI-compatible, `agnes-2.5-flash`). The key never reaches the browser.
The bot answers only from `public/llms-full.txt`, the same file AI crawlers
read, so **edit that file to change what the bot knows**.

The widget also invites visitors to chat once per visit, at a random moment
15-40 seconds in (`MIN_DELAY_MS` / `MAX_DELAY_MS` in `ChatWidget.jsx`). They can
start chatting or click "No thanks" (then it stays quiet for 7 days).

1. Create an API key on the Agnes AI platform (platform.agnes-ai.com). The free/default plan allows about 20 text requests/min; Agnes says limits and quotas can change, so check their current docs.
2. On the server, create `/home/<cpanel-user>/amowog-secrets.php` (one level above `public_html`, so a deploy never overwrites it and it is never web-accessible):

   ```php
   <?php
   return ['api_key' => 'your-agnes-api-key'];
   ```

   Optional keys: `model` (default `agnes-2.5-flash`; `agnes-2.0-flash` also works), `rpm_cap` (default 15), `daily_cap` (default 250). Raise the two caps if you move to an Agnes Token Plan.
3. Deploy as usual. Per-visitor limit is 12 requests per 10 min, 600 characters per message.

Local testing: `AGNES_API_KEY=your-agnes-api-key php -S localhost:8000 -t public` in one terminal, `npm run dev` in another. Vite proxies `/api` to it.

## SEO / AI discoverability

- `index.html`: JSON-LD (Person, WebSite, ProfilePage, projects, services) plus static fallback content inside `#root` for crawlers that don't run JavaScript. React replaces it on load.
- `npm run build` also runs `scripts/prerender.mjs`, which writes `dist/services.html` with its own title/canonical/content; `.htaccess` serves it at `/services`.
- `public/llms.txt` and `public/llms-full.txt`: plain-text summary and full profile for AI assistants.
- `public/robots.txt` explicitly allows search and AI crawlers; `sitemap.xml` lists the indexable pages.
- If you change services or projects, update `llms-full.txt`, the fallback in `index.html`, and the list in `scripts/prerender.mjs`.
