# Component Spec: Footer & Local Transit Guide
**Skill Used:** `design-system` (with `seo` & `accessibility`)  
**File:** `design/components/footer.md`

---

## 1. Overview & SEO Value
The Footer serves as the foundational trust anchor for local search engine crawlers and native Japanese parents seeking verifiable legal and geographic details. It fixes the historic typo on the live site (`abina Shi` → `海老名市`) and presents a structured local transit guide for families in Ebina, Ayase, Yamato, and Atsugi.

---

## 2. Anatomy & Responsive Layout

```
+--------------------------------------------------------------------------------------------------------+
|  [Brand Column]                [Quick Navigation]       [Curriculum & Ages]      [Campus & Contact]    |
|  Crest & English/Japanese      - 当校について (About)    - プリスクール (3〜5歳)  〒243-0417            |
|  School Name                   - カリキュラム           - プライマリー (小1〜小6) 神奈川県海老名市      |
|  2007年設立・認可外保育施設     - 幼保無償化について     - セカンダリー (中1〜中3) 本郷4786              |
|  ケンブリッジ国際認定校         - 講師・スタッフ紹介     - Pre-IGCSE ~ A Level   TEL: 046-259-9108      |
|  LINE / SNS Links              - スクールバス路線       - 日本語・国語教育       Email: info@bisjapan.org |
|                                - 無料体験レッスン申込   - フランス語・アラビア語 平日 9:00〜18:00       |
+--------------------------------------------------------------------------------------------------------+
|  [Station Access & Commute Guidance Bar]                                                               |
|  🚆 小田急線・相鉄線・JR相模線「海老名駅」東口よりバス / 🚗 駐車場完備 / 🚌 スクールバス送迎対応      |
+--------------------------------------------------------------------------------------------------------+
|  [Legal, Privacy Policy, Terms & Copyright © 2007-2026 British International School, Japan]           |
+--------------------------------------------------------------------------------------------------------+
```

---

## 3. Detailed Specifications

### 3.1. Visual & Token Hierarchy
- Background: `#0D1D34` (Deepest British Navy)
- Upper Border: 4px solid `#D97706` (Amber Accent Ribbon)
- Heading Color: `#FFFFFF` (16px, Font-weight: 700, letter-spacing: 0.05em)
- Link Color: `#D8E6F8` (Navy 100), with hover state `#FCD34D` (Amber 300) and smooth transition (150ms).
- Divider: 1px solid `rgba(255, 255, 255, 0.1)`

### 3.2. Address & Entity Verification (Corrected)
```html
<address class="not-italic">
  <p class="font-bold text-white text-base">ブリティッシュ・インターナショナル・スクール（BIS Japan）</p>
  <p class="text-sm text-slate-300">〒243-0417 神奈川県海老名市本郷4786</p>
  <p class="text-xs text-slate-400 mt-1">（4786 Hongo, Ebina-shi, Kanagawa-ken 243-0417 Japan）</p>
  <div class="mt-3 space-y-1">
    <p class="text-sm text-white">電話番号: <a href="tel:046-259-9108" class="text-amber-400 font-semibold underline">046-259-9108</a></p>
    <p class="text-sm text-slate-300">FAX番号: 046-259-9109</p>
    <p class="text-sm text-slate-300">メール: <a href="mailto:info@bisjapan.org" class="hover:underline">info@bisjapan.org</a></p>
  </div>
</address>
```

### 3.3. Transit & Station Access Details
- **By Train & Local Bus:**
  - 海老名駅（小田急小田原線・相鉄本線・JR相模線）東口バスターミナルより神奈中バス乗車。
  - 最寄りバス停より徒歩すぐ。
- **By Car:**
  - 圏央道「海老名インターチェンジ」または「寒川北インターチェンジ」より車で約10〜15分。
  - 来校者用専用駐車場あり（見学・送迎時駐車可能）。
- **Dedicated School Bus:**
  - 海老名市・綾瀬市・大和市・厚木市・藤沢市北部など、学校から半径約5km圏内をご自宅付近まで運行。

### 3.4. Schema.org Structured Data Hook
The footer embeds or links directly to JSON-LD `EducationalOrganization` data specifying:
- `@type`: `School` / `Preschool`
- `name`: `British International School, Japan`
- `alternateName`: `ブリティッシュ・インターナショナル・スクール ジャパン`
- `address`: `Hongo 4786, Ebina, Kanagawa 243-0417`
- `telephone`: `+81-46-259-9108`
- `hasCredential`: `Cambridge Assessment International Education`
