# 12 — UI/UX Audit & Redesign Roadmap (mobile first, light theme)

**Date:** 2026-10-26 · **Priorities set by the team:** (1) mobile, (2) desktop · **Direction:** bright, light theme — no dark surfaces · **Content:** placeholders (teachers, parent voices, FAQ, timetable, LINE link, forms) are *intentional* and will be replaced with real data after UI/UX approval, so this document judges **design, layout and interaction only**. Items that must be swapped for real data before go-live are listed once, in section 8, as a launch checklist rather than as defects.

**Method:** every page loaded locally and inspected at 375×812 (mobile) and 1440×900 (desktop); DOM/CSS measured with scripts (tap-target sizes, font sizes, overflow); Lighthouse mobile run; benchmark sites (BST, YIS, Malvern College Tokyo, Branksome Hall, ASIJ, Nishimachi, Harrow) opened on mobile and desktop.

> Older docs `01`–`11` contain *projected* scores (e.g. Lighthouse 98/100). Treat them as unverified; numbers here are measured.

---

## 1. Verdict

The structure and the Japanese-parent storytelling are sound. The visual layer is what's holding the site back, and almost all of it is fixable in the design system rather than the content:

1. **The first mobile screen has no picture.** It is a 3-line pill badge, a 22 px headline, an English eyebrow, a 6-line paragraph, two stacked buttons and three tick-bullets. The photo appears only after ~1.3 screens. Every benchmark opens with a photograph.
2. **The mobile page is 25.9 screens long** (21,033 px). Three tall cards, a stacked stats block, tab cards, a gallery and long text blocks all run as single endless columns.
3. **Dark navy blocks dominate** (stats strip, every inner-page banner, table headers, booking section, footer, utility bar). This is the opposite of a bright, welcoming school feel — see section 4.
4. **Japanese line-breaking is broken in headlines:** "日本/語。", "一/貫教育", "授/業料", "温/かな", "つい/て". It reads as unpolished on every page.
5. **Fee tables are unusable on a phone** (557 px and 846 px wide in a 375 px viewport, scrolled sideways with a tiny scrollbar; first column truncated).
6. **Tap targets and type are too small:** 16 interactive elements under 44 px (footer links 19–20 px, drawer links 29 px, language buttons 28 px); 26 text elements at 10–11 px and 85 at 13 px.
7. **Every inner page uses the same flat navy banner + a narrow white card**, with no imagery — pages feel like documents, not a school.
8. Emoji used as icons (🟢 📞 📍 🚌 💡 👉) — inconsistent across devices and cheap next to the benchmarks.

---

## 2. What the best sites do on a phone

Opened at 375 px in this session:

| Site | First mobile screen | Note for BIS |
|---|---|---|
| **BST** | Full-bleed photo of real pupils, one big serif headline, one button, slim header (logo centred, search, MENU). White content below. | Image first, one action, light page. |
| **Branksome Hall** | White 56 px header (crest + wordmark + MENU) → large aerial photo → a light-green announcement band ("Open Houses…") → white content. | Light and calm; a single coloured band carries the call to action. |
| **Malvern College Tokyo** | Full-screen photo with a "Quick links" bar fixed at the bottom. | Thumb-zone navigation. |
| **YIS** | Wordmark header with *Apply Now* always visible, full-width photo with a short overlay. (Uses a dark theme — not what BIS wants.) | Persistent Apply button in the header. |

**Mobile patterns to copy:** slim header · photo as the first thing · one primary action · short headline, no paragraph above the fold · light, generous white space · content pushed into sub-pages and swipe rows instead of one endless scroll.

**Desktop patterns to copy (BST, YIS, ASIJ, Nishimachi, Harrow):** full-bleed hero, persistent *Enquire/Visit/Apply* in the header, stats band, age-band programme cards with photos, persona cards, editorial two-tier headings, footers that repeat the key links.

**What BIS can own:** Japanese-parent reassurance, a clear fee-and-subsidy tool, LINE and a school-bus map — none of the English-first schools offer these.

---

## 3. Audit — mobile (priority 1)

Measured on `index.html` at 375 px unless stated.

### 3.1 Home page

| # | Finding | Evidence |
|---|---|---|
| M1 | Hero is text-only; photo is below the fold. Hero section is 1,032 px tall (>1 screen). Primary CTA at y≈509. | screenshot, `heroH` |
| M2 | H1 is 22 px / 28.6 px line height — small for a hero, and it widow-wraps ("日本" / "語。"). English eyebrow ("CAMBRIDGE INTERNATIONAL CURRICULUM ROOTED IN JAPAN") wraps to 2 lines and repeats the message. Location badge wraps to 3 lines. | screenshot |
| M3 | Hero CTAs duplicate the fixed bottom bar (電話 / LINE / 体験予約) — on the first screen the same actions appear twice, and the bar permanently covers 64 px (and the form fields/footer when scrolled). | screenshot |
| M4 | Stats card stacks 4 stats vertically, using a full screen of dark navy. | screenshot |
| M5 | "3 reasons" are three tall cards, ~2,000 px of text. | `about` section 1503→3432 |
| M6 | Programme tabs are three full-width stacked cards, then the panel below; feature lists wrap in a narrow column with tiny icons ("フォニックス＆英会話 / (発音・リスニング)" splits awkwardly). | screenshot |
| M7 | Fee calculator: native `<select>`s are fine, but the result sits far below the selects; fee table scrolls sideways (557 px) with a hidden first column. | screenshot |
| M8 | Gallery is 9 full-width stacked cards (~3,300 px) — the longest single block on the page. | section 11329→14619 |
| M9 | Access section shows a small hand-drawn diagram inside a card; no real map/route view. | screenshot |
| M10 | Booking form is long (6 fields incl. a native datetime picker) inside a dark block with the sticky bar still covering its bottom. | screenshot |
| M11 | Footer: link rows are 19–20 px high; small grey 10.5 px footnote with 2.5:1 contrast. | metrics |

### 3.2 Global mobile UI

- **Header:** 66 px, crest + "BIS JAPAN" + hamburger. Good start. Language switch and CTA are hidden in the drawer (benchmarks keep an *Apply/Enquire* button visible in the header).
- **Drawer:** clean, but rows are 29 px high (text-only), language buttons 28 px, no `role="dialog"`/`aria-modal`, focus is not moved into it or trapped, and it lists only anchor jumps (no *Home*, *Contact*, *Tuition* sub-pages).
- **Typography:** body 16 px is fine; but 85 text nodes at 13 px and 26 at 10–11 px is too small for Japanese on a phone. Headings break mid-word (no `word-break: auto-phrase`, no phrase-aware `<wbr>`; `text-wrap: balance` alone doesn't fix it).
- **Spacing:** big card-in-card nesting (white card on cream with shadow, then inner boxes) eats ~40 px of width per side on a 375 px screen.
- **Inner pages (about, curriculum, admissions, access, contact):** 3.4–7.6 screens each. Same navy banner on every one; headings like "当校について (About BIS Japan)" mix English in brackets and wrap badly; curriculum cards put a language pill and the heading side-by-side so the heading wraps to 4 lines; admissions tables are 557/846 px wide.
- **Safe areas / keyboard:** fixed bar has no `env(safe-area-inset-bottom)` handling; on the form it stays pinned over the fields.
- **Performance on mobile (Lighthouse, simulated 4G, local server):** Performance 55, Accessibility 97, Best Practices 96, SEO 100. Causes: render-blocking Google Fonts CSS (3 families, 12 weights), a **620 KB PNG crest shown at 52 px** (a 7 KB `crest.svg` already exists), 299 KB hero JPEG, event PNGs 0.4–2.3 MB each. Contrast failures: white on LINE green (#06C755) = 2.25:1, teacher role green 3.76:1, 10.5 px grey footnote 2.52:1. *(Re-measure on the deployed URL; local server has no compression.)*

---

## 4. Going light — replacing the dark theme

There is no dark *mode*; the dark look comes from these navy surfaces. Each gets a bright replacement:

| Current dark surface | Where | Light replacement |
|---|---|---|
| Top utility bar (`navy-950`) | all pages, desktop | Remove on mobile; on desktop fold phone + language into the white header or use a thin cream strip with navy text. |
| Stats strip (navy gradient card) | home | White cards on a lime-tint or cream band; big navy numerals with a lime underline; 2×2 grid on mobile (or swipe row). |
| Inner-page banner (navy gradient) | about / curriculum / admissions / access / contact | Light page header: breadcrumb, large H1, one-line lead, and a wide rounded photo or soft lime/sky tint background. |
| Table headers (navy) | fee tables | Light tint header (lime-50 / sky-50) with navy bold text and a lime bottom rule. |
| Booking section (navy gradient) | home | Cream or lime-50 section with a white form card; LINE option as a green-outline card. |
| Footer (`navy-950`) | all pages | Cream/white footer with navy text, a hairline top border, light link groups (collapsible on mobile). |
| Brand navy | text, icons, outline buttons | Keep navy as the **text and line colour**, not as a background. |

**Light palette (derived from the crest):**
- Backgrounds: white `#FFFFFF`, warm cream `#FBFAF5`, lime tint `#F7FAEB` (already `crest-lime-50`), sky tint `#EEF4FC` (`navy-50`).
- Text: navy `#0D1D34`/`#142A4A`; body slate `#44403C`.
- Accent: crest lime `#9CBD30` **for fills only** (buttons, bars, highlights) with **navy text on it** (≈7.9:1). Lime as *text* on white fails (≈2.2:1) — use `lime-700` `#647B1A` (≈4.8:1) for small lime-coloured text and links.
- LINE: keep the brand green for the icon/outline, and use a darker green fill or dark text so labels pass contrast.
- Drop amber/emerald/red event badges and gradient buttons: one accent colour plus navy.

---

## 5. Audit — desktop (priority 2)

- **Home hero** (1440 px): good split layout, but the framed photo has two floating cards overlapping its caption; photo is small relative to the screen. Make it a large bleed photo.
- **Header:** utility bar + header carries *two* language switches (top-right pill and header pill) and two CTAs. Merge into one clean white header.
- **Inner pages:** identical navy banner; content in an ~820 px white card centred in a 1440 px viewport with empty gutters; long single-column text; no imagery above the fold. Use two-column text+photo sections, a sticky in-page table of contents for long pages, and wider card grids.
- **Fee table (desktop):** works, but navy header and the orange "¥0〜¥17,000" cell make the page look busy; calculator and table compete.
- **Teacher/testimonial/gallery** grids are 3-up cards — fine structurally; need real photography to carry them.
- **Repeated white-card-on-cream pattern** with the same shadow on every section → monotone rhythm. Vary section backgrounds (white / lime tint / sky tint / photo band).
- **Access page:** diagram instead of a map.

---

## 6. Design direction — "Bright British heritage, warm Japanese welcome"

Two light directions to review (recommend **A with a touch of B**):

- **A · Bright Heritage** — white/cream, navy type, lime accents, serif display headings (Noto Serif JP / Shippori Mincho for JA + one Latin serif for EN), sharp-ish 8–12 px radii, photography-led. Closest to BST/Branksome, feels established.
- **B · Friendly Bright** — soft tinted sections (lime, sky, sand), rounded 16–24 px cards, rounded Japanese sans (Zen Maru Gothic / M PLUS Rounded), more illustration/icon warmth. Closer to local kindergarten/bilingual-school sites.

**Shared rules:** one accent colour · one inline-SVG icon set (replace all emoji) · 2 type families, 3 weights, self-hosted and subset · fluid type with `clamp()` · consistent radius/shadow scale · motion limited to gentle reveal, tab/accordion transitions and a 200 ms drawer, all off under `prefers-reduced-motion`.

---

## 7. Mobile-first redesign specification

### 7.1 Global mobile system
- **Type:** body 16–17 px / 1.8; nothing below 12 px; headlines 28–32 px (H1) with `word-break: auto-phrase` **plus** build-time phrase breaks (BudouX `<wbr>`) because Safari support for `auto-phrase` lags; `line-break: strict`; no English in brackets inside JA headings.
- **Tap targets:** ≥ 44×44 px everywhere (footer links, drawer rows, language buttons, FAQ headers, tab pills).
- **Header (56 px):** crest + "BIS Japan", compact **JA | EN** toggle visible in the header, hamburger. Optional: small *見学予約* pill in the header once scrolled past the hero.
- **Bottom action bar:** keep (call · LINE · book) — it is the right pattern — but show it only after the hero CTA has scrolled out of view, hide it on the booking section and when the keyboard is open, add `padding-bottom: env(safe-area-inset-bottom)`, 48 px high, reserve matching body padding.
- **Drawer:** full-height sheet, `role="dialog" aria-modal="true"`, focus moved in/trapped/returned, rows 52 px, grouped (Learn · Fees · Visit · Contact), language and phone at the bottom.
- **Layout:** single column, 16 px gutters, no nested cards; swipe rows (`scroll-snap`) for repeating items; `100svh` for hero.
- **Images:** `srcset`/WebP/AVIF, explicit width/height, hero `fetchpriority="high"`, everything else `loading="lazy"`.

### 7.2 Home page, target ≤ 12 screens (from 25.9)

| # | Section | Mobile pattern |
|---|---|---|
| 1 | **Hero** | Photo top ≈45 % of the screen (placeholder now), headline 28–30 px (2–3 lines), one-line sub-copy, **one** primary button (見学・体験を予約), LINE as a secondary text/outline button, 3 trust chips in one swipe row. No eyebrow, no paragraph, no location badge. |
| 2 | Trust band | 2×2 light stat cards (or swipe row). |
| 3 | Three reasons | Horizontal snap cards (≈85 % width) with icon + 2-line summary; "read more" opens an accordion. |
| 4 | Programmes | Sticky 3-pill segmented control (幼児 / 小学 / 中高) → single panel: photo, 3–4 icon bullets in a 2-col grid, "see programme" link. |
| 5 | Fees | Calculator as one card (selects on top, result pinned below them); **stage cards** instead of a table (each: name, age, monthly fee, net after subsidy, bus). |
| 6 | People | Snap carousel of teacher cards (placeholder portraits). |
| 7 | Parent voices | Snap carousel, 1 card per view. |
| 8 | Life at BIS | 2-column photo grid (6 images) + "see all" → lightbox/gallery page; no 9 stacked cards. |
| 9 | Access | Real embedded map (tap to expand), tabs *電車 / バス / 車*, bus routes as collapsible rows. |
| 10 | FAQ | Accordion (keep), 56 px rows. |
| 11 | Booking | Light card, **3 required fields** (name, phone or LINE, child's age) + optional date/notes in a "more details" disclosure; inline success state (no `alert()`); LINE as alternative card. |
| 12 | Footer | Light, collapsible groups, 44 px links. |

### 7.3 Inner pages (mobile)
- Light page header (breadcrumb, H1, lead, photo) replacing the navy banner.
- **Admissions/tuition:** tables become stage cards or an accordion per stage; steps for the subsidy become a numbered vertical stepper.
- **Curriculum:** one subject card per screen with image on top, pill above (not beside) the heading; subject list as a swipe row.
- **About:** short story + timeline; motto as a light band; the 8 pillars as a 2-col icon grid.
- **Access:** map first, then routes.
- **Contact:** three action tiles (LINE / call / mail) → short form.

### 7.4 Desktop (priority 2)
- Single white header (logo, 5 links, JA|EN, *見学予約* button), sticky.
- Hero: large right-hand photo bleeding to the edge, light left panel, no overlapping floating cards; stats band overlapping the hero bottom edge in white.
- Sections alternate white / lime tint / sky tint; two-column text+photo; programme cards with photos; sticky TOC on long pages.
- Inner-page headers: breadcrumb + H1 + photo strip.
- Light footer, 4 columns.

---

## 8. Plan

**Process:** because UI/UX approval gates the real data, work in reviewable slices; each slice is checked at 375, 390 and 430 px (and 1440 px) before moving on.

1. **Design brief & tokens (S):** pick direction A/B; finalise light palette, type, radius/shadow scale, icon set; update `design/tokens/*` (currently navy-dark-heavy).
2. **Mobile home prototype (M) — the approval artifact. ✅ Built:** `index-v2.html` + `css/v2.css` + `js/v2.js` + `images/v2/` (direction A + B's warmth; light theme; 11.9 mobile screens vs 25.9; Lighthouse mobile Performance 87 / Accessibility 100 / Best Practices 100 on a local uncompressed server; SEO shows 63 only because the prototype is `noindex`). Open it locally and add `?ph=off` to hide the placeholder chips or `?lang=en` for English. Original spec: rebuild `index.html` per 7.2 in the light theme with placeholder content (same markup, new CSS/components). Placeholders get one consistent, switchable treatment (e.g. a `data-placeholder` attribute with a single CSS/JS flag) so reviewers see realistic content and the badges can be turned off with one change.
3. **Global components (M):** header, drawer, bottom bar, buttons, cards, swipe rows, accordions, stage cards, form. Accessibility baked in: `:focus-visible`, focus-trapped dialog, `prefers-reduced-motion`, ≥44 px targets, contrast ≥ 4.5:1.
4. **Desktop home (M):** per 7.4.
5. **Inner pages mobile → desktop (M–L):** about, curriculum, admissions, access, contact.
6. **Performance pass (S–M):** self-host/subset fonts, `crest.svg`, responsive WebP/AVIF, remove unused images, compress; re-run Lighthouse on the deployed URL (targets: all four ≥ 90, LCP < 2.5 s on throttled 4G, home transfer < 1.5 MB, home ≤ 12 mobile screens).
7. **Approval review** with the team on real phones (iPhone SE-size, a mid Android, a large phone).
8. **After approval:** replace placeholders with real data (checklist below) and re-check layouts with real content lengths and photos.
9. **Structure upgrade (optional, after approval):** shared header/footer via a static-site generator (Astro/Eleventy), real `/ja/` and `/en/` pages, CMS for news/events — this removes the 6-file copy-paste and ~515 inline `style=""` attributes that make design changes slow.

### Launch checklist (swap placeholders for real data — not defects)
- Real LINE Official Account URL (all buttons currently go to `line.me`) and a working form endpoint (both forms currently only show a success message).
- Real teacher portraits/bios, parent voices (with consent), FAQ answers, timetable, head's message.
- Real BIS photography (the current hero/classroom images look like stock photos; genuine BIS photos exist in `images/legacy/` but are low-resolution) and photo/video consent.
- Subsidy wording and numbers confirmed with 海老名市 (eligibility needs a 保育の必要性認定 and a registered facility); safety/fact claims confirmed by the school.
- Consistent contact e-mail (home page shows `info@bisjapan.org`, contact page `bisjpn@gmail.com`).
- Deploy workflow publishes the whole repo (`path: '.'`, including `.agents/` and `docs/`) — switch to a build/`public` folder.
- Add favicon, OG image, `robots.txt`, `sitemap.xml`; fix `hreflang="en"` (points to `/en/`, which doesn't exist).

---

## 9. Open decisions

1. Direction **A (Bright Heritage)**, **B (Friendly Bright)**, or A + B warmth?
2. Header CTA wording: 見学予約 / 無料体験予約 / お問い合わせ?
3. Should the home page keep the fee calculator, or move it to a dedicated Tuition page with a teaser on home?
4. Keep the bottom action bar on all pages, or only home + long pages?
5. Language switch: keep the JS toggle for now, or move to separate `/ja/` `/en/` pages in step 9?

---

## Sources (viewed this session)
BST — https://www.bst.ac.jp · YIS — https://www.yis.ac.jp · ASIJ — https://www.asij.ac.jp · Nishimachi — https://www.nishimachi.ac.jp · Malvern College Tokyo — https://www.malverncollegetokyo.jp · Harrow — https://www.harrowschool.org.uk · Branksome Hall — https://branksome.on.ca · Orange Monke roundup (vendor blog) — https://orangemonke.com/blogs/best-school-websites/
