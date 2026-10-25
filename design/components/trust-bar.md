# Component Spec: TrustBar
**Skill Used:** `design-system` (with `product-lens` & `frontend-a11y`)  
**File:** `design/components/trust-bar.md`

---

## 1. Overview & Strategic Purpose
The TrustBar sits immediately below the Hero section. Its specific psychological job is to neutralize the top 4 hesitations of native Japanese parents before they read the detailed body content:
1. **Accreditation:** "Is this school legit and recognized internationally?" (Cambridge Curriculum)
2. **Japanese Literacy:** "Will they learn proper Japanese?" (Ministry Textbooks & Kokugo)
3. **Affordability:** "Can we actually afford this?" (Government Subsidy Eligible: Up to ¥37,000/mo)
4. **Safety & Commute:** "How will my 3-year-old or 6-year-old get there safely?" (School Bus within 5km)
5. **Track Record:** "Is this school established?" (Operating in Kanagawa since 2007)

---

## 2. Anatomy & Layout

```
+---------------------------------------------------------------------------------------------------------+
|                                              TRUST & ACCREDITATION PILLARS                              |
|                                                                                                         |
|  [Pillar 1: ケンブリッジ認定]   [Pillar 2: 日本の教科書対応]   [Pillar 3: 幼保無償化対象]   [Pillar 4: スクールバス]  |
|  世界標準の探究カリキュラム     日本の国語・算数も習得       月最大37,000円補助          海老名・綾瀬5km圏内対応 |
|                                                                                                         |
+---------------------------------------------------------------------------------------------------------+
```

### 2.1. Structural Grid
- Container: Full width with inner `max-width: 1200px`, centered.
- Background: `#FFFFFF` (Surface) with 1px border `#E7E5E4` and subtle shadow (`0 4px 20px -2px rgba(0, 0, 0, 0.05)`).
- Border Radius: 16px (Concentric with 24px inner padding).
- Layout: 4 columns on desktop (`grid-template-columns: repeat(4, 1fr)`), 2 columns on tablet, 1 column stacked on mobile.

---

## 3. Pillar Content & Visual Attributes

### Pillar 1: Cambridge International Curriculum (世界基準の教育)
- **Icon:** Academic Shield with Laurels (`#1B365D`)
- **Title (JA):** ケンブリッジ国際カリキュラム
- **Sub-label (EN):** Cambridge International Framework
- **Description:** 世界160カ国以上で認められる国際標準の探究・STEM教育。自ら考え発信できる本物の英語力を育成します。

### Pillar 2: Japanese Kokugo & Culture (確かな日本語・国語教育)
- **Icon:** Book with Sakura Emblem (`#059669`)
- **Title (JA):** 日本の小学校教科書に準拠
- **Sub-label (EN):** Daily Native Japanese Literacy
- **Description:** 日本の公立学校と同じ検定教科書を使用した国語の授業を実施。日本の小学校・中学校への進学も安心です。

### Pillar 3: Government Subsidy Eligible (幼児教育・保育の無償化対象)
- **Icon:** Stamp with Yen/Family Relief (`#D97706`)
- **Title (JA):** 幼保無償化 対象施設
- **Sub-label (EN):** Gov Subsidy: Up to ¥37,000/mo
- **Description:** 国の幼児教育・保育の無償化制度（月額最大37,000円支給）を活用可能。実質負担0円〜で通学できます。

### Pillar 4: Safe Commute & Dedicated School Bus (安心の送迎体制)
- **Icon:** School Bus & Map Pin (`#2563EB`)
- **Title (JA):** 5km圏内 送迎バス運行
- **Sub-label (EN):** Safe Door-to-School Transit
- **Description:** 海老名市・綾瀬市・大和市・厚木市周辺のルートをカバー。専任ドライバーと添乗スタッフが安全に見守ります。

---

## 4. Visual States & Technical Specs
- **Hover Micro-interaction:** Each card subtly elevates (`transform: translateY(-3px)`) with icon color blooming slightly.
- **Accessibility:** Semantic list markup (`<ul>` and `<li>`), each icon marked with `aria-hidden="true"`, with headings at `<h3>` level for assistive devices.
