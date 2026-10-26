# 15 — UI/UX Audit, Round 4 (v2 home on `main`, commit `77043d6`)

**Date:** 2026-10-26 · **Priorities:** mobile first, desktop second · placeholders (photos, people, voices, FAQ, LINE/form wiring) are intentional and not judged.

**New angles this round** (earlier rounds covered layout, overflow, tap targets, focus rings, contrast, text zoom, landscape, forms, layout shift, links): the **screen-reader view** (accessible names, labels, landmarks), a **content stress test** with 2–3× longer real-world text, **copy and number consistency**, **share-preview / launch metadata**, **no-JavaScript behaviour**, **image sizes vs what is shown**, **performance on gzip hosting** (what GitHub Pages actually serves), and **press/tap feedback**.

---

## Verdict

The build is solid. It survived a stress test with much longer text, every control has a name, and with realistic hosting (gzip) it scores **90–91 Performance**. What remains is mostly **the layer around the page**: how the link looks when a parent shares it in LINE, whether the wording and numbers read as one voice, and small touch-feedback details. One strategic gap stands out: only the home page has the new design — everything else on the site is still the old dark v1.

---

## P1 — fix next

| # | Finding | Evidence | Fix |
|---|---|---|---|
| **1** | **The link has no share preview.** When a parent pastes the school's address into a LINE chat (the main channel in Japan), LINE reads Open Graph tags to draw the card. There are none, so the card shows a bare URL. Also no `apple-touch-icon` (iPhone home-screen icon), no PNG favicon (the crest is SVG-only), no canonical, no `School` structured data. | `index-v2.html` head: `og:*` 0, `twitter:*` 0, `apple-touch-icon` 0, `canonical` 0, `ld+json` 0. Missing files: `og-image.jpg`, `apple-touch-icon.png`, `favicon.ico`, `robots.txt`, `sitemap.xml`, `manifest`, `404.html`. | Add `og:title / description / image / url / locale`, a 1200×630 `og-image.jpg` (crest + photo), a 180 px `apple-touch-icon.png`, a PNG/ICO favicon. Add `canonical` and `School` JSON-LD **when v2 becomes the real home** and `noindex` is removed. Test the card by pasting the URL in a LINE note-to-self. |
| **2** | **Money, grades and the booking action are written several different ways on the same page.** | **Money:** `¥37,000` (9×), `35,000円`, `3.7万円`, `1.7万円`, `2万円`, `0円〜` all appear. **Grades:** "Grade 1〜5", "Grade 6〜7", "Nursery / LKG / UKG", "小1〜小5" in the form — but Japanese parents think in 年少・年中・年長 / 小1…. **Booking verb:** 見学予約 (header), 無料体験・見学を予約 (hero), 体験予約 (bar), 無料体験を申し込む (form), 体験申込み・お問い合わせ (footer), 無料体験・お問い合わせ (menu). | One style guide: **JA amounts "37,000円"** (EN keeps "¥37,000"), ranges "0〜17,000円"; show both systems once: **"Nursery（年少）／LKG（年中）／UKG（年長）／Grade 1（小1）"**; one action family: **「無料体験・見学を予約」** (long) / **「見学予約」** (short) / button **「この内容で予約する」**. |

## P2 — polish

| # | Finding | Evidence | Fix |
|---|---|---|---|
| 3 | **Menus use different words for the same place.** | Header "授業料" vs menu/footer "授業料と無償化"; "プログラム" vs "プログラム・カリキュラム"; "講師・スタッフ" vs "講師・スタッフ紹介"; "アクセス" / "アクセス・送迎バス" / "アクセス・スクールバス" — and **送迎バス** vs **スクールバス** both mean the bus (the page body says スクールバス). | One label per destination everywhere; use **スクールバス** throughout. |
| 4 | **Phones at 2× density download the big hero file.** A 375 px phone at 2× needs 750 px; the 720 w file is just short, so the browser picks the 1280 w file (**69 KB**) instead of a ~38 KB one. | Measured: `currentSrc = hero-1280.webp` at DPR 2. | Add an ~840 w variant to the `srcset` (saves ~30 KB on most phones). |
| 5 | **Tap feedback is thin.** No `-webkit-tap-highlight-color` rule (browsers draw a grey/blue flash over the lime buttons), and only 3 of 10 interactive components have a pressed state (`.btn`, `.alt-card`, `.ab-btn`). Missing: stage tabs, language buttons, photo tiles, menu button, text links, FAQ/footer/details rows, ※. | CSS grep: `tap-highlight` 0, `:active` 3, `touch-action` 0. | `-webkit-tap-highlight-color: transparent`, a subtle `:active` (scale .98 / tint) on all of them, `touch-action: manipulation` on buttons and links. |
| 6 | **Without JavaScript, content is hidden and some controls are dead.** 4 tab panels carry `hidden` (Primary, Secondary, bus and car directions) and their tab buttons do nothing; the menu button does nothing; the form has no `action`. (Affects JS-blocked in-app browsers, reader modes, crawlers.) | 4 `role="tabpanel" … hidden`; 1 `<noscript>` (fonts only); `<form>` without `action`. | `<noscript><style>[role=tabpanel][hidden]{display:block!important}.seg-sticky{display:none}</style></noscript>` plus a small "お電話・LINEでも承ります" notice; make the form fall back to `mailto:` or the phone number. |
| 7 | **English-speaking visitors see Japanese first.** Language is remembered after a manual switch, but never suggested. | `navigator.language` is not used. | If the browser language is English and nothing is stored, show a slim, dismissible "View in English" bar (don't switch automatically). |
| 8 | **Nothing is measurable.** No analytics or event hooks, so you can't tell whether the hero button, LINE, phone or the form brings enquiries. | No `data-track`, `dataLayer`, `gtag`. | Add `data-track="…"` to the key actions now (hero CTA, LINE ×5, phone ×3, form submit, calculator, tab switches, ※ sheet) and wire to the chosen tool (with cookie-consent if needed) later. |

## P3 — strategic

| # | Finding | Fix |
|---|---|---|
| 9 | **Only the home page has the new design.** `index.html` (the live home) and `about / curriculum / admissions / access / contact` are still the old dark v1; the v2 home isn't linked from anywhere. Today's v2 menu works by jumping to sections of the same page. | Build the inner pages in v2 in this order of parent interest: **Tuition & subsidy → Access & bus → Contact / booking → Curriculum → About**; then swap `index-v2.html` into `index.html`, update links, add `robots.txt` / `sitemap.xml`, remove `noindex`. |
| 10 | **First paint on a slow connection is gated by one 89 KB headline font.** With gzip hosting Lighthouse reports FCP/LCP 2.8 s (Performance 90–91); with the web font blocked it was 1.5 s (Performance 97). Lighthouse counts the font as blocking because it arrives before first paint on a fast local server; a real slow phone would show the headline in a fallback serif first. | After deploy, confirm on the real URL (PageSpeed Insights / WebPageTest). Then either self-host the subset with `preload`, trim the glyph set, or use the system serif (zero bytes, less distinctive). |

---

## Verified OK this round

- **Screen-reader view:** all **101 interactive elements have accessible names** (the two the script flagged are the bottom-bar links while the bar is hidden, which is correct); no two controls share a name but go to different places; all **7 form fields have a label**, and the three required ones link their error text with `aria-describedby`; **14 landmarks/sections** are named; heading order is `h1 → h2 → h3`; decorative crests are `alt=""` inside a link that has its own `aria-label`.
- **Content stress test:** I replaced ~30 text slots (names, roles, bios, quotes, FAQ, fee rows, chips, button text, address, dropdown options) with 2–3× longer real-world Japanese. At **375 px and 320 px**: no horizontal overflow, no clipped text, no card overflow; the hero button wraps to two lines inside its 54 px height; the stage tabs grow from 73 to 85 px. The layout will hold when real data arrives.
- **Notation that is already consistent:** ranges all use 〜 (25×), Japanese parentheses are full-width everywhere (28×, no ASCII), ※ is always ※ in Japanese and `*` in English, a single phone-number format (046-259-9108), opening hours as 9:00〜18:00.
- **Images:** the whole page with every lazy image loaded transfers **288 KB**; gallery thumbnails (480 w at 164 px × 2) are right-sized.
- **Performance on gzip hosting:** HTML 23 KB, CSS 14 KB, JS 6 KB transferred; **Lighthouse mobile 90–91** (a simulated GitHub Pages server: gzip + 10-minute cache). On my plain test server it is 86 because nothing is compressed.

## Fix status (applied on `main`, committed locally, **not pushed**)

| # | Result |
|---|---|
| **1** | **Share preview + icons.** Added Open Graph + Twitter tags (`og:type/site_name/locale/url/title/description/image + size + alt`, `twitter:card=summary_large_image`) and a generated **1200×630 `images/og-image.jpg`** (crest, headline, photo; 120 KB — I checked the render). Added **`apple-touch-icon.png` (180 px)**, `favicon.ico` (32 + 48 px), `favicon-32.png`, `favicon-48.png`, wired with `<link rel="icon">` / `apple-touch-icon`. `canonical` and `School` JSON-LD (real address / phone / founding year from the site) are written but kept **in a launch-checklist comment** so the noindex prototype isn't indexed pointing at the live domain. *Notes:* the tags use absolute URLs on `https://bisjapan.org/` (platforms require absolute URLs) — they'll only resolve once this page is served from that domain; the OG image currently uses the **placeholder stock hero photo** and must be re-generated from the real photo. Still missing for launch: `robots.txt`, `sitemap.xml`, `404.html`, web manifest. |
| **2** | **One voice for money, grades, the booking action.** **Money:** Japanese pages now write **37,000円 / 0〜17,000円 / −37,000円** everywhere (calculator, fee cards, ranges, dropdowns, the 3.7万円/1.7万円 forms are gone, no ¥ in Japanese text); English keeps **¥37,000**; the calculator formats by language. **Grades:** Nursery（年少）・LKG（年中）・UKG（年長）, Grade 1〜5（小1〜小5）, Grade 6〜7（小6〜中1）, in the fee cards, photo tags, form and dropdown (*please confirm the 小6〜中1 mapping with the school*). **Booking:** short **「見学予約」** (header, bottom bar), long **「無料体験・見学を予約」** (hero, menu, footer), form button **「この内容で予約する」**, divider 「またはフォームで予約」, success 「ご予約のリクエストを受け付けました！」, 「別の日程を予約する」 (English equivalents aligned). |
| **3** | **One label per destination, same in header / menu / footer:** 学校の特長 · プログラム · 授業料 · 講師・スタッフ · アクセス · よくある質問; and **スクールバス** replaces 送迎バス everywhere. |
| **4** | Hero `srcset` now has an **840 w** file (40 KB): a 375 px phone at 2× downloads 40 KB instead of 68 KB. First-view image transfer 123 → **94 KB**. |
| **5** | **Tap feedback:** `-webkit-tap-highlight-color: transparent`, `touch-action: manipulation`, and pressed states for stage tabs, language buttons, menu button, photo tiles, ※, text links, FAQ / route / footer rows and menu links. |

**Also tidied while applying #2:** the fee-card grade text now wraps cleanly (grade names on their own lines, the age on a separate line, "無償化で実質 / 0〜17,000円" never splits mid-number), and the one stray Japanese "〜" in the English fee row is translated. Dropdown options show the **amount first** ("−37,000円　幼保無償化") so a narrow phone cuts the label, never the amount.

**Verified:** no overflow or clipped text at 320 / 375 / 1024 / 1440 px (JA) and 320 px (EN); English mode has no Japanese left except the language names and decorative icon glyphs; Lighthouse on gzip hosting **Performance 90–91, Accessibility 100, Best Practices 100**, CLS 0.

**Not done (still open from this round):** #6 no-JS fallback, #7 English suggestion bar, #8 tracking hooks, #9 inner pages in v2, #10 font timing on the real URL.

## Recommended order (original)

1. **Now (S):** #1 share preview + icons, #2 style guide applied (copy + labels), #4 hero 840 w, #5 tap feedback.
2. **Next (M):** #3/#8 consistent labels + tracking hooks, #6 no-JS fallback, #7 language bar.
3. **Then (L):** #9 inner pages in v2 (Tuition first), then the switch-over; #10 confirm font timing on the real URL.
