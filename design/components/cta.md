# Component Spec: Conversion CTA & Booking Section
**Skill Used:** `design-system` (with `marketing-campaign` & `make-interfaces-feel-better`)  
**File:** `design/components/cta.md`

---

## 1. Overview & Conversion Architecture
The conversion system must eliminate friction for busy parents browsing on mobile devices. It provides three escalating commitment levels:
1. **Zero-Commitment:** LINE Official Quick Chat (LINEで気軽に質問)
2. **Low-Commitment:** Free Trial Lesson / Campus Tour Booking (無料体験レッスン・学校見学会予約)
3. **Immediate:** 1-Tap Telephone Call (お電話でのお問い合わせ)
4. **Persistent:** Mobile Sticky Bottom Action Bar (スマホ常時追従バー)

---

## 2. Anatomy of the Main Booking Section

```
+---------------------------------------------------------------------------------------------------------+
|                                    まずは実際のレッスンをご見学ください                                   |
|                                         【無料体験レッスン・学校説明会】                                  |
|               お子様の年齢に合わせたクラスで、外国人講師や日本の先生と一緒に楽しく体験できます。                |
|                                                                                                         |
|  [Step-by-Step Flow]                                                                                    |
|  (1) Web/LINEで簡単予約   --->   (2) 当日スクールへ来校   --->   (3) レッスン体験＆個別相談（約45分）       |
|                                                                                                         |
|  +---------------------------------------------------------------------------------------------------+  |
|  |  Booking Form Container (Clean 4-Field Minimal Form)                                              |  |
|  |                                                                                                   |  |
|  |  [ お子様のお名前 (漢字 / ふりがな) ]        [ お子様の生年月日 / 年齢 (選択) ]                    |  |
|  |  [ 保護者様のお名前 / お電話番号 ]           [ ご希望の体験日時 (カレンダー選択) ]                 |  |
|  |  [ ご質問・気になる点 (任意) ]                                                                    |  |
|  |                                                                                                   |  |
|  |                 [ 🔘 無料体験レッスンに申し込む（簡単1分）]                                          |  |
|  |                 ※無理な勧誘等は一切ございませんので、お気軽にご参加ください。                         |  |
|  +---------------------------------------------------------------------------------------------------+  |
|                                                                                                         |
|  [ Alternative LINE Fast-Track Container ]                                                              |
|  🟢 「フォーム入力が面倒な方は、公式LINEからメッセージを送るだけでご予約いただけます」                  |
|  [ 友だち追加して体験レッスンを予約する (タップでLINE起動) ]                                             |
+---------------------------------------------------------------------------------------------------------+
```

---

## 3. Persistent Mobile Sticky Bottom Bar

Visible exclusively on viewport widths `< 768px`, permanently docked at the bottom:

```
+------------------------------------------------------------------------+
| [ 📞 電話する ]   |   [ 🟢 LINEで相談 ]   |   [ 📅 無料体験予約 (主ボタン) ] |
+------------------------------------------------------------------------+
```

### Specs for Mobile Bottom Bar:
- Height: 60px (+ safe area inset for iOS home bar)
- Background: `#FFFFFF` with top border `1px solid #E7E5E4` and upward drop shadow (`0 -4px 16px rgba(0,0,0,0.08)`)
- Z-Index: 9999
- Layout: 3-column flexbox:
  1. **Phone Button (25% width):** Icon + "電話" (Opens `tel:046-259-9108`)
  2. **LINE Button (35% width):** Background `#06C755`, White Text + LINE Icon: "LINE相談"
  3. **Trial Booking (40% width):** Background `#D97706`, White Bold Text: "無料体験予約"

---

## 4. Micro-States & Validation Rules
- **Form Inputs:**
  - Height: 48px (Touch-friendly minimum)
  - Border: 1px solid `#D6D3D1`, Radius: 8px
  - Focus Ring: `3px solid #2563EB`, background tinted slightly blue `#F8FAFC`.
- **Validation Messages:** Clear, polite Japanese inline error messages:
  - *「お電話番号を半角数字でご入力ください」*
- **Success State:** Instant modal / inline confirmation:
  - *「ご予約ありがとうございます。担当者より24時間以内に確認のご連絡（お電話またはメール/LINE）を差し上げます。」*
