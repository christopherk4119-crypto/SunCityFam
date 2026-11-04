# Sun City Roofing — suncityroofinglethbridge.net

Static Astro + Tailwind site for Sun City Roofing, Lethbridge AB. Mobile-first and built to get visitors to call **(403) 929-5588**.

> **Before launch, read [`TODO.md`](./TODO.md).** Several claims and all the job photos still need owner input.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build → dist/
npm run preview    # serve the production build
```

Node 22+.

## Change phone, email, address, hours, etc.

Everything lives in **`src/config/business.ts`**. Every page, the header/footer, the sticky call bar and all JSON-LD read from it. Change it once and it changes sitewide.

Toggles you'll likely touch:

| Setting | What it does |
|---|---|
| `licensedInsured` | `true` shows "Licensed & Insured" in the hero, trust bar and Why Choose Us. Leave `false` until it can be proven. |
| `rating` | `{ value, count }` shows "★ X.X on Google · N reviews" and outputs AggregateRating schema. `null` hides both. |
| `social.googleReviewsUrl` / `googleWriteReviewUrl` | Shows the review buttons. |
| `ga4Id` | Loads GA4 and tracks tel/sms clicks + the thank-you conversion. |
| `serviceAreas` | Towns list (footer, schema `areaServed`, service-area pages). |

## Add a review

One Markdown file per review in `src/content/reviews/`. **Real Google reviews only, word for word.**

```yaml
---
author: Jane D.            # first name + last initial
quote: "Exact text from Google…"
truncated: false           # true if you only have the cut-off "More" text
tags: [Reasonable price]   # optional Google highlight tags
placements: [pricing]      # where it shows: hero, pricing, speed, cleanup, longevity, quality
order: 8
---
```

All reviews appear on `/reviews/`. `placements` puts a review next to the objection it answers on other pages.

## Add a project photo

1. Put the photo in `src/assets/projects/` with a descriptive name:
   `hail-damage-roof-replacement-coaldale-charcoal-grey.jpg`
2. Add a JSON file with the same name to `src/content/projects/`:

```json
{
  "image": "../../assets/projects/hail-damage-roof-replacement-coaldale-charcoal-grey.jpg",
  "alt": "Finished hail damage roof replacement with charcoal grey IKO shingles on a two-storey home in Coaldale",
  "caption": "Hail damage replacement · IKO Charcoal Grey · Coaldale",
  "service": "hail-damage-replacement",
  "town": "Coaldale",
  "shotType": "after",
  "pairId": "coaldale-hail-1",
  "featured": true,
  "heroFor": "/hail-damage-roof-repair-lethbridge/"
}
```

- `service`: one of `hail-damage-replacement, roof-replacement, architectural-upgrade, cedar-shake-removal, metal-roofing, open-metal-valleys, roof-repair, gutters, cleanup, crew, other`
- `town`: only if known for sure. Town pages show **only** photos tagged with that town.
- `pairId`: give a `before` and an `after` shot of the same roof the same id. A before/after slider then appears automatically.
- `featured`: shows on the home page "Recent projects".
- `heroFor`: the one page this photo is the main image for (`"/"` = home hero background). Use each photo as `heroFor` on one page only.
- `alt` ≤ 125 characters; describe what's in the photo and don't keyword-stuff.

Astro converts photos to WebP (1600px + 800px), lazy-loads everything except the hero, and **strips EXIF/GPS metadata**. Raw phone photos never ship.

Where photos show up automatically: service cards, service-page hero + project strip, gallery (with service filter), town pages, home page. Until a service has a photo, it shows a red/white branded placeholder. **Never use stock photos in their place.**

## Deploy to Netlify

1. Push this repo to GitHub.
2. Netlify → **Add new site → Import from Git** → pick the repo. Build settings come from `netlify.toml` (`npm run build`, publish `dist`).
3. **Domain:** Site settings → Domain management → add `suncityroofinglethbridge.net` (keep this domain; it holds the existing rankings). Enable HTTPS.
4. **Form notifications:** Forms → `estimate` → Settings → Form notifications → Email → `suncityroofing123@gmail.com`. Submit a test from the live site.
5. **Redirects:** `public/_redirects` is applied automatically. Add a 301 for every old URL that no longer exists.
6. Submit `/sitemap-index.xml` in Google Search Console.

**Cloudflare Pages:** also works (build `npm run build`, output `dist`, `_redirects` supported), but Netlify Forms won't. Set `FORMSPREE_ENDPOINT` in `src/components/EstimateForm.astro` to use Formspree instead.

## What's where

```
src/config/business.ts      ← single source of truth (NAP, toggles, services, towns)
src/content/reviews/        ← real reviews (Markdown)
src/content/projects/       ← project photo metadata (JSON)
src/assets/projects/        ← project photos
src/data/faqs.ts            ← shared FAQ answers
src/lib/schema.ts           ← JSON-LD builders (RoofingContractor, Service, FAQPage, Breadcrumb, ImageObject)
src/layouts/Base.astro      ← <head>, SEO meta, JSON-LD, header/footer, sticky call bar, GA4 tel tracking
src/layouts/ServicePage.astro, TownPage.astro
src/components/             ← EstimateForm, CtaBand, InsuranceSteps, BeforeAfter, MapFacade, …
public/_redirects, robots.txt, fonts/ (self-hosted Outfit + Inter, OFL)
```

## Conversion & tracking

- Sticky mobile call bar on every page; sticky header with a tap-to-call number.
- CTA block every 2–3 sections; every page ends with the red "Ready to Get Your Roof Done Right?" band.
- With `ga4Id` set: `phone_call_click` / `sms_click` events fire on every `tel:`/`sms:` link (with a `link_location` param), and `generate_lead` fires on `/thank-you/`.

## Quality bar (checked at build time)

- Lighthouse mobile **with real photos**: performance 96–100, accessibility/best practices/SEO 100 on every page tested; CLS 0. LCP 2.0–2.9s under Lighthouse's simulated slow 4G (photo-heavy pages like the gallery are the slowest).
- Photos are cropped to their display shape (4:3 cards, 4:3 service heroes, 16:10 home hero) at build time, served as responsive WebP at quality 45–60, and only the hero is preloaded.
- One H1 per page, titles ≤ 60 chars, descriptions ≤ 155 chars (the dev server warns when they're over).
- No horizontal scroll at phone width.
