# TODO — Sun City Roofing website

Everything below still needs real info from the owner. The site builds and works without it, but **don't launch until the 🔴 items are done**.

Most fixes are a single value in `src/config/business.ts`.

---

## 🔴 Before launch

| # | Item | Where | Notes |
|---|------|-------|-------|
| 1 | **Real job photos** | `/photos-raw/` → see "Photos" below | The site has **zero** real photos right now. Every service card, service hero, gallery and the home hero show branded placeholders. This is the single biggest gap: real photos are the proof. |
| 2 | **Licensed & insured** | `business.ts` → `licensedInsured`, `licensedInsuredDetail` | Currently `false`, so "Licensed & Insured" is **hidden everywhere**. Flip to `true` only when WCB Alberta clearance + liability coverage can be shown. |
| 3 | **Netlify form notifications** | Netlify dashboard → Forms → Form notifications | Send to **suncityroofing123@gmail.com**. Then submit a real test from the live site and confirm the email arrives (it can't be tested before deploy). |
| 4 | **Owner copy review** | All service pages | The service pages describe a process: tear-off to deck, ice & water at eaves/valleys, protecting landscaping, OSB re-sheeting on cedar, delivery planning on out-of-town jobs. That's standard good practice, but **Chris must confirm it matches what he actually does.** Don't publish process claims that aren't true. |

## 🟠 Claims to confirm (currently on the site)

- [ ] **Best-Price Guarantee terms.** Current fine print: "Bring us any written estimate for the same materials and scope of work and we will beat it." (`business.ts → bestPriceFinePrint`)
- [ ] **"$8,400 house + garage re-roof".** Is it still accurate and representative? (`business.ts → priceProof`) If not, change it or remove it from `PricingBlock.astro`, `faqs.ts` and `roof-replacement-lethbridge.astro`.
- [ ] **IKO product lines** (Cambridge? Dynasty?). The wind ratings in `ComparisonTable.astro` and on `/architectural-shingles/` currently say "up to ~210 km/h depending on product & install". Tie them to the actual product.
- [ ] **Warranty.** What does the workmanship warranty cover, and for how long? (`faqs.ts → warranty`)
- [ ] **Typical timeline** ("most houses done in a day or two"). (`faqs.ts → timeline`)
- [ ] **"Same-day quotes often available".** True?
- [ ] **"Call anytime. We answer."** This is backed by the 24-hour GBP listing. Make sure the phone really is answered at night, because the site now promises it in many places. I deliberately did **not** use "usually within 2 hours" because it's an unverified number.
- [ ] **General exterior/renovation scope.** (`services/index.astro`)
- [ ] **Metal roofing scope.** Full roofs, or valleys/garages only? Panel types? (`metal-roofing-lethbridge.astro`)
- [ ] **Gutter scope.** Seamless? Materials? (`gutters-lethbridge.astro`)
- [ ] **Chris's bio.** He should rewrite it in his own words. (`MeetChris.astro`)

## 🟡 Content gaps

- [ ] *(Optional, owner chose to skip for now)* Google review links + live rating/count (`business.ts → googleReviewsUrl`, `googleWriteReviewUrl`, `rating`). Buttons and stars stay hidden until set.
- [ ] **Set up Google Search Console** after launch (free, ~10 min): verify the domain, submit `/sitemap-index.xml`. Without it you're blind to what Google indexes.

- [ ] **Photo of Chris** on a job site (`MeetChris.astro`)
- [ ] **Real logo file** (SVG preferred). `Logo.astro`, `public/favicon.svg`, `public/logo.png` and `public/apple-touch-icon.png` are placeholder recreations.
- [ ] **Default share image.** `public/og-default.png` is a branded text card. Replace it with the best job photo + logo (1200×630).
- [ ] **Full text of truncated reviews.** Steven W. and Nick B. (`src/content/reviews/*.md`). Copy it verbatim from Google and set `truncated: false`. Truncated reviews are left out of Review schema until then.
- [ ] **GA4 measurement ID** (`business.ts → ga4Id`). Once it's set, the site tracks `phone_call_click`, `sms_click` and `generate_lead` (thank-you page). Mark `generate_lead` and `phone_call_click` as **key events** in GA4.
- [ ] **Coaldale / Claresholm.** Add one specific real-job detail to each page (`service-areas/*.astro`).
- [ ] **Privacy policy.** The owner should review it, ideally with a lawyer (`privacy.astro`).

## 🟡 Off-site (not part of the build, but it affects rankings)

- [ ] **Facebook address** still says 1730 12th Ave S. Change it to **114 Stafford Bay N, Lethbridge, AB T1H 5P8**.
- [ ] **Retire suncityroofing@outlook.com** from the old site and every directory. The site now uses **suncityroofing123@gmail.com** to match GBP + Facebook.
- [ ] **BBB complaint.** Answer the unanswered complaint (C+ rating). The badge is intentionally not shown on the site.
- [ ] Check NAP on every directory (Yelp, HomeStars, Yellow Pages, Bing Places, Apple Business Connect) and make it match character-for-character.
- [ ] After launch: submit `https://suncityroofinglethbridge.net/sitemap-index.xml` in Google Search Console and run the key pages through the [Rich Results Test](https://search.google.com/test/rich-results). I couldn't run it from the build environment because external network access was blocked. The JSON-LD parses and follows Google's documented structure, but it hasn't been validated by Google's tool.

## 🟡 Service areas

Pages exist only for towns with **completed jobs**: Coaldale and Claresholm. Lethbridge is the home page. Everything else is covered by "we travel across Southern Alberta — call to confirm".

To add a town (e.g. Taber, Picture Butte, Fort Macleod, Raymond, Crowsnest Pass), do it **only once you've done a job there**:
1. Add `{ name: 'Taber', slug: 'taber' }` to `serviceAreas` in `business.ts`
2. Copy `src/pages/service-areas/coaldale.astro` → `taber.astro` and **rewrite the copy**. Don't just swap the town name; near-duplicate town pages hurt rankings.
3. Tag that town's project photos with `"town": "Taber"`

---

## 📸 Photos needed

No photos were supplied (there's no `/photos-raw/` folder yet). Workflow:

1. Owner puts photos in `/photos-raw/<job-folder>/`, with the folder name stating the facts, e.g. `coaldale-hail-replacement-iko-charcoal-grey/`. Loose photos go in `/photos-raw/unsorted/`. **`photos-raw/` is git-ignored on purpose**, because phone photos carry the GPS location of customers' homes.
2. Claude Code builds `photos-manifest.csv` (columns as in the original brief) and **stops for owner approval**.
3. Approved photos are renamed (`hail-damage-roof-replacement-coaldale-charcoal-grey.jpg`), copied to `src/assets/projects/`, and get one JSON file each in `src/content/projects/` (see README). Astro's image pipeline outputs WebP at 1600px and 800px and **strips all EXIF/GPS** (verified).
4. Flag and blur/skip any photo showing a readable house number, licence plate or face.

**Shot list (minimum to launch):**

| Service | Needed |
|---|---|
| Home hero | 1 wide, bright, finished roof. Best photo you have (`"heroFor": "/"`) |
| Hail damage | 1 close-up of hail bruising/dented vent + 1 finished replacement; a before/after pair is ideal |
| Roof replacement | 1 finished house, street view + 1 mid-job tear-off |
| Architectural upgrade | 1 close-up showing the dimensional shingle texture |
| Cedar shake removal | 1 shakes coming off + 1 fresh OSB deck |
| Metal / open metal valleys | 1 close-up of an open metal valley |
| Roof repair | 1 before/after of a repaired section |
| Gutters | 1 close-up of new eavestrough + 1 wide shot of the house |
| Cleanup | 1 magnetic sweeper on the lawn, 1 clean yard at the end |
| Chris | 1 on a job site |
