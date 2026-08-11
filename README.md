# amowogbaje monorepo

One repo, multiple independent static sites, one deployed by GitHub Actions
to its own subdomain.

| Folder        | Site                        | Domain                        |
|---------------|------------------------------|--------------------------------|
| `amowogbaje/` | Gideon Amowogbaje's portfolio | https://www.amowogbaje.com     |
| `catherine/`  | Catherine Amowogbaje's site  | https://catherine.amowogbaje.com |

Each folder is a **fully independent** Vite + React app — its own
`package.json`, its own `node_modules`, its own build. Nothing is shared
between them on purpose, so one site's dependency upgrade can never break
the other.

## Adding a new site later

1. Create a new top-level folder, e.g. `blog/`, with its own Vite/React
   (or any static-build) project.
2. Add a filter + job for it in `.github/workflows/deploy.yml` and copy
   `deploy-catherine.yml` to `deploy-blog.yml`, pointing at the new folder.
3. Create a `blog` GitHub Environment (see below) with its own deploy
   secrets/variables.

That's the whole scaling story — no shared build config to fight with.

## How deployment works

```
push to main
     │
     ▼
.github/workflows/deploy.yml   (the ONLY workflow that runs on push)
     │
     ├─ detect-changes  → dorny/paths-filter checks whether amowogbaje/**
     │                    and/or catherine/** changed in this push
     │
     ├─ deploy-amowogbaje  (only if amowogbaje/** changed) ──▶ calls
     │                                          deploy-amowogbaje.yml
     │
     └─ deploy-catherine   (only if catherine/** changed) ──▶ calls
                                                deploy-catherine.yml
```

- **Only one workflow ever runs per push** — `deploy.yml`. It doesn't build
  or deploy anything itself; it just decides which site(s) changed and
  calls that site's own reusable workflow file (`workflow_call`).
- Each site keeps its build + rsync steps in its **own file**
  (`deploy-amowogbaje.yml`, `deploy-catherine.yml`), so you can open,
  audit, or change one site's deploy steps without touching the other's.
- If you edit both folders in the same push, both deploy jobs run in
  parallel in that same single workflow run.
- You can also force a deploy manually: **Actions → Deploy → Run
  workflow**, and pick `all`, `amowogbaje`, or `catherine` from the `site`
  dropdown — useful if you need to re-deploy without a code change (e.g.
  after rotating a secret).

## One-time GitHub setup

Each site deploys using its own [GitHub Environment](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment),
so secrets/variables never leak between sites even though they live in the
same repo.

Create two environments under **Settings → Environments**: `amowogbaje`
and `catherine`. In each, set:

**Variables**
- `HOST` — server hostname/IP
- `USERNAME` — cPanel/SSH username
- `PORT` — SSH port
- `DEPLOY_PATH` *(optional)* — folder under `/home/$USERNAME/` that the
  domain points to.
  - `amowogbaje` environment defaults to `public_html` (standard for the
    primary domain on Namecheap shared hosting).
  - `catherine` environment defaults to `public_html/catherine` — check
    what document root you assigned the `catherine` subdomain to in
    cPanel and override this if it's different.

**Secrets**
- `SSH_PRIVATE_KEY` — private key for the deploy user

If `HOST`/`USERNAME`/`PORT`/`SSH_PRIVATE_KEY` are the same for both sites
(e.g. both live under the same cPanel account), you can just set the same
values in both environments — they're still kept as two separate
copies so you can rotate one without touching the other later.

## Local development

```bash
cd amowogbaje && npm install && npm run dev
# or
cd catherine && npm install && npm run dev
```

## Note on git history

This repo was assembled from what used to be a separate
`amowogbaje/personal-website` repo (now the `amowogbaje/` folder, with its
own git history) plus a static HTML site for Catherine (now converted to
React in `catherine/`). The old nested `.git` folder and history were not
carried over — this is a fresh repo. If you want to preserve the old
commit history, it's still available at the original
`amowogbaje/personal-website` GitHub repo.
