# British International School Japan (BIS Japan) — Official Website

> **Motto:** *STRIVE • BELIEVE • ACHIEVE* (努力・信念・達成)  
> **Location:** Hongo 4786, Ebina / Ayase, Kanagawa, Japan  
> **Accreditation:** Cambridge Assessment International Education (Center ID: JP046)  
> **Established:** 2007 (19 years of educational excellence)

---

## 🌟 Overview

This repository contains the complete responsive, bilingual (Japanese & English) web application for **British International School Japan (BIS Japan)**. 

The website is engineered to solve the primary local awareness challenge: introducing native Japanese and international families in Ebina, Ayase, and central Kanagawa to accessible, world-standard bilingual education combining the **Cambridge International Curriculum** with **daily Ministry-approved Japanese (Kokugo) instruction**.

---

## 🏫 Key Institutional Facts

- **Dual-Literacy Excellence:** Daily Kokugo classes using official MEXT-certified textbooks taught by licensed Japanese teachers, ensuring parity with Japanese municipal elementary schools.
- **Cambridge Core:** English Language Arts, Cambridge Primary & Secondary Mathematics, Science, Computing & ICT, and Social Science.
- **Affordable Local Pricing (April 2026 Structure):**
  - **Pre-Primary (Nursery, LKG, UKG):** Base ¥37,000/mo — eligible for National Childcare Subsidies (*幼児教育・保育の無償化*), reducing out-of-pocket costs to **net ¥0 〜 ¥17,000 / month**.
  - **Primary (Grades 1–5):** **¥35,000 / month** (all-inclusive, approx. 1/6th of Tokyo schools).
  - **Secondary (Grade 6–7):** **¥37,000 / month** (with optional French & Arabic).
  - **Advanced (Pre-IGCSE 〜 A Level):** **¥40,000 / month** for global university preparation.
- **School Transit:** Dedicated 5km-radius school bus route covering Ebina and Ayase.

---

## 💻 Tech Stack & Architecture

- **Static and framework-free:** semantic HTML5, vanilla CSS custom properties and vanilla JavaScript. Light theme, mobile first, Japanese by default with an English switch (`data-en` text swapped on demand, choice remembered in `localStorage`).
- **Built from shared parts:** the header, menu, footer and bottom action bar are written once in `src/v2/partials`; a small dependency-free script (`tools/build-v2.js`) assembles the pages. The generated HTML is committed, so GitHub Pages serves the repository root as-is.
- **Interactive components:** stage tabs, fee calculator (tuition by stage and subsidy type), photo lightbox, tap-to-load map, booking form with inline validation, bottom Call / LINE / Book bar, note sheet and menu drawer.

---

## 📂 Repository Structure

```text
├── index.html            # Home (generated)
├── about.html            # School guide: story, 8 goals, campus, safety (generated)
├── curriculum.html       # Six pillars, stage by stage, a typical day (generated)
├── admissions.html       # Tuition, subsidy guide, calculator, admissions flow (generated)
├── access.html           # Map, train / bus / car, school-bus area (generated)
├── contact.html          # Booking form and contact details (generated)
├── 404.html              # Not-found page (generated)
├── robots.txt, sitemap.xml, site.webmanifest   # generated in launch mode
├── src/v2/               # SOURCES: edit these, then run the build
│   ├── site.json         #   launch switch, domain, phone, e-mail
│   ├── pages/            #   one file per page (meta block + <main>)
│   └── partials/         #   shared header, footer, menu, calculator, booking form ...
├── tools/build-v2.js     # the page builder (no dependencies)
├── css/v2.css, js/v2.js  # design system and behaviour for every page
├── css/style.css, js/main.js   # LEGACY (v1 site): no longer referenced, safe to delete
├── images/               # crest and photos (images/v2 = optimised WebP used by the pages)
├── docs/                 # research, audits and the redesign plan (12-17 cover the v2 work)
└── design/               # design tokens and component specs (v1)
```

---

## 🚀 Running Locally

Any static server works:

```bash
python3 -m http.server 8089     # or: npx serve .
```

Then open `http://localhost:8089`.

### Editing pages

The `.html` files in the repository root are **generated**. Edit `src/v2/pages/*.html` (content) or `src/v2/partials/*.html` (shared parts), then rebuild:

```bash
node tools/build-v2.js          # rebuild every page (Node 18+, no packages to install)
node tools/build-v2.js --check  # fail if a built page is out of date with src/v2
```

| Where | What |
|---|---|
| `src/v2/pages/*.html` | A `<!--meta {json} -->` block (title, description, share-preview text, file names) followed by the page's `<main>` |
| `src/v2/partials/*.html` | Shared chrome (`head`, `header`, `footer`, `drawer`, `action-bar`, ...) and components (`calculator`, `booking-section`, ...) |
| `src/v2/site.json` | `launch` switch, domain, phone and e-mail used across the site |

Links between pages are written as `{{to:tuition}}`-style tokens, so every menu, footer and button stays consistent and keeps the chosen language. Placeholder content is marked `data-ph` and shows a dashed 仮 chip until real content replaces it. Plan, audits and decisions: `docs/12` to `docs/17`.

---

## 📜 License & Copyright

© British International School Japan. All rights reserved.
