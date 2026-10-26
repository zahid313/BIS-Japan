# 17 — v2 complete: Access, Contact, Curriculum, About, and the switch-over

**Date:** 2026-10-26 · **Priorities:** mobile first, desktop second · follows [docs/16](16-v2-inner-pages-tuition.md) (shared build + Tuition).

All six pages of the site are now in the v2 design, and the build is switched to **launch mode**: the pages are written under the **same file names the old site used**, so every existing link and search result keeps working.

> **Not pushed.** Read §3 before this goes live. Several things on these pages are still placeholders, and the booking form does not send anything yet.

---

## 1 · What was built

| Page (file) | Answers | Main sections | Content source |
|---|---|---|---|
| **Access & school bus** (`access.html`) | "How do we get there? Does the bus come to us?" | Hero facts · tap-to-load map + address card · train & local bus in 3 steps · school bus (area chips, safety, cost, routes by area) · by car · FAQ · closing call to action | v1 `access.html`, v1 `about.html` (bus safety) |
| **Contact** (`contact.html`) | "How do I book or ask?" | Short hero (the form is one tap away) · the booking section shared with the home page · address / phone / fax / e-mail / hours · privacy · links to the other pages | v1 `contact.html` |
| **Curriculum** (`curriculum.html`) | "What will my child learn?" | Six pillars (English & phonics, Kokugo, Cambridge maths & science, computing, French & Arabic, Japanese culture) · stage tabs and panels shared with the home page · a typical primary day · FAQ | v1 `curriculum.html` + home panels |
| **About** (`about.html`) | "Who are you and can I trust you with my child?" | Story & philosophy · timeline (2007, 2012, today) · STRIVE / BELIEVE / ACHIEVE · head's message (placeholder) · 8 educational goals · campus · safety & care | v1 `about.html` |
| **Tuition** (`admissions.html`) | see docs/16 | | v1 `admissions.html` |
| **Not found** (`404.html`) | A friendly dead end | Brand, message, two buttons | new |

Shared parts were extracted so a fix lands everywhere: the **booking section** (home + contact), **stage tabs and panels** (home + curriculum), **closing call-to-action buttons** (four pages), **calculator** (home + tuition).

### Navigation, one label per destination

| Header / menu / footer label | Goes to |
|---|---|
| 学校案内 · About | `about.html` |
| カリキュラム · Curriculum | `curriculum.html` |
| 授業料 · Tuition | `admissions.html` |
| アクセス · Access | `access.html` |
| よくある質問 · FAQ | home `#faq` |
| 見学予約 (button) / 無料体験・見学を予約 | the booking form: on the home and contact pages it is on the page; elsewhere it opens `contact.html#booking` |
| お問い合わせ · Contact | `contact.html` |
| 講師・スタッフ · Teachers & staff | home `#teachers` |

The old "学校の特長" and "プログラム" labels were retired: they named sections of the home page, and the destinations are now real pages. The home page keeps short summaries of each page and ends every summary with a link to the full page.

---

## 2 · The switch-over

`src/v2/site.json` has one switch, `"launch"`. It is now **`true`**.

| | Prototype mode (`false`) | Launch mode (`true`, now) |
|---|---|---|
| File names | `index-v2.html`, `tuition-v2.html`, … | `index.html`, `about.html`, `curriculum.html`, `admissions.html` (the Tuition page), `access.html`, `contact.html`, `404.html` |
| Search engines | `noindex, nofollow` | indexable |
| `<link rel="canonical">`, web manifest | commented out | on, absolute URLs on `https://bisjapan.org` |
| `School` structured data (JSON-LD) | commented out | on the home page: name, address, phone, founding year |
| `robots.txt`, `sitemap.xml`, `site.webmanifest` | not written | generated (6 pages, home first; the 404 page is excluded) |

The six `*-v2.html` prototypes were deleted; the old v1 pages are still in git history (`git show c974e3a:about.html`). `css/style.css` and `js/main.js` (v1) are no longer referenced by anything and can be deleted whenever you like. Language state is shared with v1 (`?lang=` and the `bisjapan_lang` storage key), so a visitor's saved choice survives the switch.

**To go back to the prototype names** (for example to review a big change privately), set `"launch": false` and rebuild.

---

## 3 · Before this goes live — launch checklist

Nothing below was invented by the build; these are the places where the site still needs the school. They are shown on screen with the dashed **仮** chip (`?ph=off` hides the chips for a clean preview; they are **on by default** so that a premature push is obvious, not hidden).

### Blockers (the site misleads visitors or loses enquiries if these ship)

1. **The booking form sends nothing.** On the home and contact pages "この内容で予約する" validates and then shows "received" without contacting anyone (`data-ph="フォーム送信先 未設定"`). Wire it to a real endpoint (a form service, a Google Form, or the school's mail) or remove the form until it is.
2. **The LINE button opens `https://line.me`**, not the school's official account. Four or five links on every page (hero, bottom bar, menu, footer, closing panel) need the real friend-add URL; it is one search-and-replace of `https://line.me`.
3. **Fictional people and quotes.** The home page shows three teacher cards (e.g. "Mr. David Sterling") and three parent voices that are placeholders, not real staff or families. They must be replaced or removed first. The About page's "message from the head" is a placeholder too (v1 had none).
4. **Stock photos.** The hero, programme and gallery images, the campus photos on About (the library panorama looks like the real school, the others are stock) and the share-preview image `images/og-image.jpg` should be replaced with real photography.

### Please confirm (content that came from v1, or that v1 contradicts)

| # | Item |
|---|---|
| 1 | **E-mail address.** v1's contact page says `bisjpn@gmail.com` ("official mailbox, 24 hours"); v1's home footer says `info@bisjapan.org`. I used **`bisjpn@gmail.com` everywhere** (one value in `site.json`). Which one is monitored? |
| 2 | **Facts from v1 used as written:** "world-recognised in 160 countries", "届出済み認可外保育施設", "月額最大37,000円", "教材費や施設維持費などの不透明な追加徴収は行いません", 4 evacuation drills a year, auto-lock + cameras, drive recorders in every bus, bus area (Ebina, Ayase, southern Yamato, eastern Atsugi, northern Fujisawa). |
| 3 | **The sample timetable** on the Curriculum page. v1 itself marked it as a placeholder ("adjust to the real timetable"). |
| 4 | Items still open from docs/16: corporate-plan price (51,000円), "多様な支援" eligibility, 小6〜中1 mapping, 高等部 vs 高等課程. |

### Still empty (placeholders where the answer will go)

Entrance fee, school-trip fee, school-bus fares, sibling discount, bus routes/stops/timetables by area, Kanachu route number and stop name, FAQ answers marked 仮. Counts per page: home 11 · tuition 4 · access 5 · contact 1 · curriculum 3 · about 4.

### Small corrections made on the way

- The home stage tab said Primary is **6〜11歳**; v1 and the Tuition page say **6〜10歳**. Fixed.
- The home FAQ "What about safety and disaster preparedness?" was a placeholder; it now carries v1's real answer (drills, supplies, auto-lock, cameras, name tags).

---

## 4 · Checks run on the final (launch) pages

| Check | Result |
|---|---|
| Structure of all 7 pages: tags nest, ids unique, in-page anchors and `aria-*` references resolve | ✅ |
| **221 internal links** across the pages resolve to a built page and a real `#section` | ✅ |
| Layout matrix, **7 pages × JA/EN × 320 · 375 · 768 · 1024 · 1440 · 1920 px** (70 combinations): no horizontal overflow, no text under 12 px, every control named, tap targets ≥ 44 px on touch widths | ✅ one fix on the way: the English stage tabs were 13 px too wide at 320 px (icons now hide, as on the home page) |
| Every serif heading character is inside that page's headline-font subset (JA and EN) | ✅ 0 missing; subsets are 133 – 351 glyphs per page |
| English mode: no Japanese left except the language names and decorative glyphs | ✅ |
| Form validation and success state, stage tabs and arrow keys, `aria-current` per page, `?lang=` kept before `#section` | ✅ |
| JSON-LD parses; canonical/manifest present; no `noindex` except on the 404 page | ✅ |

**Lighthouse, mobile, on gzip hosting (as GitHub Pages serves):**

| Page | Performance | Accessibility | Best practices | SEO | Transfer |
|---|---|---|---|---|---|
| Home | 90 | 100 | 100 | 100 | 233 KB |
| Tuition | 92 | 100 | 100 | 100 | 91 KB |
| Access | 93 | 100 | 100 | 100 | 85 KB |
| Contact | 100 | 100 | 100 | 100 | 83 KB |
| Curriculum | 91 | 100 | 100 | 100 | 148 KB |
| About | 100 | 100 | 100 | 100 | 130 KB |

CLS is 0 on every page. The pages that score 90–93 are limited by the headline web font arriving before first paint (docs/15 #10); confirm on the real URL after deploy.

---

## 5 · What is next

1. **Content swap** (§3): real photos, staff, voices, bus routes and fares, entrance fee, head's message.
2. **Wire the form and the LINE link**, then do a real end-to-end test on a phone.
3. After deploy: PageSpeed Insights on the real URL (#10), a LINE share-card test of the home page, Search Console + the sitemap.
4. Still open from docs/15: no-JS fallback (#6), English suggestion bar (#7), tracking hooks (#8).
5. Optional tidy-ups: delete `css/style.css`, `js/main.js` and unused v1 images; minify `css/v2.css` / `js/v2.js` (~4 KB gzip); when the placeholders are gone, remove `data-ph="on"` from `src/v2/partials/head.html` so the chips stop showing.
