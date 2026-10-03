import {
  Heart,
  ShieldCheck,
  BadgeCheck,
  Zap,
  ArrowLeft,
  ArrowUpLeft,
} from "lucide-react";
import type { Coupon } from "@/lib/catalog";
export function CouponCard({
  coupon,
  onReveal,
  favorite,
  onFavorite,
}: {
  coupon: Coupon;
  onReveal: (coupon: Coupon) => void;
  favorite: boolean;
  onFavorite: () => void;
}) {
  return (
    <article className={`coupon-card coupon-card--${coupon.tone}`}>
      <div className="verified-rail">
        <span>كوبون تجريبي</span>
        <ShieldCheck size={15} />
      </div>
      <div className="coupon-card__top">
        <div className="coupon-store">
          <span
            className={`store-logo store-logo--${coupon.tone}`}
            aria-hidden="true"
          >
            {coupon.initial}
          </span>
          <div>
            <strong>{coupon.store}</strong>
            <span>
              <BadgeCheck size={14} /> عرض تجريبي
            </span>
          </div>
        </div>
        <button
          className={`icon-button ${favorite ? "is-favorite" : ""}`}
          onClick={onFavorite}
          aria-pressed={favorite}
          aria-label={favorite ? "إزالة من المفضلة" : "إضافة للمفضلة"}
        >
          <Heart size={18} fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="coupon-card__main">
        <div>
          <span className="discount-pill">خصم {coupon.discount}</span>
          <h3>{coupon.title}</h3>
          <p>{coupon.description}</p>
        </div>
        <div className="discount-value">
          {coupon.discount}
          <small>خصم</small>
        </div>
      </div>
      <div className="code-strip">
        <span className="code-label">كود الخصم</span>
        <strong>{coupon.code}</strong>
        <span className="code-dots" />
      </div>
      <div className="coupon-card__bottom">
        <div className="coupon-meta">
          <span>
            <ShieldCheck size={14} /> مثال توضيحي
          </span>
          <span>
            <Zap size={14} /> تفاصيل الكوبون
          </span>
        </div>
        <button
          className="button button--primary button--small"
          onClick={() => onReveal(coupon)}
        >
          عرض الكود <ArrowLeft size={16} />
        </button>
      </div>
      <button className="terms-link" onClick={() => onReveal(coupon)}>
        الشروط والأحكام <ArrowUpLeft size={13} />
      </button>
    </article>
  );
}
