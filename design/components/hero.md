# Component Spec: Hero Section
**Skill Used:** `design-system` (with `frontend-design-direction` & `make-interfaces-feel-better`)  
**File:** `design/components/hero.md`

---

## 1. Overview & Strategic Job
The Hero section must win the **5-Second Test** for a native Japanese mother in Ebina:
1. **Who & Where:** An accredited international school right here in Ebina/Ayase.
2. **What:** Cambridge International Curriculum paired with daily Japanese Kokugo.
3. **Reassurance:** "保護者が英語を話せなくても安心" (Parents don't need English).
4. **Instant Action:** 1-Click Free Trial Lesson or LINE Chat.

---

## 2. Anatomy & Responsive Layout

```
+--------------------------------------------------------------------------------------------------+
|  [Tag: 📍 海老名・綾瀬 | 2007年開校 | ケンブリッジ国際認定校]                                       |
|                                                                                                  |
|  H1: 海老名で育つ、                                  [Hero Visual Container]                     |
|      世界基準の英語力と確かな日本語。                 +-----------------------------------------+ |
|                                                      |  High-Res Authentic Classroom Image     | |
|  Lead: ケンブリッジ国際カリキュラムと日本の教科書で学ぶ、  |  - Cheerful children & native teacher   | |
|        安心のバイリンガル教育。保護者様が英語を        |  - Natural sunlight                     | |
|        話せなくても、手厚くサポートします。            +-----------------------------------------+ |
|                                                      |  [Floating Trust Pill: 幼保無償化対象]   | |
|  [🔘 無料体験レッスンを予約する]  [🟢 LINEで気軽に質問]  +-----------------------------------------+ |
|                                                                                                  |
|  Small Proof Bar: ★★★★★ 地域の保護者様から高い信頼 | 3歳〜中学生 | 送迎バスあり (5km圏内)        |
+--------------------------------------------------------------------------------------------------+
```

### 2.1. Left Content Column (Desktop: 58% width, Mobile: 100%)
- **Location & Accreditation Pill:**
  - Background: `#EEF4FC` (Navy 50)
  - Border: 1px solid `#B3CEF2`
  - Text: `📍 神奈川県海老名市・綾瀬市 | ケンブリッジ国際カリキュラム認定 | 2007年設立`
  - Font: 13px, Font-weight 600, Color `#1B365D`
- **Main Heading (H1):**
  - Text: `海老名で育つ、`<br />`世界基準の英語力と確かな日本語。`
  - Typography: 44px (Desktop) / 30px (Mobile), Line-height 1.25, `text-wrap: balance`
  - English Micro-Subtitle: *"World-Class Cambridge Education Rooted in Japan"* (16px, `#78716C`)
- **Lead Narrative Paragraph:**
  - Text: `「英語を話せるようになってほしいけれど、日本語が遅れないか心配…」そんなご不安に寄り添い、BIS Japanではケンブリッジ国際カリキュラムによる本格的な探究学習と、日本の小学校教科書を用いた国語授業を両立。海老名・綾瀬・大和・厚木の地で、未来を生きる子供たちの自信を育てます。`
  - Typography: 16px, Line-height 1.8, `#44403C`
- **Dual Conversion CTA Cluster:**
  - **Primary CTA:** `無料体験レッスンに申し込む（参加無料）` (Amber 600, large 52px height, 18px font weight 700, icon arrow)
  - **Secondary LINE CTA:** `LINEで気軽に相談する` (LINE Green `#06C755`, 52px height, icon LINE logo)
- **Micro Trust Badges:**
  - `✔ 幼児教育・保育の無償化（月額最大3.7万円給付）対象`
  - `✔ 5km圏内スクールバス運行（海老名・綾瀬など）`
  - `✔ 英語が初めてのお子様も大歓迎`

### 2.2. Right Media Column (Desktop: 42% width, Mobile: 100%)
- **Hero Image Architecture:**
  - Layered composite image featuring active, smiling students engaged with teachers.
  - Inset outline: `1px solid rgba(0, 0, 0, 0.08)`, border-radius: 20px.
- **Floating Badge Overlay 1 (Bottom Left of Image):**
  - Glassmorphic card: `実質月謝 0円〜17,000円` (幼児教育無償化適用時)
  - Star rating & government stamp icon.
- **Floating Badge Overlay 2 (Top Right of Image):**
  - Cambridge International School badge.

---

## 3. Behavioral & Motion Details
- **Hero Entrance:** Gentle staggered reveal (Opacity: 0 → 1, translateY: 16px → 0px, duration: 400ms).
- **CTA Hover:** Primary button raises 2px with enhanced drop-shadow (`box-shadow: 0 10px 25px -5px rgba(217, 119, 6, 0.4)`).
- **Mobile Sticky Trigger:** When the hero CTA scrolls out of viewport, the bottom mobile bar smoothly slides into view.
