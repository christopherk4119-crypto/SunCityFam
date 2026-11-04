# TODO — Sun City Roofing website

Everything below still needs real info from the owner. The site builds and works without it, but **don't launch until the 🔴 items are done**.

Most fixes are a single value in `src/config/business.ts`.

---

## 🔴 Before launch

| # | Item | Where | Notes |
|---|------|-------|-------|
| 1 | **Photos for hail, cedar, metal, gutters** | see "Photos" below | 20 real photos are live (roof replacement, repair, exterior renovation). Hail page now uses a finished roof; it still needs **one photo of actual hail damage** (bruised shingle, dented vent). Cedar shake, metal and gutters have no photo yet. Those pages show branded placeholders. |
| 2 | **Licensed & insured** | `business.ts` → `licensedInsured`, `licensedInsuredDetail` | Currently `false`, so "Licensed & Insured" is **hidden everywhere**. Flip to `true` only when WCB Alberta clearance + liability coverage can be shown. |
| 3 | **Estimate form endpoint** | `business.ts` → `formEndpoint` | Hosting is Vercel (no built-in forms). Create a free Formspree form with **suncityroofing123@gmail.com**, paste the endpoint. Until then, every form spot shows a call/text box. Submit a real test after launch. |
| 5 | **Point the domain at Vercel** | Landingsite DNS + Vercel → Domains | See README → Deploy. Don't cancel Landingsite until you know who holds the domain registration. |
| 4 | **Owner copy review** | All service pages | The service pages describe a process: tear-off to deck, ice & water at eaves/valleys, protecting landscaping, OSB re-sheeting on cedar, delivery planning on out-of-town jobs. That's standard good practice, but **Chris must confirm it matches what he actually does.** Don't publish process claims that aren't true. |

## 🟠 Claims to confirm (currently on the site)

- [ ] **Best-Price Guarantee terms.** Current fine print: "Bring us any written estimate for the same materials and scope of work and we will beat it." (`business.ts → bestPriceFinePrint`)
- [ ] **"$8,400 house + garage re-roof".** Is it still accurate and representative? (`business.ts → priceProof`) If not, change it or remove it from `PricingBlock.astro`, `faqs.ts` and `roof-replacement-lethbridge.astro`.
- [ ] **IKO product lines** (Cambridge? Dynasty?). The wind ratings in `ComparisonTable.astro` and on `/architectural-shingles/` currently say "up to ~210 km/h depending on product & install". Tie them to the actual product.
- [ ] **Warranty.** What does the workmanship warranty cover, and for how long? (`faqs.ts → warranty`)
- [ ] **Typical timeline** ("most houses done in a day or two"). (`faqs.ts → timeline`)
- [ ] **"Same-day quotes often available".** True?
- [ ] **"Call anytime. We answer."** This is backed by the 24-hour GBP listing. Make sure the phone really is answered at night, because the site now promises it in many places. I deliberately did **not** use "usually within 2 hours" because it's an unverified number.
- [ ] **Exterior renovation scope.** Photos + his banner prove siding/house wrap. Anything else? Soffit, fascia, windows? (`services/index.astro#exterior`)
- [ ] **Metal roofing scope.** Full roofs, or valleys/garages only? Panel types? (`metal-roofing-lethbridge.astro`)
- [ ] **Gutter scope.** Seamless? Materials? (`gutters-lethbridge.astro`)
- [ ] **"Most of the finished roofs in our gallery started out as hail damage claims"** (hail page). Added from the site manager's word. Chris to confirm.
- [ ] **Chris's bio.** He should rewrite it in his own words. (`MeetChris.astro`)

## 🟡 Content gaps

- [ ] *(Optional, owner chose to skip for now)* Google review links + live rating/count (`business.ts → googleReviewsUrl`, `googleWriteReviewUrl`, `rating`). Buttons and stars stay hidden until set.
- [ ] **Set up Google Search Console** after launch (free, ~10 min): verify the domain, submit `/sitemap-index.xml`. Without it you're blind to what Google indexes.

- [ ] **Photo of Chris** on a job site (`MeetChris.astro`, currently shows the branded hoodie)
- [ ] **High-res logo file** (SVG or large PNG). The real logo is in use, but cropped from the Facebook banner at only 227×269px, so it's soft on big screens. The supplied `sun-city-roofing-logo.png` was a screenshot with a Facebook carousel arrow over the "S", so it couldn't be used.
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

## 📸 Photos: what's in and what's not

**In (20):** see `src/content/projects/`. Every town is still UNKNOWN, so captions are generic ("Roof replacement · grey architectural shingles"). **Tell me the town for any of these jobs and I'll add it to the caption and the town page.** That's free local SEO.

**Skipped on purpose:**
- `light-grey-ridge-cap`: worker's face
- `manufactured-home-snow-slush`, `grey-hip-ridge-street-view`: another company's branded van in the shot
- `dark-grey-skylight-roof-vents`: finger + pink packaging on the roof
- `grey-shingles-skylights` (low-res copy), `frost-ridge-vents`, `snow-crew`: duplicates / too small

**Not used and shouldn't be, anywhere:**
- `certified-badge`: "CERTIFIED" by whom? No certifying body is named. A badge like that reads as a credential he doesn't have. Take it off the Facebook banner too.
- `sun-city-roofing-banner`: the roof photo in it is a stock image of European steel tile roofing, not his work. Fine as a Facebook cover only if the stock photo is swapped out. Note: it says **"INSURED CONTRACTORS"**. If that's true, get the proof and flip `licensedInsured` (item 2 above).

## 📸 Photos still needed

Same process as last time: run the photos through the other chat with the prompt, then send the zip (CSV + photos) here.

**Still missing:**

| Service | Needed |
|---|---|
| **Hail damage (top priority)** | 1 close-up of hail bruising/dented vent + 1 finished replacement; a before/after pair is ideal |
| Cedar shake removal | 1 shakes coming off + 1 fresh OSB deck |
| Metal / open metal valleys | 1 close-up of an open metal valley |
| Roof repair | 1 before/after of a repaired section |
| Gutters | 1 close-up of new eavestrough + 1 wide shot of the house |
| Cleanup | 1 magnetic sweeper on the lawn, 1 clean yard at the end |
| Chris | 1 on a job site |
