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

- **Zero-Framework Web Application:** Pure Semantic HTML5, Vanilla CSS custom properties, and Vanilla ES6+ JavaScript for maximum performance, accessibility, and zero-dependency maintenance.
- **Bilingual Engine:** Instant client-side language switching between Japanese and English (`data-ja` / `data-en`) with `localStorage` state persistence.
- **Interactive UI Components:**
  - **Prestige Stats Strip:** Floating metrics card adapted from top British school sites.
  - **Interactive Stage Tabs:** Tabbed navigation between Pre-Primary, Primary, and Secondary stages with smooth transitions and transparent tuition cards.
  - **Government Subsidy Calculator:** Real-time out-of-pocket estimator based on grade level and municipal subsidy eligibility.
  - **School Tour Booking Modal:** Form validation and accessible confirmation dialogs.

---

## 📂 Repository Structure

```text
├── index.html            # Main landing page with hero, stats strip, stage tabs, calculator & booking
├── about.html            # School history, 8 core objectives, leadership message & official crest
├── curriculum.html       # Cambridge syllabus, daily Kokugo, weekly timetable & subject outlines
├── admissions.html       # Eligibility criteria, municipal subsidy (新2号認定) guide & fee tables
├── access.html           # Campus map, public transit directions & 5km bus coverage
├── contact.html          # Contact channels, visiting hours & inquiry form
├── css/
│   └── style.css         # Complete design system tokens, typography, utilities & responsive styles
├── js/
│   └── main.js           # Bilingual switcher, stage tabs, subsidy calculator & modal handlers
├── images/
│   └── crest.png         # Official BIS Japan crest ("Strive Believe Achieve")
├── docs/                 # UX research, competitive audits, and accessibility documentation
│   ├── 00-skill-map.md
│   ├── 01-competitive-research.md
│   ├── 02-heuristic-audit.md
│   ├── 03-gap-analysis.md
│   ├── 04-ia-sitemap.md
│   ├── 05-content-map-ja-en.md
│   ├── 06-copy-drafts.md
│   ├── 07-qa-ux-audit.md
│   ├── 08-lighthouse-performance.md
│   ├── 09-wcag-accessibility-audit.md
│   └── 10-deploy-analytics-plan.md
└── design/               # Design tokens (colors, typography, component specs)
    ├── components/
    └── tokens/
```

---

## 🚀 Running Locally

No build tools or package managers required. Simply start any local HTTP server:

```bash
# Using Python
python3 -m http.server 8089

# Using Node.js (npx)
npx serve .
```

Then open `http://localhost:8089` in your web browser.

---

## 📜 License & Copyright

© British International School Japan. All rights reserved.
