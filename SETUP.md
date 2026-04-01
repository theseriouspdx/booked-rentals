# booked.rentals — Setup & Architecture Guide

Last updated: April 1, 2026

---

## Project Overview

booked.rentals is a static content site for short-term rental hosts. It runs on Netlify with Sveltia CMS for content management. All content is stored as markdown files in the git repo — no external database or server required.

---

## File Structure

```
booked-rentals/
├── homepage.html              ← Full homepage (replaces index.html when ready)
├── index.html                 ← Current live landing page (coming soon)
├── netlify.toml               ← Netlify config (branch deploys, headers, redirects)
├── css/
│   └── style.css              ← All site styles (organized with section comments)
├── js/
│   └── main.js                ← Hamburger menu, scroll animations, form handling
├── images/
│   ├── booked-header.png      ← Occupancy tracker header banner
│   └── uploads/               ← CMS-uploaded images go here
├── admin/
│   ├── index.html             ← Sveltia CMS entry point (loads from CDN)
│   └── config.yml             ← CMS content model configuration
├── content/
│   ├── articles/              ← Markdown files for blog articles
│   ├── products/              ← Markdown files for product reviews
│   ├── news/                  ← Markdown files for news posts
│   └── settings.yml           ← Site-wide settings (tagline, social links, etc.)
├── .netlify/                  ← Netlify internal config (do not edit manually)
└── .git/                      ← Git repo
```

---

## Branches

| Branch | Purpose | URL |
|--------|---------|-----|
| `main` | Live production site | `booked.rentals` |
| `homepage-rebuild` | New homepage + CMS | `homepage-rebuild--<site-name>.netlify.app` |

The `homepage-rebuild` branch contains all new work. The `main` branch still serves the original coming-soon landing page. When you're happy with the rebuild, merge `homepage-rebuild` into `main`.

---

## Sveltia CMS

### What It Is

Sveltia CMS is a free, open-source, Git-based content management system. It's a drop-in replacement for Decap CMS (formerly Netlify CMS) with better performance, mobile support, and active maintenance. It gives you a visual admin panel at `/admin` where you can create and edit articles, products, and news — all saved as markdown files committed to your git repo.

### How to Access

1. Go to `https://booked.rentals/admin/` (or your branch deploy URL + `/admin/`)
2. Log in with your Netlify Identity credentials
3. You'll see the CMS dashboard with your content collections

### Content Collections

The CMS manages four types of content:

**Articles** (`content/articles/`)
- Title, date, category, excerpt, featured image, body (markdown)
- Categories: Guest Management, Pricing & Revenue, Automation & Tools, Property Setup, Reviews & Ratings, Legal & Insurance
- Has draft/featured toggles
- Files named: `YYYY-MM-DD-slug.md`

**Products** (`content/products/`)
- Product name, one-line review, rating, category, image, affiliate link, full review
- Categories: Smart Home, Pricing Tools, Cleaning & Maintenance, Guest Communication, Safety & Security, Furniture & Design
- Has featured toggle
- Files named: `slug.md`

**News** (`content/news/`)
- Title, date, excerpt, body (markdown)
- Has draft toggle
- Files named: `YYYY-MM-DD-slug.md`

**Site Settings** (`content/settings.yml`)
- Site title, tagline, CTA headline, subscriber count, social URLs
- Single file, not a collection

### CMS Configuration

All CMS config lives in `admin/config.yml`. To add fields, change categories, or modify the content model, edit that file. Key settings:

- `backend.branch`: Which git branch CMS edits commit to (currently `homepage-rebuild`)
- `media_folder`: Where uploaded images are saved (`images/uploads`)
- `collections`: Defines each content type and its fields

---

## Netlify Configuration

### Branch Deploys

Branch deploys are enabled via `netlify.toml`. Every branch you push gets its own preview URL:

```
https://<branch-name>--<site-name>.netlify.app
```

For the homepage rebuild:
```
https://homepage-rebuild--<site-name>.netlify.app
```

Your live site on `main` is completely unaffected.

### Required Dashboard Setup

Some things can't be configured via `netlify.toml` — you need to do these in the Netlify web dashboard:

#### 1. Enable Branch Deploys

1. Go to **Netlify Dashboard → Site settings → Build & deploy → Branches and deploy contexts**
2. Under "Branch deploys", select **"All"** (or add `homepage-rebuild` specifically)
3. Save

#### 2. Enable Netlify Identity (required for CMS)

1. Go to **Netlify Dashboard → Integrations → Identity**
2. Click **"Enable Identity"**
3. Under **Registration**, set to **"Invite only"** (so random people can't create accounts)
4. Invite yourself: click **"Invite users"** and enter `itsjohnserious@gmail.com`
5. Check your email and set a password

#### 3. Enable Git Gateway (required for CMS)

1. Still in **Identity** settings, scroll to **"Services"**
2. Click **"Enable Git Gateway"**
3. This allows Sveltia CMS to commit content changes to your repo on your behalf

---

## Design System

### Colors (CSS Custom Properties)

| Variable | Value | Usage |
|----------|-------|-------|
| `--bg-primary` | `#0d0b12` | Page background |
| `--bg-secondary` | `#151220` | Section backgrounds |
| `--bg-card` | `#1a1625` | Card backgrounds |
| `--bg-card-hover` | `#201b2e` | Card hover state |
| `--pink` | `#c4547a` | Accent (Legal & Insurance) |
| `--purple` | `#7b5ea7` | Accent (secondary) |
| `--teal` | `#4a9e96` | Primary accent / CTAs |
| `--text-primary` | `#e8e4f0` | Main text |
| `--text-secondary` | `#9b93a8` | Body text / descriptions |
| `--text-muted` | `#6b6378` | Subtle text / labels |
| `--border` | `#2a2438` | Borders / dividers |

### Typography

- **Body text**: Merriweather (serif) via Google Fonts
- **Headings / UI**: System sans-serif stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif`)

### Responsive Breakpoints

- **480px**: Small phones
- **768px**: Tablets / large phones (hamburger menu triggers here)
- **1024px**: Desktop

---

## How to Make Changes

### Edit the homepage design

Edit `homepage.html`, `css/style.css`, or `js/main.js` directly. Push to `homepage-rebuild` and check the branch deploy preview URL.

### Add/edit content via CMS

Go to `/admin/`, log in, create or edit articles/products/news. Sveltia saves changes as git commits automatically.

### Add/edit content manually

Create a markdown file in the appropriate `content/` subfolder with the correct frontmatter. Example article:

```markdown
---
title: "Your First 1-Star Review: A Superhost's Survival Guide"
date: 2026-04-01T12:00:00.000Z
category: "Guest Management"
excerpt: "It's going to happen. Here's how to handle it."
image: "/images/uploads/1-star-review.jpg"
featured: true
draft: false
---

Your article body goes here in markdown...
```

### Go live with the new homepage

When you're happy with the rebuild:

```bash
git checkout main
git merge homepage-rebuild
git push origin main
```

Then update `admin/config.yml` to change `backend.branch` from `homepage-rebuild` to `main`.

### Swap homepage.html to be the live page

```bash
# Back up the old landing page
mv index.html index-coming-soon.html

# Promote the new homepage
mv homepage.html index.html

git add -A
git commit -m "Promote homepage rebuild to live"
git push origin main
```

---

## Next Steps / TODO

- [ ] Enable Identity + Git Gateway in Netlify dashboard (see instructions above)
- [ ] Enable branch deploys in Netlify dashboard
- [ ] Push `homepage-rebuild` branch to GitHub
- [ ] Test CMS login at branch deploy URL + `/admin/`
- [ ] Write first real article via CMS
- [ ] Eventually: add a static site generator (Hugo, Eleventy, Astro) to render markdown content into HTML pages automatically
- [ ] Eventually: connect email signup forms to an email service (ConvertKit, Mailchimp, etc.)

---

## Important Notes

- **Sveltia CMS is a CDN script** — there's nothing to install or update locally. The admin panel loads the latest version from `unpkg.com` every time.
- **Content is just markdown files in git** — no database, no vendor lock-in. If you ever switch CMS tools, your content stays in your repo.
- **The site is currently static HTML** — the CMS saves markdown files, but nothing renders them into HTML pages yet. That's the "add a static site generator" step in Next Steps. For now, article pages won't exist as actual URLs until you add that build step.
- **Images uploaded via CMS** go to `images/uploads/` and are committed to git. Keep image sizes reasonable (<500KB) to avoid bloating the repo.
