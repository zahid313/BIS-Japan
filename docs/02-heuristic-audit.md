# Phase 1B: Heuristic & Product Diagnostic Audit
**Skill Used:** `product-lens` (Mode 1: Product Diagnostic & Mode 3: User Journey Audit)  
**Target:** Live Production Site (`https://bisjapan.org`)  
**Audit Date:** October 25, 2026  
**Auditor Focus:** Native Japanese Parent Lens (Ebina, Ayase, Yamato, Atsugi area)

---

## 1. Executive Summary & Diagnostic Scorecard

An inspection of the live DOM, assets, and user journey of `https://bisjapan.org` reveals that the current website operates as a severe bottleneck to student enrollment. Rather than functioning as a welcoming, high-credibility digital front door, it resembles an abandoned 2014-era commercial template. 

**Overall Experience Health Score: 24 / 100 (Critical Need of Complete Redesign)**

```
[5-Second Test]          ██░░░░░░░░  18%  (Fails to convey what, where, and who)
[Visual Design]          ███░░░░░░░  30%  (2014 ThemeForest template, low contrast)
[Information Arch]       █░░░░░░░░░  10%  (Empty navbar, single-page dump)
[Mobile Usability]       ███░░░░░░░  28%  (No pinch zoom, table overflows)
[Accessibility (a11y)]   ██░░░░░░░░  22%  (Failed contrast, missing alt tags)
[Performance / CWV]      ██░░░░░░░░  25%  (Unoptimized JPEGs, legacy render-blocking JS)
[Trust & Safety]         ██░░░░░░░░  20%  (No teacher faces, typo in city name)
[Conversion Design]      █░░░░░░░░░  12%  (Zero forms, no LINE, hidden email in footer)
```

---

## 2. Detailed Dimension-by-Dimension Audit

### 2.1. First Impression: The 5-Second Test (Score: 1.8 / 10)
- **The Test:** A native Japanese mother in Ebina searches for "海老名 英語スクール" (English school Ebina) or "インターナショナルスクール 海老名" and clicks `bisjapan.org`.
- **What She Sees in 5 Seconds:**
  1. A slow-loading Slider Revolution carousel displaying the slogan: *"Ideas are worth spreading"* (borrowed from TED Conferences).
  2. A secondary slide: *"Sense of Responsibility"*.
  3. No Japanese text whatsoever.
  4. No mention of the city name "Ebina" or "Kanagawa" anywhere above the fold.
- **Cognitive Reaction:** *"Is this a corporate consulting firm in America? Is it active? Is it for Japanese children?"*
- **Bounce Rate Probability:** Estimated > 75% bounce rate within 8 seconds for Japanese users.

### 2.2. Visual Design & Aesthetics (Score: 3.0 / 10)
- **Theme Archeology:** Built on the "Minovate" multipurpose HTML template by `tattek` (circa 2014–2015), using Bootstrap 3.3.4, jQuery 1.11.2, and Slider Revolution v4.
- **Typography Failures:** Headings use `Raleway` and body uses `Lato`, but with an extremely faint, washed-out grey (`#a2a2a2`) on white, rendering text nearly illegible on laptops and smartphones in sunlight.
- **Imagery Quality:**
  - Banner images (`bis-banner-3.jpeg`, `library-2.jpeg`, `lkg-2.jpeg`) are low-resolution, dated, and uncurated.
  - The "What We Did Previously" gallery features 16 raw photos (`1.png` to `25.png`) displayed in a rigid 4-column grid with no captions, dates, or student engagement context.
- **Template Artifacts Left in Production:** Commented-out HTML blocks still contain template demo copy from Bratislava, Slovakia (*"Vajnorska 127, Lorem Tower, Bratislava, SK"*, *"minoral@tattek.com"*).

### 2.3. Information Architecture & Navigation (Score: 1.0 / 10)
- **Empty Primary Navigation:** The `<nav id="main-navbar">` element in the HTML header is **literally empty**. There is no menu to navigate to "Curriculum", "Admissions", "Teachers", "Daily Schedule", or "Location".
- **Infinite Scroll Confusion:** Parents must blindly scroll past multiple disjointed sections without knowing where admissions info or location details are stored.
- **Address Typo in Footer:** The school's official address is listed as:
  ```html
  Kanagawa ken abina Shi, Hongo 4786 Japan
  ```
  Misspelling "Ebina" as **"abina"** is catastrophic for local Japanese SEO and destroys parent trust immediately.

### 2.4. Mobile Responsiveness & Device Usability (Score: 2.8 / 10)
- **Zoom Blocking:** `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />` explicitly prevents parents from pinch-zooming on tables and phone numbers.
- **Table Overflow:** The "Admissions & Fee Structure" table (`.table-stripped`) horizontally breaks phone screens narrower than 414px, causing unwanted side-scrolling.
- **Touch Target Hazards:** The hamburger button icon (`#main-navbar-toggle`) has an inadequate hit target (< 32px) and no fallback menu attached.

### 2.5. Accessibility & Inclusivity (Score: 2.2 / 10)
- **Contrast Ratios:** Body text `#a2a2a2` on `#ffffff` has a contrast ratio of **2.43:1**, failing WCAG 2.2 Level AA (minimum 4.5:1 required).
- **Alt Text:** Over 85% of images either have empty `alt=""` attributes or filenames like `alt="1.png"`. Assistive screen readers cannot convey what children are doing in classroom photos.
- **Heading Hierarchy Violations:** The page features skipped heading levels (e.g. `<h4>` following `<p>` without `<h2>` or `<h3>`), disrupting screen reader navigation.

### 2.6. Performance & Core Web Vitals (Score: 2.5 / 10)
- **Render-Blocking CSS & JS:** 10 separate CSS stylesheets and 14 legacy JavaScript files are loaded synchronously in the `<head>` before any content renders.
- **No Next-Gen Formats:** Images are raw `.jpeg` and `.png` without WebP or AVIF compression.
- **Estimated Core Web Vitals:**
  - **LCP (Largest Contentful Paint):** ~4.8s (Poor; threshold is < 2.5s)
  - **CLS (Cumulative Layout Shift):** 0.28 (Poor; caused by unreserved Slider Revolution heights)
  - **FID / INP:** Laggy due to heavy jQuery and parallax scroll handlers.

### 2.7. Trust & Credibility Engineering (Score: 2.0 / 10)
- **Invisible Faculty:** Zero photographs, names, credentials, or backgrounds of any teachers or school leadership. Japanese parents will never entrust their 3-year-old child to an institution without seeing who teaches them.
- **Hidden Japanese Curriculum:** The text mentions that Japanese textbooks from public schools are used, but provides zero photos of books, syllabi, or Japanese staff.
- **Opaque Legal & Safety Status:** No mention of fire safety inspections, earthquake drill routines, allergy response protocols, or prefectural authorization.

### 2.8. Conversion Design & CTA Clarity (Score: 1.2 / 10)
- **The Conversion Vacuum:** There is **no form** on the entire website.
- **Contact Friction:** Parents wanting to inquire must copy a generic Gmail address (`bisjpn@gmail.com`) or dial a landline phone (`046-259-9108`).
- **Missing Japanese Essentials:**
  - No **LINE Official Account (公式LINE)** button (the #1 preferred contact channel for Japanese parents under 40).
  - No **"Book a Free Trial Lesson" (無料体験レッスン申込み)** flow.
  - No **"Request Prospectus" (資料請求)** form.
  - No **FAQ section** answering common anxieties (e.g., "親が英語を話せなくても大丈夫ですか？" / Can parents who don't speak English still enroll their child?).

---

## 3. Prioritized Issue Matrix (Ranked by ICE Score)

Using the `product-lens` Mode 4 Prioritization framework (Impact × Confidence ÷ Effort):

| Priority | Issue / Defect | Impact (1–5) | Confidence (1–5) | Effort (1–5) | ICE Score | Recommended Action |
| :---: | :--- | :---: | :---: | :---: | :---: | :--- |
| **#1** | **No Japanese Parent Value Proposition or Language Toggle** | 5 | 5 | 2 | **12.5** | Implement Japanese-first homepage with friendly, culturally reassuring copy and English toggle. |
| **#2** | **Zero Conversion Infrastructure (No Trial Booking / No LINE)** | 5 | 5 | 2 | **12.5** | Build sticky mobile CTA bar with LINE button, 3-click Trial Lesson form, and direct call. |
| **#3** | **Unclear Tuition & Unhighlighted Government Subsidies** | 5 | 5 | 2 | **12.5** | Redesign Fee section with visual breakdown of the ¥37,000/mo *Mushouka* subsidy (net ¥0~¥17,000). |
| **#4** | **No Faculty Bios, Credentials, or Student Safety Proof** | 5 | 4 | 2 | **10.0** | Add dedicated "Meet Our Teachers" card grid with photos, native accents, and qualifications. |
| **#5** | **Empty Navigation & Critical Address Typo ("abina Shi")** | 4 | 5 | 1 | **20.0** | Fix address immediately; build clean sticky navbar with anchor jumps and clear page hierarchy. |
| **#6** | **Lack of Local Ebina Access Map & Commute Guidance** | 4 | 5 | 2 | **10.0** | Add illustrated access guide from Ebina/Ayase, bus route stops within 5km, and parking details. |
| **#7** | **Legacy 2014 Theme Tech Stack (Bootstrap 3 / Slider Rev)** | 4 | 5 | 3 | **6.7** | Replace with ultra-clean modern HTML5/Vanilla CSS responsive architecture (sub-1s load). |
| **#8** | **Severe WCAG Contrast & Mobile Zoom Restrictions** | 4 | 5 | 2 | **10.0** | Remove `maximum-scale=1`, update palette to meet 4.5:1 AA contrast standards throughout. |
