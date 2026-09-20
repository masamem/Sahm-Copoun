# سَهْم — اتجاه التصميم

## Three initial directions

### Theme Name: واحة التوفير
Very Brief Intro: هوية عربية دافئة تستعير هدوء الواحات ونقوشها الهندسية لتجعل اكتشاف الخصومات تجربة موثوقة ومريحة.
Probability: 0.06

### Theme Name: سوق الضوء
Very Brief Intro: واجهة تحريرية مشرقة بطابع سعودي معاصر، تركّز على الإيقاع البصري، البطاقات الواضحة، والعروض كأبطال الصفحة.
Probability: 0.03

### Theme Name: نبض أخضر
Very Brief Intro: نظام تجاري حديث عالي التباين، يمزج الأخضر العميق مع البرتقالي الدافئ ليحوّل البحث عن الكوبون إلى فعل سريع وواثق.
Probability: 0.08

## Chosen direction: سوق الضوء

### Design Movement
Contemporary Arabic editorial commerce: a light, spacious interface inspired by premium Saudi retail brands, with asymmetric editorial composition rather than a generic centered landing page.

### Core Principles
1. **الثقة قبل الإغراء:** verification, recency, and usage signals are visible before the CTA.
2. **الخصم هو نقطة التركيز:** discount values and code actions have the strongest visual hierarchy.
3. **تنفّس بصري:** generous whitespace, restrained borders, and soft elevation keep dense marketplace content calm.
4. **RTL by instinct:** directional icons, alignment, and mobile controls are designed natively for Arabic rather than mirrored later.

### Color Philosophy
A deep olive-teal establishes trust and savings without looking like a bank; a sunlit apricot accent signals opportunity and urgency; parchment-tinted surfaces soften the otherwise white marketplace. Charcoal text stays highly legible, while mint-tinted verification surfaces create a quiet “safe to use” signal.

### Layout Paradigm
Use a 12-column desktop grid with editorial asymmetry: hero copy and search occupy the dominant right side while a floating “savings receipt” visual anchors the left. Sections alternate between wide rails and compact content clusters. On mobile, preserve hierarchy with horizontal rails for stores and categories, then collapse coupons into a single focused column.

### Signature Elements
- A vertical “تم التحقق اليوم” verification rail used on coupon cards and store details.
- Small perforated ticket edges on code panels, used sparingly as a brand motif.
- A cropped apricot sun-disc behind hero and section headings, echoing a Saudi retail “deal spotlight.”

### Interaction Philosophy
Every interaction reduces uncertainty or time-to-copy. Hover states lift cards slightly and reveal the code affordance; copy actions show an immediate inline confirmation; favorites are one-tap and never interrupt browsing. Modal transitions are fast, directional, and respectful of reduced motion.

### Animation
Use 180–240ms ease-out transitions for cards, buttons, and dropdowns. Stagger hero and coupon entrances by 40ms. Animate only opacity and transform. The copy-success state uses a short checkmark draw and a soft scale from 0.96 to 1. Respect `prefers-reduced-motion` by removing entrance choreography.

### Typography System
Use **IBM Plex Sans Arabic** for all UI and body copy, with 400/500/600/700 weights. Display headlines use 700 with compact line-height; H2 uses 700; body uses 400/500; captions use 500 with slightly increased letter spacing where Latin coupon codes appear. Never use Inter.

### Brand Essence
**سَهْم** is the fast, trustworthy way for shoppers in Saudi Arabia to find working coupons and offers, distinguished by verification-led discovery instead of noisy deal aggregation. Personality: **موثوق، ذكي، مشجّع**.

### Brand Voice
Headlines are confident and economical. CTAs are direct verbs. Microcopy reassures without overpromising.

Example lines:
- "خصمك الأقرب يبدأ من هنا"
- "كود موثوق، ووقت أقل عند الدفع"

### Wordmark & Logo
The mark is a bold geometric arrow/sahm symbol: an abstract right-to-left chevron formed from two olive strokes, with a small apricot notch representing a coupon tear. The Arabic wordmark sits beside it in a custom heavy rounded treatment, but the standalone symbol must work independently as the favicon and app icon.

### Signature Brand Color
**Sahm Olive — #146B5B**, a deep blue-green that feels ownable, calm, and distinctly connected to savings without defaulting to generic green.

## Implementation reminders

- Every page and component must include a short style comment reminding the author of the سوق الضوء direction.
- `dir="rtl"` is global and must remain correct at every breakpoint.
- Use only fictional, clearly labeled store names and offer data in the UI; do not imply real partnerships.
- Coupon states are interaction demos, not real-world performance claims.

## Style Decisions

- The vertical **تم التحقق اليوم** rail is now a recurring pattern on every primary coupon card, visually stronger than secondary metadata and placed before the CTA in the visual reading sequence.
- Store cards now pair their letter mark with a compact trust badge, while category cards carry a small Sahm editorial tag so neither relies on a plain avatar alone.
- Major section headings reuse a cropped apricot sun-disc to connect the hero, coupon rail, and discovery sections into one editorial system.
- Coupon code rows retain the perforated ticket treatment, while discount circles and verified rails reinforce the coupon as the page’s visual hero.
