# 14 — UI/UX Audit, Round 3 (v2 home, after the round-2 fixes)

**Date:** 2026-10-26 · **Subject:** `index-v2.html` on `main` (commit `93d7935`) · **Priorities:** mobile first, desktop second · placeholders (photos, people, voices, FAQ, LINE/form wiring) are intentional and not judged.

**New angles this round** (rounds 1–2 covered overflow, tap targets, font sizes, focus rings, headings, links and Lighthouse): a full **text-contrast sweep** (every text node against its real background, including photo labels), **leftover-language scan** in English mode, **user text-size scaling (100–200%)**, **landscape and short phones**, **form flow end-to-end**, **layout shift across a full scroll**, forced-colors (high-contrast) readiness, screen-reader details.

---

## Verdict

The page holds up well against the usual checks: **zero text-contrast failures**, no untranslated Japanese in English mode, **CLS 0**, a working form. This round found **one real break that is already fixed** (the header at larger text sizes) and **three issues worth fixing next**, all about *how the page behaves when the phone isn't a plain portrait 100%-text iPhone*: landscape, small screens, and high-contrast mode.

---

## Fixed during this round

### The header broke at only ~113% text size
Phones with a larger system font (Android "font size", iOS Larger Text, browser text zoom) enlarge `rem` text. Measured on a 375 px phone:

| Text size | Before | After |
|---|---|---|
| 113 % | wordmark wrapped to **2 lines (83 px tall in a 64 px header)**, overflowing upward | one row, 64 px |
| 125 % | same break | one row, 64 px |
| 150 % | language buttons stacked their characters vertically ("日 / 本 / 語"), header overflowed | header wraps cleanly onto two rows (100 px) |
| 200 % | same, and the skip link slid into view from 175 % | two rows (112 px), no overflow |

**Changes:** wordmark and language buttons are `nowrap`; the wordmark now behaves like a logo (`min(1.25rem, 5.4vw)`, doesn't grow with text size); the header is `min-height` instead of a fixed `height` and wraps to a second row when text is very large; a `--header-live` variable (kept current by a `ResizeObserver`) moves the sticky stage tabs and anchor offsets with the real header height; the skip link now hides with `translateY(-250%)` so it stays off-screen at any size.
*Could not verify here:* the live variable updating — the test pane is hidden, so `ResizeObserver` doesn't fire; please check on a phone with a large font that the stage tabs stay directly under the header.

---

## P1 — fix next

| # | Finding | Evidence | Fix |
|---|---|---|---|
| **1** | **Landscape phone: the first screen is almost all photo, and pinned bars take over the screen.** | At 812 × 375: header **64** + hero photo **300** = 364 of 375 px — the headline and buttons are entirely below the fold. In Programmes, header 64 + tabs 73 = **137 px = 37%** of the height (**54%** if the bottom bar were also showing), leaving 238 px of content. | Add a short-viewport rule (`max-height: 520px`): header 52 px with a 40 px crest, **non-sticky** stage tabs, and a **two-column hero** (text left, photo right, `height: min(300px, 70svh)`). |
| **2** | **Hero height isn't tied to the screen height, and relies on `svh`.** On a 375 × 667 phone (iPhone SE size) the second hero button ends at **697 px** — 30 px below the fold. On iOS < 15.4, `svh` isn't understood, so the whole `height:` declaration is dropped and the photo falls back to its natural height. | Measured: CTA bottom 633, LINE button bottom 697, viewport 667. | `height: 300px; height: clamp(200px, calc(100svh - 430px), 380px);` (fallback first). At 667 the photo becomes ~237 px and both buttons fit; at 812 it stays at the 380 px cap. |
| **3** | **No high-contrast (Windows forced-colors) styling.** Selected tabs, the selected language button, the dots and the lime buttons are distinguished only by background colour; `<a>` buttons have no border. In forced-colors mode those backgrounds are replaced, so the selected state and button shapes vanish. | Static review of `v2.css` (no `forced-colors` rules). *Not testable in this browser pane.* | `@media (forced-colors: active)`: `border: 1px solid ButtonText` on `.btn`, `.ab-btn`, `.alt-card`, `.ast`; selected tab/language/dot → `background: Highlight; color: HighlightText` (or a 2 px `Highlight` outline). |

## P2 — polish

| # | Finding | Fix |
|---|---|---|
| 4 | **Form success message isn't announced.** Focus moves to the success box, but it has no role or name. | `role="status"` and `aria-labelledby` pointing at its heading. |
| 5 | **Skip-link target:** `<main id="main">` has no `tabindex="-1"`, so older Safari activates the link without moving focus. | Add `tabindex="-1"`. |
| 6 | **English inside the Japanese page has no `lang`:** "Mr. David Sterling", "Ms. Aisha Rahman", "Pre-IGCSE", the "Aa / 123 / Fr / IG / Ar" icon tiles. Screen readers read them with a Japanese voice. | Wrap with `lang="en"` (and `aria-hidden` on the icon tiles, which are decorative). |
| 7 | **Links that open a new tab** (LINE ×5, Google Maps) don't say so. | Add visually-hidden text "(新しいタブで開きます)" / "(opens in a new tab)". |
| 8 | **Header at very large text still doubles in height** (100–112 px at 138–200%). Acceptable and accessible, but tab-pinning then costs ~170 px. | Optional: below 400 px width and above 130 % text, drop the wordmark text and keep only the crest to stay on one row. |

## Journey review (judgment calls, worth A/B testing later)

- **The booking form sits ~87% of the way down** (≈ 10 screens). The bottom bar covers the "book" action, but the moment of highest intent is right after the fees. A slim *見学予約・LINEで相談* band after the fee list would give a second in-page conversion point.
- **"Life at BIS" photos come after fees, people and voices.** For Japanese parents the feel of the school is often the deciding factor; try moving the photo grid up, after the three reasons, and let the fees follow.
- **No announcement strip** for open days (Malvern and Branksome both lead with one).
- **Trust band numbers** are placeholders; once real they should include one number a parent can verify (class size or founding year).

---

## Verified OK this round

- **Text contrast: 0 failures** across every visible text node (page, menu, ※ sheet). The only sub-threshold item is the decorative “ quote mark (1.28:1, `aria-hidden`).
- **Photo labels** (white text on the gallery photos): average contrast **7.1–14.4 : 1** per photo; the brightest 5% of pixels in the worst photo ("Culture stage") dip to **4.3 : 1**, and the text has a shadow — acceptable.
- **English mode:** no untranslated Japanese anywhere (page, menu, sheet, lightbox titles, map frame title, dropdown options). Only language names ("日本語") and decorative icon glyphs remain, by design.
- **Layout shift:** **CLS 0** over a complete top-to-bottom scroll (page height ≈ 9,600 px).
- **Text size 100 → 200%:** no horizontal overflow and no clipped text at any step (header behaviour above).
- **Form flow:** empty submit → three errors, focus on the first field; bad phone ("abc") rejected; errors clear as fields are fixed; valid submit → success and focus on it; "別のお申込み" restores and clears the form. `autocomplete="name"` and `autocomplete="tel"`, `inputmode="tel"` are set.
- **Reflow at 320 px** in English and Japanese, and 768 / 1024 / 1440 / 1920 px (previous rounds) remain clean.

## Fix status (applied on branch `fix/v2-audit-round-3`; not merged)

| # | Result |
|---|---|
| 1 | **Landscape / short screens:** a `max-height: 520px` rule gives a 52 px header (40 px crest), non-sticky stage tabs, a two-column hero (text left, photo right) and a slimmer bottom bar. Verified at 812×375, 667×375 and 932×430: the headline starts at y≈67 and **both hero buttons are above the fold** (812×375: buttons end at 301 / 359 px); no overflow. |
| 2 | **Hero height:** `height: 300px; height: clamp(200px, calc(100svh - 445px), 380px)` — the plain line is the fallback for iOS < 15.4. Both buttons now end above the fold at **375×667 (639 px)**, **360×640 in English (638 px)**; at 375×812 the photo is 367 px and the chips peek in. |
| 3 | **Forced-colors:** `@media (forced-colors: active)` adds borders to buttons/cards/fields and gives the selected tab / language button / dot a `Highlight` fill. *Not testable in this browser pane — please check once in Windows high-contrast mode.* |
| 4 | Form success box is `role="status"` with `aria-labelledby` its heading. |
| 5 | `<main id="main" tabindex="-1">` (no focus ring drawn on it). |
| 6 | `lang="en"` on the English names, "Cambridge", "Nursery / LKG / UKG", "Lower Secondary", "Pre-IGCSE / IGCSE", "A-Level". The "Aa / 123 / Fr / IG / Ar" icon tiles were already `aria-hidden`. |
| 7 | All 6 new-tab links (LINE ×5, Maps) carry a visually hidden "(新しいタブで開きます)" / "(opens in a new tab)", translated with the page. The footer LINE link was restructured so the hint survives the English swap. |
| 8 | **Compact header:** if the controls wrap below the brand (large text), the wordmark text is dropped and the crest stays — verified one row of 64 px from 100% to 175% text, 65 px at 200%, no overflow, `--header-live` follows. The measurement re-runs on resize, after the web font arrives and after a language change (a first version measured too early and hid the wordmark wrongly at 320 px and 1024 px; fixed by re-measuring, tighter nav links at 900–1199 px, and a little extra room under 360 px). |

**Measured after the fixes:** no horizontal overflow at 320, 390, 768, 1024, 1920 px (JA) and 320/375 (EN); no text under 12 px; Lighthouse mobile **Performance 86, Accessibility 100, Best Practices 100** (two runs); CLS 0. Cache-busters are at `?v=10`.

## Recommended order (original)

1. **Now (S):** #2 hero height + `svh` fallback, #4 `role="status"`, #5 `tabindex="-1"`.
2. **Next (M):** #1 landscape/short-screen layout, #3 forced-colors, #6 `lang` attributes, #7 new-tab hints.
3. **Then:** the booking band after fees and the photo-grid reorder (test), announcement strip.
