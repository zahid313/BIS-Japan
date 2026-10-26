# 16 — v2 inner pages: shared chrome + the Tuition page

**Date:** 2026-10-26 · **Priorities:** mobile first, desktop second · placeholders (photos, people, voices, some answers) are intentional.
This is item **#9** of [docs/15](15-v2-audit-round-4.md): "only the home page has the new design". The Tuition page is first, because *"how much, and can the subsidy bring it down?"* is the question Japanese parents ask before anything else.

---

## 1 · What changed

| | Before | Now |
|---|---|---|
| Pages in the new design | `index-v2.html` only | `index-v2.html` + **`tuition-v2.html`** |
| Header / menu / footer / bottom bar | Hand-written inside the one page | **Shared partials** in `src/v2/partials/`, assembled by `tools/build-v2.js` |
| Menu label **授業料** | Scrolled to the fee summary on the home page | Opens the **Tuition page** (the home keeps a short summary that links to it) |
| Fee calculator | Home only | One shared component, used on both pages |

### The build step (why it exists)

Every inner page repeats the same ~12 KB of header, menu, footer and bottom bar, in two languages. Copy-pasting that into six more files would make "one label per destination" (docs/15 #3) impossible to keep. So:

- `src/v2/pages/*.html` — a page = a small `<!--meta {json}-->` block + its `<main>`.
- `src/v2/partials/*.html` — shared chrome and reusable components (`calculator`).
- `tools/build-v2.js` — no dependencies. Resolves `{{to:tuition}}`-style links (in-page anchor on the page that owns the section, otherwise `page.html#section` + `data-keeplang`, plus `aria-current` for the current page), builds a headline-font subset **per page** from its headings, adds cache-busting hashes, and has a `--check` mode.
- The output is still plain static HTML at the repo root, committed, so GitHub Pages needs no change.

**Proof the refactor changed nothing:** rebuilding the old home page from the new sources gave a file identical to the hand-written one apart from the generated banner, the cache-buster hashes and the headline-font subset. The subset is now computed from each page's real headings instead of a hand-kept list: 5 stale characters dropped, 25 added (all printable ASCII plus the wording changed in round 4). **Each page gets its own subset** (home 351 glyphs, tuition 224), so a page never downloads characters only another page uses.

---

## 2 · The Tuition page, section by section

Order follows the parent's questions: *how much → what would **we** pay → how does the subsidy work → anything else to pay → how/when do we join → what else do I need to know → talk to us.*

| # | Section (id) | What it answers | Mobile | Desktop ≥900 |
|---|---|---|---|---|
| 1 | **Page hero** | "Am I in the right place?" Breadcrumb, `h1`, three headline numbers (35,000〜40,000円 · 実質0〜17,000円※ · 追加徴収なし), two buttons, chips to jump to a section | Stacked; chips scroll sideways | Text left, the three numbers as cards on the right |
| 2 | **授業料一覧** `#fees` | The price of each stage, with age, class size and how the child gets to school | One card per stage (no wide table), tinted lime / sky / sand | 2 × 2 (≥700), 4 across (≥1200) with prices aligned |
| 3 | **シミュレーター** `#calculator` | "What would *we* pay?" Same component as the home page | Full-width card | Heading left, card right, disclaimer under the heading |
| 4 | **無償化と手続き** `#subsidy` | Three routes (無償化 / 多様な支援 / 企業主導型), **how payment works** (pay first, subsidy paid to your account after the receipt is submitted), 4 numbered steps | Cards stack; connected numbered steps | 3 route cards across, steps in a second column |
| 5 | **含まれるもの** `#included` | "Is there anything else to pay?" Two lists: *included in tuition* / *separate or to bring* | Two stacked panels | Side by side |
| 6 | **入学の流れ** `#apply` | 3 steps from trial lesson to first day, and the three intake windows (April / September / mid-year) | Steps, then three tinted cards | Steps left, windows right |
| 7 | **よくある質問** `#faq` | Six money questions in the same accordion as the home page | — | — |
| 8 | **ご相談** `#consult` | Last call to action: book / LINE / phone. The bottom bar steps aside here (it would only repeat these three buttons) | Card | Text left, buttons right |

Design notes: no new colours or fonts; the page reuses the home page's tokens, tints, buttons, accordion and calculator. New components (all in the "INNER PAGES" block at the end of `css/v2.css`): page hero + `facts`, `jump` chips, `stage-card`, `route-card`, numbered `steps`, `info-panel` / `ticks` / `extras`, `info-card`, `cta-card`.

---

## 3 · Where the content comes from — and what needs the school's answer

Every number and rule on the page was taken from the **v1 `admissions.html`** (the school's current page). Nothing was invented, but moving it into a cleaner layout surfaced several things to confirm.

### Found while building (please check)

| # | Finding | What I did |
|---|---|---|
| 1 | **Corporate plan price.** v1 lists the 企業主導・法人支援 row at **51,000円 (5 km school bus included) → 実質0円**. The home page calculator had shown 37,000円 − 37,000円. The net (0円) was right, the figures were not. | Both pages now follow v1: the calculator shows 51,000円 − 51,000円 = 0円, with a note that the bus is included. **Confirm 51,000円.** |
| 2 | **"多様な支援"** (v1) vs **"多様な関わり事業"** (my earlier wording on the home page). v1 only says "実質 17,000円". | Unified to v1's 「多様な支援」 on both pages. The route card carries a placeholder chip "対象条件 要確認": **who qualifies, and for how much?** |
| 3 | **When is the subsidy paid?** v1 step 4 says parents submit the school's receipt and the subsidy is paid to their account — i.e. *pay first, reimbursed later*. That matters for a household's cash flow, so the page now says it plainly (note + FAQ). | **Confirm** this is how BIS handles it (rather than deducting it from the monthly fee). |
| 4 | **Grade 6〜7 = 小6〜中1** (ages 11–12). Carried over from docs/15; v1 never states the Japanese grades. | **Confirm.** |
| 5 | **高等部 vs 高等課程.** v1 says 高等課程 for Pre-IGCSE〜A Level; the v2 home uses 高等部. | Kept 高等部 for one voice with the home page. Say if the school prefers v1's term. |
| 6 | Claims carried over from v1 that deserve a sign-off before launch: 「**届出済み認可外保育施設**」「**月額最大37,000円**」「**教材費や施設維持費などの不透明な追加徴収は行いません**」. | Used as written. |

### Placeholders added (marked on screen with the dashed "仮" chip; `?ph=off` hides them)

Things parents will ask that v1 does not answer: **入学金 / initial costs**, **school-trip fee**, **school-bus fares**, **sibling discount**, **subsidy eligibility for 多様な支援**. They sit where the answer will go, so replacing them is a text edit, not a redesign.

### Added for safety (not in v1)

A line that amounts and requirements follow the municipality's rules and may change, and a calculator disclaimer ("an estimate"). Delete if the school prefers.

---

## 4 · Changes to shared files

- **`js/v2.js`** — every block already did nothing when its elements were absent, except the bottom bar and the lightbox; both are now guarded. The bottom bar appears after `#hero-cta` (home) or `[data-bar-start]` (inner pages) and hides over `#booking`, any `[data-bar-hide]` panel and the footer. **Bug fixed:** `?lang=` was appended *after* a `#section` (`page.html#faq?lang=en`), so the language was lost; it now goes before the hash. Calculator: added **高等部 (40,000円)** and the corporate plan (see §3 #1).
- **`css/v2.css`** — current-page styling in the menus, plus the "INNER PAGES" block (mobile-first; media queries at 700 / 900 / 1200 / 1600, forced-colors and short-landscape variants).
- **Home page** — menu entries and the ※ sheet follow the new routes; the fee summary now ends with a link to the full Tuition page; calculator moved into the shared partial.

---

## 5 · Checks run

| Check | Result |
|---|---|
| HTML structure of both built pages (nesting, unique ids, in-page anchors, aria references) | ✅ balanced, 64 / 105 ids unique, all references resolve |
| Horizontal overflow, text under 12 px, unnamed controls — **JA** at 320 · 375 · 414 · 768 · 1024 · 1440 · 1920 px; **EN** at 320 · 360 · 768 · 1440 px; home at 320 JA + EN | ✅ none |
| English mode | ✅ no Japanese left on the page except the language names |
| Calculator: all stages × all subsidy types, JA and EN | ✅ 37,000 / 35,000 / 40,000円; 無償化 → 0; 多様な支援 → 17,000; 企業主導型 → 51,000 − 51,000 = 0 |
| Every character of every serif heading is inside that page's font subset (JA + EN, both pages) | ✅ 0 missing |
| ※ note sheet, menu drawer, language switch (links keep `?lang=` before `#section`), `aria-current` | ✅ |
| Bottom bar: shows after the hero, hides over the closing panel, footer and while a field is focused | ✅ |
| Lighthouse mobile on gzip hosting (as GitHub Pages serves) | **Tuition: Performance 92 · Accessibility 100 · Best Practices 100**, whole page 89 KB (no photos); **home: 90 · 100 · 100**; CLS 0 on both. (An earlier run showed SEO 63 only because the prototype is `noindex` on purpose.) |

Not done / known: CSS and JS are not minified (Lighthouse flags it, ~4 KB gzip); the no-JS fallback, English-suggestion bar and tracking hooks from docs/15 (#6–#8) still apply to every page.

---

## 6 · Next

1. **Access & school bus** — most requested after tuition; the bus radius and fares belong there (and fill in the placeholders above).
2. **Contact / booking** — the home page's booking panel as its own page.
3. **Curriculum**, then **About**.
4. **Switch-over:** `index-v2.html` → `index.html`, rename pages, remove `noindex`, enable canonical + `School` JSON-LD, add `robots.txt`, `sitemap.xml`, `404.html`, manifest.
