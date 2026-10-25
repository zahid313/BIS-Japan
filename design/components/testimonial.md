# Component Spec: Testimonial & Social Proof Cards
**Skill Used:** `design-system` (with `brand-voice` & `make-interfaces-feel-better`)  
**File:** `design/components/testimonial.md`

---

## 1. Overview & Psychological Purpose
In Japan, parental word-of-mouth (口コミ - Kuchikomi) is the single most decisive factor when choosing an educational institution. 
The Testimonial cards must authentically mirror the specific concerns and breakthroughs of **native Japanese mothers and fathers living in Kanagawa**:
1. *"I don't speak English at all—can our family manage?"*
2. *"Will my child fall behind in Japanese Kanji or reading?"*
3. *"How did the child adapt emotionally in the first 3 months?"*

---

## 2. Anatomy & Responsive Layout

```
+--------------------------------------------------------------------------------------------------------+
|  Section Header: 保護者様の声 | VOICES OF OUR PARENTS                                                  |
|  「最初は不安でした…」から始まった、ご家族の体験談をご紹介します。                                     |
+--------------------------------------------------------------------------------------------------------+
|                                                                                                        |
|  [Card 1: Pre-Primary 母]              [Card 2: Primary G2 父]              [Card 3: 卒園児 母]          |
|  +--------------------------------+  +--------------------------------+  +---------------------------+ |
|  | ★★★★★ 幼保無償化利用           |  | ★★★★★ 日本語と英語の両立        |  | ★★★★★ 小学校進学後の成果  | |
|  | 「英語ゼロからのスタート。先生  |  | 「英語だけでなく、日本の国語の |  | 「公立小に進学後も、国語力| |
|  | が優しく寄り添ってくれました」|  | 教科書をしっかり教えてくれるの |  | もトップクラス。英語は臆す| |
|  |                                |  | で、将来の進路も安心です」     |  | ることなく堂々と話します」| |
|  | -- 海老名市在住 M.S.様 (年長母)|  | -- 綾瀬市在住 K.T.様 (小2父)   |  | -- 大和市在住 Y.O.様 (小1)| |
|  +--------------------------------+  +--------------------------------+  +---------------------------+ |
|                                                                                                        |
+--------------------------------------------------------------------------------------------------------+
```

---

## 3. Card Content Specifications

### Card 1: The Non-English Speaking Parent Story
- **Badge:** `📍 海老名市在住 | 年長（5歳児）クラス保護者様`
- **Key Headline:** 「親の私が英語を話せなくても、全く問題ありませんでした」
- **Body Quote:**
  > 「夫婦ともに英語が得意ではなく、インターナショナルスクールはおろか英語教室も敷居が高いと感じていました。でも体験レッスンでの先生方の温かい笑顔と、スタッフの方の丁寧な日本語での説明に安心し入園を決意。今では子供が自宅で自然に英語の歌を歌いながら、ひらがなや絵本も大好きです。無償化の申請も丁寧にサポートしていただきました。」
- **Trust Tag:** `✔ 幼児教育・保育の無償化制度利用`

### Card 2: The Japanese Literacy & School Transition Story
- **Badge:** `📍 綾瀬市在住 | 小学2年生 クラス保護者様`
- **Key Headline:** 「日本の教科書を使う国語教育があるから、将来の選択肢が広がります」
- **Body Quote:**
  > 「英語漬けで母国語が疎かになるのだけは避けたかったので、公立学校と同じ国語教科書を毎日学習するカリキュラムが決め手でした。算数や理科はケンブリッジの英語テキストで主体的に学び、国語は美しい日本語の読み書きを習得しています。子供自身が学ぶ楽しさを実感しているのが何より嬉しいです。」
- **Trust Tag:** `✔ ケンブリッジ国際 × 文科省教科書`

### Card 3: The Bus Route & Daily Safety Story
- **Badge:** `📍 座間・海老名エリア | 年中（4歳児）クラス保護者様`
- **Key Headline:** 「自宅近くまでのスクールバス送迎と、毎日の連絡帳で安心」
- **Body Quote:**
  > 「共働きのため毎日の送り迎えが心配でしたが、自宅近くまでスクールバスが運行しており大変助かっています。先生方がアプリや連絡帳でその日の様子や成長をこまめに共有してくださるので、離れていても学校での笑顔が目に浮かびます。アットホームで家族のような温かい環境です。」
- **Trust Tag:** `✔ スクールバス利用`

---

## 4. Visual & Token Styling
- Card Background: `#FFFFFF`
- Border: 1px solid `#E7E5E4` (Slate 200)
- Concentric Border Radius: 16px outer, 20px padding
- Quote Icon: Watermark quote mark `#FEF3C7` (Amber 100) placed top-right.
- Text Style: `#1C1917` (Slate 900) for headlines, `#44403C` (Slate 700) for quotes with line-height 1.8.
- Stars: 5 filled stars in Gold `#F59E0B`.
