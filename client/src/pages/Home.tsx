/* سوق الضوء: Arabic editorial commerce, Sahm Olive + apricot, verification-led hierarchy, RTL-first. */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowUpLeft,
  BadgeCheck,
  Bell,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Facebook,
  Heart,
  Instagram,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Tag,
  Ticket,
  TrendingUp,
  Twitter,
  UserRound,
  X,
  Zap,
} from "lucide-react";

const logoUrl = "https://d2xsxph8kpxj0f.cloudfront.net/310519663890167905/YhatHEeNFLBL9m3u6y3Nwp/sahm-logo-KsQMYf4BsWoxQJdbt429Zd.webp";
const heroUrl = "https://d2xsxph8kpxj0f.cloudfront.net/310519663890167905/YhatHEeNFLBL9m3u6y3Nwp/sahm-hero-fixpfM4RqYnrUecg2f4VDV.webp";
const spotlightUrl = "https://d2xsxph8kpxj0f.cloudfront.net/310519663890167905/YhatHEeNFLBL9m3u6y3Nwp/sahm-savings-spotlight-knrB4G87CxRHwAHAo2WEjz.webp";

const stores = [
  { name: "متجر ألف", initial: "أ", count: "12 كوبون", discount: "25%", tone: "olive" },
  { name: "رحلة", initial: "ر", count: "8 كوبونات", discount: "30%", tone: "apricot" },
  { name: "نمط", initial: "ن", count: "15 كوبون", discount: "20%", tone: "ink" },
  { name: "بيت وورد", initial: "ب", count: "6 كوبونات", discount: "18%", tone: "mint" },
  { name: "سلة يومية", initial: "س", count: "9 كوبونات", discount: "15%", tone: "sand" },
];

const coupons = [
  { store: "متجر ألف", initial: "أ", title: "خصم إضافي على طلبك", description: "استخدم الكود واحصل على خصم إضافي على المنتجات المختارة", discount: "20%", code: "SAVE20", uses: "1,250 شخص", state: "featured", tone: "olive", verified: "تم التحقق اليوم" },
  { store: "رحلة", initial: "ر", title: "خصم على حجوزاتك القادمة", description: "وفر أكثر عند حجز رحلتك التالية مع العرض المميز", discount: "30%", code: "TRAVEL30", uses: "864 شخص", state: "exclusive", tone: "apricot", verified: "كود موثوق" },
  { store: "نمط", initial: "ن", title: "خصم على القطع الجديدة", description: "تسوق مجموعتك المفضلة بخصم إضافي لفترة محدودة", discount: "15%", code: "STYLE15", uses: "532 شخص", state: "soon", tone: "ink", verified: "ينتهي قريباً" },
];

const categories = [
  ["أزياء", "١٢٤ عرض", "✦"], ["إلكترونيات", "٨٨ عرض", "◈"], ["توصيل الطعام", "٦٤ عرض", "⌁"], ["السفر", "٤٢ عرض", "↗"], ["الجمال والعناية", "٧١ عرض", "✧"], ["المنزل", "٥٨ عرض", "⌂"], ["الأطفال", "٣٦ عرض", "○"], ["الرياضة", "٢٩ عرض", "◒"],
];

const deals = [
  { brand: "متجر ألف", title: "اختيارات الموسم بخصم يصل إلى", discount: "25%", oldPrice: "٢٤٩ ر.س", newPrice: "١٨٦ ر.س", tone: "olive" },
  { brand: "رحلة", title: "خطط لرحلتك القادمة بسعر أذكى", discount: "30%", oldPrice: "٨٩٠ ر.س", newPrice: "٦٢٣ ر.س", tone: "apricot" },
  { brand: "بيت وورد", title: "لمسات صغيرة تغيّر بيتك", discount: "18%", oldPrice: "١٨٠ ر.س", newPrice: "١٤٧ ر.س", tone: "mint" },
];

function BrandMark({ compact = false }: { compact?: boolean }) {
  return <Link href="/" className={`brand-mark ${compact ? "brand-mark--compact" : ""}`} aria-label="سهم، الرئيسية">
    <span className="brand-mark__symbol"><img src={logoUrl} alt="" /></span>
    {!compact && <span className="brand-mark__text"><strong>سَهْم</strong><small>أوفر لك، أسرع لك</small></span>}
  </Link>;
}

function StoreLogo({ initial, tone = "olive" }: { initial: string; tone?: string }) {
  return <span className={`store-logo store-logo--${tone}`} aria-hidden="true">{initial}</span>;
}

function SectionHeading({ eyebrow, title, link = "عرض الكل" }: { eyebrow?: string; title: string; link?: string }) {
  return <div className="section-heading">
    <div className="heading-copy">{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2></div>
    <button className="text-link" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{link}<ArrowLeft size={16} /></button>
  </div>;
}

function CouponCard({ coupon, onReveal, favorite, onFavorite }: { coupon: typeof coupons[number]; onReveal: (coupon: typeof coupons[number]) => void; favorite: boolean; onFavorite: () => void }) {
  return <article className={`coupon-card coupon-card--${coupon.tone}`}>
    <div className="verified-rail"><span>تم التحقق اليوم</span><ShieldCheck size={15} /></div>
    <div className="coupon-card__top">
      <div className="coupon-store"><StoreLogo initial={coupon.initial} tone={coupon.tone} /><div><strong>{coupon.store}</strong><span><BadgeCheck size={14} /> {coupon.verified}</span></div></div>
      <button className={`icon-button ${favorite ? "is-favorite" : ""}`} onClick={onFavorite} aria-label="إضافة للمفضلة"><Heart size={18} fill={favorite ? "currentColor" : "none"} /></button>
    </div>
    <div className="coupon-card__main"><div><span className="discount-pill">خصم {coupon.discount}</span><h3>{coupon.title}</h3><p>{coupon.description}</p></div><div className="discount-value">{coupon.discount}<small>خصم</small></div></div>
    <div className="code-strip"><span className="code-label">كود الخصم</span><strong>{coupon.code}</strong><span className="code-dots" /></div>
    <div className="coupon-card__bottom"><div className="coupon-meta"><span><ShieldCheck size={14} /> {coupon.uses}</span><span><Zap size={14} /> {coupon.state === "soon" ? "ينتهي خلال يومين" : "يعمل الآن"}</span></div><button className="button button--primary button--small" onClick={() => onReveal(coupon)}>عرض الكود <ArrowLeft size={16} /></button></div>
    <button className="terms-link">الشروط والأحكام <ArrowUpLeft size={13} /></button>
  </article>;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [modalCoupon, setModalCoupon] = useState<typeof coupons[number] | null>(null);
  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredCoupons = useMemo(() => query.trim() ? coupons.filter((coupon) => `${coupon.store} ${coupon.title}`.includes(query.trim())) : coupons, [query]);
  const toggleFavorite = (name: string) => setFavorites((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  const copyCode = async (code: string) => { await navigator.clipboard?.writeText(code); setCopied(true); window.setTimeout(() => setCopied(false), 2200); };

  return <div dir="rtl" className="app-shell">
    <header className="site-header">
      <div className="container header-inner">
        <button className="mobile-menu-button icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="فتح القائمة"><Menu size={22} /></button>
        <BrandMark />
        <nav className={`main-nav ${menuOpen ? "main-nav--open" : ""}`} aria-label="التنقل الرئيسي">
          <Link href="/">الرئيسية</Link><Link href="/stores">المتاجر</Link><Link href="/coupons">الكوبونات</Link><Link href="/deals">العروض <span className="nav-new">جديد</span></Link><Link href="/categories">التصنيفات</Link>
        </nav>
        <div className="header-actions"><button className="header-search-button" onClick={() => document.getElementById("hero-search")?.focus()}><Search size={18} /><span>ابحث عن متجر أو كوبون...</span></button><button className="icon-button header-icon" aria-label="المفضلة"><Heart size={19} /></button><button className="icon-button header-icon" aria-label="الحساب"><UserRound size={19} /></button></div>
      </div>
    </header>

    <main>
      <section className="hero-section">
        <div className="hero-texture" />
        <div className="container hero-grid">
          <div className="hero-copy"><span className="hero-kicker"><Sparkles size={15} /> وجهتك الأذكى للتوفير</span><h1>وفر أكثر مع<br /><em>أحدث أكواد الخصم</em></h1><p>اكتشف أفضل كوبونات وأكواد الخصم لمتاجرك المفضلة في السعودية، مجمّعة ومتحقق منها لتتسوق بثقة.</p><div className="hero-search"><Search size={21} /><input id="hero-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث عن نون، نمشي، أمازون..." /><button onClick={() => document.getElementById("coupons")?.scrollIntoView({ behavior: "smooth" })}>ابحث عن كوبون <ArrowLeft size={17} /></button></div><div className="hero-proof"><div className="proof-avatars"><span>أ</span><span>ر</span><span>ن</span><span>+</span></div><span><strong>+١٠,٠٠٠</strong> متسوق وجد توفيره اليوم</span></div></div>
          <div className="hero-visual"><img src={heroUrl} alt="رسوم تجريدية لأكواد الخصم والتسوق" /><div className="floating-receipt"><span className="receipt-icon"><Check size={17} /></span><div><strong>تم التحقق اليوم</strong><small>كود يعمل بثقة</small></div></div><div className="floating-save"><span>وفّرت</span><strong>١٨٦ ر.س</strong><small>هذا الشهر</small></div></div>
        </div>
        <div className="hero-stats container"><div><strong>+٢,٤٠٠</strong><span>كوبون موثوق</span></div><div><strong>+١٢٠</strong><span>متجر سعودي</span></div><div><strong>٩٨٪</strong><span>نسبة التحقق</span></div><div><strong>يومياً</strong><span>عروض جديدة</span></div></div>
      </section>

      <section className="section stores-section"><div className="container"><SectionHeading eyebrow="ابدأ من هنا" title="أشهر المتاجر" link="عرض جميع المتاجر" /><div className="store-rail">{stores.map((store) => <Link href={`/stores/${store.name}`} className="store-card" key={store.name}><div className="store-card__head"><div className="store-visual"><StoreLogo initial={store.initial} tone={store.tone} /><span className="store-mini-badge"><Tag size={10} /> موثوق</span></div><ChevronLeft size={18} className="store-arrow" /></div><strong>{store.name}</strong><span>{store.count}</span><small>خصم يصل إلى <b>{store.discount}</b></small></Link>)}</div></div></section>

      <section className="section coupons-section" id="coupons"><div className="container"><div className="coupon-intro"><div><SectionHeading eyebrow="مختارة لك اليوم" title="أفضل كوبونات اليوم" link="كل الكوبونات" /><p>أكواد مجرّبة ومحدّثة باستمرار، لأن وقتك يستحق أن يذهب للتسوق لا للبحث.</p></div><img src={spotlightUrl} alt="رسوم تجريدية لقسائم التوفير" /></div><div className="coupon-grid">{filteredCoupons.length ? filteredCoupons.map((coupon) => <CouponCard key={coupon.code} coupon={coupon} onReveal={setModalCoupon} favorite={favorites.includes(coupon.code)} onFavorite={() => toggleFavorite(coupon.code)} />) : <div className="empty-state"><Search size={28} /><strong>لم نجد كوبوناً مطابقاً</strong><span>جرّب البحث باسم متجر آخر.</span></div>}</div></div></section>

      <section className="section categories-section"><div className="container"><SectionHeading eyebrow="تسوّق على طريقتك" title="تصفح حسب التصنيف" link="جميع التصنيفات" /><div className="category-grid">{categories.map(([name, count, icon]) => <Link href={`/categories/${name}`} className="category-card" key={name}><span className="category-icon">{icon}<i>سَهْم</i></span><strong>{name}</strong><small>{count}</small><ArrowLeft size={15} /></Link>)}</div></div></section>

      <section className="section deals-section"><div className="container"><SectionHeading eyebrow="فرص لا تفوّت" title="أحدث العروض" link="مشاهدة كل العروض" /><div className="deal-grid">{deals.map((deal) => <article className={`deal-card deal-card--${deal.tone}`} key={deal.title}><div className="deal-art"><div className="deal-art__disc" /><span className="deal-art__ticket"><Tag size={18} /></span></div><div className="deal-content"><span>{deal.brand}</span><h3>{deal.title} <b>{deal.discount}</b></h3><div className="price-row"><strong>{deal.newPrice}</strong><del>{deal.oldPrice}</del></div><button className="button button--outline button--small">مشاهدة العرض <ArrowLeft size={15} /></button></div></article>)}</div></div></section>

      <section className="how-section"><div className="container"><div className="how-copy"><span className="eyebrow">ثلاث خطوات فقط</span><h2>التوفير صار أسهل</h2><p>من أول بحث إلى آخر خطوة عند الدفع، نخلّي تجربة الكوبون واضحة وسريعة.</p><button className="button button--light">استكشف الكوبونات <ArrowLeft size={16} /></button></div><div className="steps"><div className="step"><span>٠١</span><Store size={23} /><strong>اختر المتجر</strong><p>ابحث عن متجرك المفضل وتصفح عروضه.</p></div><div className="step"><span>٠٢</span><Copy size={23} /><strong>انسخ كود الخصم</strong><p>اختر الكود الأنسب لك وانسخه بضغطة.</p></div><div className="step"><span>٠٣</span><ShoppingBagIcon /><strong>استخدمه عند الدفع</strong><p>الصق الكود واستمتع بتوفيرك.</p></div></div></div></section>

      <section className="newsletter-section"><div className="container newsletter-inner"><div><span className="eyebrow">على بريدك، بدون إزعاج</span><h2>لا تفوّت أفضل العروض</h2><p>اشترك ليصلك أحدث أكواد الخصم والعروض المنتقاة بعناية.</p></div>{subscribed ? <div className="subscribed"><Check size={22} /><strong>تم الاشتراك بنجاح</strong><span>سنخبرك عندما يستحق العرض انتباهك.</span></div> : <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); if (email) setSubscribed(true); }}><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="البريد الإلكتروني" required /><button className="button button--primary">اشترك الآن <ArrowLeft size={16} /></button><small><ShieldCheck size={13} /> لن نرسل لك إلا ما يهمك</small></form>}</div></section>
    </main>

    <footer className="site-footer"><div className="container footer-grid"><div className="footer-brand"><BrandMark /><p>سَهْم يساعدك تجد الكوبون المناسب في الوقت المناسب، لتتسوق بذكاء وتوفّر أكثر.</p><div className="socials"><button aria-label="انستغرام"><Instagram size={17} /></button><button aria-label="تويتر"><Twitter size={17} /></button><button aria-label="فيسبوك"><Facebook size={17} /></button></div></div><div><h3>عن الموقع</h3><Link href="/about">من نحن</Link><Link href="/contact">تواصل معنا</Link><Link href="/privacy">سياسة الخصوصية</Link><Link href="/terms">الشروط والأحكام</Link></div><div><h3>الكوبونات</h3><Link href="/coupons">أحدث الكوبونات</Link><Link href="/stores">أشهر المتاجر</Link><Link href="/deals">العروض</Link><Link href="/categories">التصنيفات</Link></div><div><h3>مساعدة</h3><Link href="/faq">الأسئلة الشائعة</Link><Link href="/how-it-works">طريقة استخدام الكوبونات</Link><Link href="/report">الإبلاغ عن كوبون</Link></div></div><div className="container footer-bottom"><span>© ٢٠٢٤ سَهْم. جميع الحقوق محفوظة.</span><span>صُنع في السعودية <span className="saudi-dot" /></span></div></footer>

    <div className="mobile-bottom-nav"><Link href="/"><Store size={18} /><span>الرئيسية</span></Link><Link href="/stores"><Tag size={18} /><span>المتاجر</span></Link><button onClick={() => document.getElementById("hero-search")?.focus()}><Search size={22} /><span>بحث</span></button><Link href="/favorites"><Heart size={18} /><span>المفضلة</span></Link><Link href="/account"><UserRound size={18} /><span>حسابي</span></Link></div>

    {modalCoupon && <div className="modal-backdrop" onClick={() => setModalCoupon(null)}><div className="coupon-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close icon-button" onClick={() => setModalCoupon(null)} aria-label="إغلاق"><X size={19} /></button><div className="modal-sparkle"><Sparkles size={21} /></div><StoreLogo initial={modalCoupon.initial} tone={modalCoupon.tone} /><span className="modal-verified"><BadgeCheck size={14} /> كود موثوق ومتحقق منه</span><h2>{modalCoupon.title}</h2><p>{modalCoupon.description}</p><div className="modal-code"><span>كود الخصم</span><strong>{modalCoupon.code}</strong></div><button className={`button button--primary modal-copy ${copied ? "is-copied" : ""}`} onClick={() => copyCode(modalCoupon.code)}>{copied ? <><Check size={18} /> تم نسخ الكود ✓</> : <><Copy size={18} /> نسخ الكود</>}</button><button className="button button--dark modal-store">الانتقال إلى المتجر <ArrowLeft size={17} /></button><small className="modal-note"><ShieldCheck size={13} /> استخدمه {modalCoupon.uses} مؤخراً</small></div></div>}
  </div>;
}

function ShoppingBagIcon() { return <span className="custom-step-icon">⌂</span>; }
