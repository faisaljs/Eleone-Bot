# Eleone Website

This folder contains the standalone multi-page website for the Eleone Discord bot,
styled with a liquid-glass (frosted, translucent) design system that adapts to
light/dark mode and every screen size.

## Pages

- `index.html` - Landing page and system overview
- `features.html` - Full feature architecture
- `commands.html` - Searchable command explorer (JSON-driven, shareable filter URLs)
- `premium.html` - Premium model and pricing page
- `contact.html` - Deploy/support page
- `privacy-policy.html` - Privacy policy (template — fill in your own details)
- `terms-of-service.html` - Terms of service (template — fill in your own details)
- `404.html` - Not-found page

## Assets

- `assets/css/` - Shared liquid-glass design system + page-specific styles
- `assets/js/` - UI interactions, command explorer logic, and shared toast/clipboard helpers
- `assets/data/commands.json` - Command catalog source

## Notable features

- Light/dark theme, saved locally, respecting system preference on first visit
- Command explorer: search, category filters, premium-only toggle, copy-to-clipboard
  usage, and filters encoded in the URL so a search can be shared or bookmarked
- Scroll progress bar, floating back-to-top button, skip-to-content link
- `robots.txt` / `sitemap.xml` for search engines, Open Graph tags per page
- Respects `prefers-reduced-motion`

## Run Locally

> Do not open HTML via `file://` directly, because `commands.html` loads JSON with `fetch`.

### Option A (Node.js, recommended)

From project root:

```bash
npx serve website -l 8080
```

Then open: `http://localhost:8080`

### Option B (Node.js alternate)

```bash
npx http-server website -p 8080 -c-1
```

### Option C (Python, only if installed)

```bash
cd website
python -m http.server 8080
```

## Deploy

You can deploy this folder directly on:

- GitHub Pages
- Cloudflare Pages
- Netlify
- Vercel (static)
- VPS (Nginx/Apache)

Use `website` as the publish root. `vercel.json` includes clean-URL rewrites for
`/features`, `/commands`, `/premium`, `/contact`, `/privacy-policy`, and
`/terms-of-service`; other hosts will fall back to the `.html` filenames, which
the nav's active-state logic and internal links both already account for.
