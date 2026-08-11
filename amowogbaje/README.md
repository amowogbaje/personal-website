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
