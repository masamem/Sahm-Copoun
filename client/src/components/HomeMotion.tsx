import { useState } from "react";
import { Link } from "wouter";
import { Pause, Play, Ticket } from "lucide-react";
import { StoreLogo } from "./StoreLogo";
import type { Coupon, Store } from "@/lib/catalog";

export function HeroCoupons({ coupons, onReveal }: { coupons: Coupon[]; onReveal: (coupon: Coupon) => void }) {
  const [paused, setPaused] = useState(false);
  const featured = coupons.slice(0, 3);
  return <div className="hero-motion" data-paused={paused}>
    <div className="hero-motion__glow" aria-hidden="true" />
    {featured.length ? featured.map((coupon, index) =>
      <button type="button" key={coupon.store + coupon.code} className={`hero-ticket hero-ticket--${index}`}
        onClick={() => onReveal(coupon)} aria-label={`عرض كوبون ${coupon.store}: ${coupon.discount}`}>
        <div className="hero-ticket__top">
          <StoreLogo initial={coupon.initial} tone={coupon.tone} logoUrl={coupon.logoUrl} />
          <span><span className="hero-ticket__store">{coupon.store}</span><strong>{coupon.discount}</strong></span>
        </div>
        <div className="hero-ticket__code"><span dir="ltr" aria-hidden="true">••••••</span><span>عرض الكود</span></div>
        {coupon.isDemo !== false && <small>مثال تجريبي</small>}
      </button>
    ) : ["كود خصم", "عروض المتاجر", "توفير أكثر"].map((label, index) =>
      <div key={label} className={`hero-ticket hero-ticket--${index} hero-ticket--illustration`} aria-hidden="true">
        <Ticket size={28} /><strong>{label}</strong>
        <div className="hero-ticket__code"><span>••••••</span><span>كوبونيا</span></div>
      </div>
    )}
    <span className="hero-motion__caption">اختياراتك للتوفير</span>
    <button type="button" className="motion-control" onClick={() => setPaused(!paused)}
      aria-label={paused ? "تشغيل حركة الكوبونات" : "إيقاف حركة الكوبونات"} aria-pressed={paused}>
      {paused ? <Play size={14} /> : <Pause size={14} />}<span>{paused ? "تشغيل الحركة" : "إيقاف الحركة"}</span>
    </button>
  </div>;
}

export function StoreTicker({ stores }: { stores: Store[] }) {
  const [paused, setPaused] = useState(false);
  if (!stores.length) return null;
  const repeats = Math.max(1, Math.ceil(8 / stores.length));
  return <section className="store-ticker" aria-label="تصفح المتاجر" data-paused={paused}>
    <div className="store-ticker__window">
      <div className="store-ticker__track">
        {[0, 1].map(group => <div key={group} className="store-ticker__group" aria-hidden={group === 1 ? true : undefined} inert={group === 1 ? true : undefined}>
          {Array.from({ length: repeats }, (_, repeat) => stores.map(store =>
            group === 0 && repeat === 0 ?
              <Link key={repeat + store.name} href={`/stores/${encodeURIComponent(store.name)}`} className="store-ticker__item">
                <span className="store-ticker__dot" aria-hidden="true" /><strong>{store.name}</strong>
              </Link> :
              <span key={repeat + store.name} className="store-ticker__item" aria-hidden="true"><span className="store-ticker__dot" /><strong>{store.name}</strong></span>
          ))}
        </div>)}
      </div>
    </div>
    <button type="button" className="store-ticker__control" onClick={() => setPaused(!paused)}
      aria-label={paused ? "تشغيل شريط المتاجر" : "إيقاف شريط المتاجر"} aria-pressed={paused}>
      {paused ? <Play size={15} /> : <Pause size={15} />}
    </button>
  </section>;
}
