# Component Spec: Header & Navigation
**Skill Used:** `design-system` (with `make-interfaces-feel-better` & `accessibility`)  
**File:** `design/components/header.md`

---

## 1. Overview & Purpose
The Header is the primary trust and orientation anchor. It instantly confirms:
1. School Identity (British International School, Japan / ブリティッシュ・インターナショナル・スクール)
2. Location (Ebina / Ayase, Kanagawa)
3. Direct Language Switcher (日本語 / English)
4. Urgent Conversion CTA (無料体験レッスン予約 / Book Trial)

---

## 2. Anatomy & Layout

```
+--------------------------------------------------------------------------------------------------------+
|  Top Utility Bar (Emergency / Transit / Direct Phone: 046-259-9108)               [JA | EN]  [LINE相談] |
+--------------------------------------------------------------------------------------------------------+
|  [Logo + Crest]   [About us] [Curriculum] [Ages & Fees] [Teachers] [Access]      [無料体験レッスン予約]  |
+--------------------------------------------------------------------------------------------------------+
```

### 2.1. Top Utility Bar (Desktop Only)
- Background: `#0D1D34` (Deepest Navy)
- Height: 36px
- Content:
  - Left: Phone `046-259-9108` (平日 9:00〜18:00) | 所在地: 神奈川県海老名市
  - Right:
    - Language Switcher: Pill toggle (`日本語` active, `English`)
    - LINE Fast-Inquiry pill button (`#06C755` with LINE icon)

### 2.2. Main Navigation Bar
- Background: `#FFFFFF` with sticky glassmorphism fallback (`rgba(255, 255, 255, 0.95)`, `backdrop-filter: blur(12px)`)
- Height: 76px (Desktop), 64px (Mobile)
- Border Bottom: 1px solid `#E7E5E4`
- Elements:
  - **Brand Logo:** Crest emblem + "British International School Japan" + Japanese subtitle "海老名・綾瀬の認可外保育・国際校"
  - **Navigation Links:**
    - 当校について (About)
    - カリキュラム (Curriculum - Cambridge & Kokugo)
    - 学年・授業料 (Ages & Tuition - 幼保無償化)
    - 講師・環境 (Teachers & Safety)
    - アクセス (Access & School Bus)
  - **Primary CTA Button:**
    - Label: `無料体験レッスン` (Free Trial Lesson)
    - Background: `#D97706` (Amber 600) with hover `#B45309` (Amber 700)
    - Border-radius: 8px

### 2.3. Mobile Sticky Header
- Left: Logo icon + School Name (Compact)
- Right:
  - Language toggle pill (`JA / EN`)
  - Phone call icon button (44x44px touch target)
  - Hamburger toggle button (`aria-label="メニューを開く"`, 44x44px)
- **Mobile Menu Drawer:** Full-height slide-over drawer with high-contrast links, bus routes, LINE button, and booking CTA.

---

## 3. Interaction & State Specifications

| Element | Default State | Hover State | Active / Focus State |
| :--- | :--- | :--- | :--- |
| **Nav Links** | Color: `#44403C`, Weight: 500 | Color: `#1B365D`, Underline fade-in | Focus ring: 3px solid `#2563EB`, offset 2px |
| **Trial CTA** | Bg: `#D97706`, Text: `#FFF` | Bg: `#B45309`, translateY(-1px) | Bg: `#92400E`, scale(0.98) |
| **Lang Toggle**| Bg: `#142A4A`, Text: `#CBD5E1` | Bg: `#1E3A8A`, Text: `#FFF` | Active language marked with `aria-pressed="true"` |
| **Mobile Toggle**| Color: `#1C1917` | Color: `#1B365D` | Animated hamburger to 'X' close icon |

---

## 4. Accessibility & Technical Requirements
- **Semantic HTML:** `<header>`, `<nav role="navigation" aria-label="メインナビゲーション">`.
- **Keyboard Navigation:** Full Tab and Shift-Tab support through all dropdown links and drawer items.
- **Escape Key:** Pressing `Esc` closes the mobile menu drawer and returns focus to the toggle button.
- **Contrast Ratios:** All nav text on white exceeds 7.8:1 (AAA). Utility bar text exceeds 9.5:1 (AAA).
