# 13 — UI/UX Audit, Round 2 (v2 home prototype)

**Date:** 2026-10-26 · **Subject:** `index-v2.html` + `css/v2.css` + `js/v2.js` (branch `fix/v2-home-links`) · **Priorities:** mobile first, desktop second · **Placeholders** (photos, people, voices, FAQ, LINE/form wiring) are intentional and not judged here.

**Method:** loaded at 320 / 360 / 375 / 390 / 430 / 768 / 1024 / 1440 / 1920 px in Japanese, and at 320 / 375 in English; scripted DOM checks (overflow, clipping, tap targets, font sizes, sticky-chrome heights, control font sizes, scroll containers); real Tab-key focus test; heading/landmark outline; Lighthouse mobile; gzip/brotli sizes.

> Correction: my first scripted focus-ring check reported every element as ringless. That test was invalid (Chromium ignores the `focusVisible` option). I re-tested with real Tab presses and the ring is fine — see "Verified OK".

---

## Verdict

The prototype is structurally sound and clean on every viewport I tried. Round 1's big problems (text-only first screen, 26-screen scroll, dark blocks, sideways tables, mid-word headline breaks) are gone. What's left is **mobile ergonomics and robustness**, not layout. One item is a real functional risk on iPhones (form zoom) and one can undo the "no dark theme" decision on some Android browsers.

---

## P1 — fix before showing it to anyone else

| # | Finding | Evidence | Fix |
|---|---|---|---|
| **1** | **Sticky chrome eats about a quarter of the screen in the Programmes section.** Header + the sticky stage control + the bottom action bar are all pinned at once. | Measured: header **56 px** + stage control **100 px** + action bar **65 px** = **221 px of 812 (27%)**; on notched iPhones the bar adds up to 34 px of home-indicator inset → **≈255 px (31%)**, leaving ~557 px for content. | Make the stage control a single row (icon beside label, drop the second "3〜5歳" line) → ~56 px; and hide the action bar while the control is stuck, or auto-hide the header on scroll-down. Target ≤ 140 px of pinned chrome. |
| **2** | **iOS Safari will zoom the page when the fee-calculator selects or the child-age select are focused.** | 3 controls render at **15 px** (`#calc-age`, `#calc-sub`, `#f-age`). iOS auto-zooms any field under 16 px and doesn't zoom back. | Set all form controls to 16 px (shorten the option labels instead; the ellipsis is fine, the open list shows full text). |
| **3** | **Swipe rows can't be scrolled by keyboard/switch users in Safari and Firefox.** | 3 `.snap` rows + the hero chips row are scroll containers with `aria-label` but no `tabindex`/`role` (Chrome ≥ 130 focuses them automatically; others don't). | Add `tabindex="0"` and `role="region"` to each scroller. |
| **4** | **No `color-scheme: light`.** Samsung Internet and Chrome-Android "force dark" can invert a page that doesn't declare itself light — i.e. produce the dark look you ruled out. | `meta[name=color-scheme]` absent; no `color-scheme` in CSS. | `<meta name="color-scheme" content="light">` and `:root { color-scheme: light; }`. |
| **5** | **The ※ appears in four places with its explanation only in the fees section.** | ※ on the hero chip, the trust card, reason #3 and the fee row; the footnote is ~2,800 px further down. | Add a short tap-to-reveal note next to the first ※ (hero) or a sticky-free inline "※要件あり" with a link to `#admissions`. Applies once real subsidy wording is confirmed. |

## P2 — polish (mobile)

| # | Finding | Fix |
|---|---|---|
| 6 | The active language button is a **dark navy pill** — the only dark element in the header. | Use the same lime fill + navy text as the stage tabs (7.9:1). Keeps the "no dark surfaces" rule. |
| 7 | **Booking order:** the form comes first and LINE (the channel Japanese parents prefer) is below it, after the fold. | On mobile, put the LINE card above the form, or make a 3-way switch *LINE / フォーム / 電話*. |
| 8 | **Feature tiles wrap awkwardly** at 150 px wide ("フォニックス / ＆英会話", "ひらがな・ / 絵本"). | Switch the 6 tiles to a single-column list with the icon on the left, or shorten labels. |
| 9 | **English body font:** the stack is CJK-first, so English text takes its Latin letters from Hiragino / Yu Gothic. | `html:lang(en) body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }`. Check on a real iPhone. |
| 10 | **Reveal-on-scroll** hides content until an observer fires; on a slow or backgrounded page sections can sit half-faded (seen in the test pane). | Add a timeout fallback (show everything after ~1.5 s) and disable the effect for print. |
| 11 | **4 `backdrop-filter` blur layers** (header, stage control, action bar, menu/photo scrim; 7 declarations counting `-webkit-` copies). Costly on low-end Android, and 3 of them can be pinned at once. | Keep the blur on the header only; use solid `rgba` for the stage control and action bar. |
| 12 | **`Placeholders: ON` toggle is visible to every visitor** in the footer. | Prototype only — gate behind `?ph=` before launch (note for the checklist). |

## P3 — tablet / desktop (second priority)

| # | Finding | Evidence | Fix |
|---|---|---|---|
| 13 | **Hero buttons wrap to two lines at 1024 px** ("無料体験・見学 / を予約", "LINEで気軽に相 / 談"). | Screenshot at 1024. | Stack the two CTAs below ~1200 px, or give the hero text column more width. |
| 14 | **The 100 px sticky stage control also pins on desktop** (68 + 100 = 168 px of a 768 px screen) although the panel is short. | Measured at 1024/1440/1920. | Make it non-sticky at ≥ 900 px. |
| 15 | **On 1920 px the layout stops at 1200 px** with wide empty margins; type feels small. | Screenshot + `container: 1200`. | Raise the container to ~1280 and add a ≥ 1600 px step (larger H1, taller hero). |
| 16 | **768 px (iPad portrait)** shows the hamburger (desktop nav starts at 900). Fine, but the hero photo is 753 × 380 and feels cropped. | Screenshot. | Optional: taller hero (≈ 46svh) at 700–899 px. |

## Ideas that raise conversion (not defects)

- **Announcement strip** under the header for open days / trial dates (Malvern and Branksome both lead with one).
- **"入学までの流れ" 3-step strip** (見学 → 体験 → お申込み) just before the booking form — lowers first-contact anxiety.
- **Accreditation row** (Cambridge logo + centre number JP046, once confirmed) next to the trust cards.
- **A short "A day at BIS" video** instead of the static hero (≤ 15 s, muted, poster image).

## Verified OK — keep as is

- **No horizontal overflow** at 320, 360, 375, 390, 430, 768, 1024, 1440, 1920 in Japanese, and at 320 / 375 in English. No clipped text.
- **No text under 12 px.** Only tap targets under 44 px are the two language buttons (32 px visual, 44 px hit area via `::after`) and the dev-only placeholder toggle.
- **Page length:** 15.3 screens at 320 × 640, 12.9 at 360, **11.3 at 390**, 10.2 at 430 (≈ 9,500 px).
- **Keyboard:** real Tab presses show a 3 px navy `:focus-visible` ring on the skip link, brand, language buttons, menu, and hero CTA; tabs use roving `tabindex`; the drawer is a native `<dialog>` (focus moves in, Esc closes, scroll locked).
- **Semantics:** one `h1`, headings in order `h1 → h2 → h3`; landmarks `header / nav ×3 (labelled) / main / footer`; calculator result is `aria-live`; dialogs labelled.
- **Links:** all 40 links verified in v2 (previous round).
- **Performance (Lighthouse mobile, local uncompressed):** Performance 87, Accessibility 100, Best Practices 100, SEO 63 (only because the prototype is `noindex`). Transfer sizes compressed: HTML **21.6 KB gzip** (17.2 KB brotli), CSS **8.5 KB**, JS **4.5 KB**. English strings are 10.4 KB of the 78 KB HTML.

## Browser-support notes (to check on a real iPhone / Android)

| Feature | Needs | If unsupported |
|---|---|---|
| `<dialog>` menu & lightbox | iOS 15.4+ | Menu and photo viewer would not open — acceptable for current iOS, add a fallback only if older devices matter |
| Exclusive FAQ (`details[name]`) | Safari 17.2+ | Several answers can be open at once (harmless) |
| `text-wrap: balance`, `@starting-style` | Safari 17.5+ | Slightly uneven headline wraps; drawer opens without the slide |
| `word-break: auto-phrase` | Chromium only | Headline phrases are kept whole by `.nb` spans instead |
| `100svh`, `env(safe-area-inset-*)` | iOS 15.4+ / `viewport-fit=cover` (set) | — |

## Fix status (applied after this audit — not committed)

All 16 numbered items are fixed in `index-v2.html`, `css/v2.css`, `js/v2.js`; re-tested at 320–1920 px (JA, plus EN at 320/360/375).

| # | Result |
|---|---|
| 1 | Stage tabs are now one row (icon beside a two-line label): **73 px** instead of 100. The bottom bar hides while the tabs are pinned. Pinned chrome in Programmes is **header 64 + tabs 73 = 137 px** (was 221–255 px). |
| 2 | All form controls are **16 px** (option labels shortened: "幼保無償化（−3.7万円）" etc.). |
| 3 | The 3 swipe rows and the chips row have `tabindex="0"` and an inside-the-box focus ring. *Deviation:* I did **not** add `role="region"`, because it would replace the list semantics of those `<ul>`s; the `aria-label` stays. |
| 4 | `<meta name="color-scheme" content="light">` + `color-scheme: light` in CSS (computed value verified). |
| 5 | Every ※ / * is now a small tap target (20 px mark, 44 px hit area) that opens a bottom sheet with the explanation and a link to the fees; English shows `*`. |
| 6 | Language pill: lime fill + navy text (same as the stage tabs). |
| 7 | LINE card now sits **above** the booking form ("またはフォームでお申込み" divider); phone card stays below; desktop keeps the 2-column layout. |
| 8 | Programme items are a single tidy list on phones (61 px rows, no wrapping); tiles return from 700 px. |
| 9 | English uses the system UI font stack; Japanese keeps the Japanese-first stack. |
| 10 | Reveal-on-scroll has a 1.2 s safety net and is disabled for print. |
| 11 | Blur removed everywhere except the header (1 layer instead of 4). |
| 12 | The "Placeholders" footer toggle is hidden unless the page is opened with `?ph=on` / `?ph=off`. (Default view still shows the 仮 chips; set `<html data-ph="off">` at launch.) |
| 13 | Hero buttons stack from 900–1199 px and sit side by side from 1200 px; no wrapping at 1024. |
| 14 | Stage tabs are no longer sticky from 900 px up. |
| 15 | One shared content width (`--wrap`): 1200 px, and **1360 px at ≥ 1600 px** with larger type (H1 60 px, hero photo 620 px) — verified at 1920. |
| 16 | 700–899 px: hero photo is taller (460 px at 768 × 1024). |

**Also changed (your request):** the header logo was only 38 px wide, too small to read. It is now **52 px on phones (44 px under 360 px), 60 px on desktop, 64 px in the footer**; header height went from 56 to 64 px (phones) and 68 to 76 px (desktop). No overflow at 320 px in English or Japanese.

**Measured after the fixes:** no horizontal overflow at any width tested, no text under 12 px, all form fields ≥ 16 px, Accessibility 100 / Best Practices 100. Lighthouse mobile Performance came out at **84** (two runs; it was 87 before these changes — the cause isn't confirmed and may be run-to-run variance on the local server). Assets now carry `?v=4` so phones don't show stale CSS.

## Recommended order (original)

1. **Today (S):** #2 control size, #4 color-scheme, #3 scroller semantics, #6 language pill, #9 English font.
2. **Next (M):** #1 pinned-chrome diet, #7 booking order, #8 feature tiles, #5 ※ note, #13–#15 desktop fixes.
3. **Then:** announcement strip, 3-step flow, accreditation row; real photography.
