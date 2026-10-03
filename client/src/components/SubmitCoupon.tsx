import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  BadgeCheck,
  Mail,
  MessageCircle,
  Ticket,
} from "lucide-react";
import { categories } from "@/lib/data";
import { couponContact } from "@/lib/contact";

export default function SubmitCoupon() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const available = Boolean(couponContact.email || couponContact.whatsapp);
  const emailHref = `mailto:${couponContact.email}?subject=${encodeURIComponent("طلب إضافة كوبون إلى كوبونيا")}&body=${encodeURIComponent(message)}`;
  const whatsappHref = `https://wa.me/${couponContact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

  return (
    <div className="submission-layout">
      <aside className="submission-intro">
        <span className="submission-icon">
          <Ticket size={30} />
        </span>
        <h2>عرضك يستحق أن يُكتشف</h2>
        <p>
          هل تمثل متجراً، أو لديك كود خصم ترغب بمشاركته؟ أرسل التفاصيل لفريق
          كوبونيا لمراجعتها.
        </p>
        <ul>
          <li>
            <BadgeCheck size={18} /> شارك بيانات العرض وشروطه بوضوح.
          </li>
          <li>
            <BadgeCheck size={18} /> نراجع الكوبون قبل إضافته للموقع.
          </li>
          <li>
            <BadgeCheck size={18} /> نتواصل معك إذا احتجنا تفاصيل إضافية.
          </li>
        </ul>
        <p className="submission-note">
          إرسال الطلب لا يضمن النشر. يرجى مشاركة الأكواد التي تملك صلاحية نشرها،
          وتجنب إرسال معلومات حساسة.
        </p>
        <Link className="text-link" href="/contact">
          تحتاج مساعدة؟ تواصل معنا <ArrowLeft size={16} />
        </Link>
      </aside>
      <div className="content-panel submission-panel">
        <h2>تفاصيل الكوبون</h2>
      {!available && <p role="status">استقبال الطلبات قيد الإعداد. يمكنك تجهيز تفاصيل كوبونك هنا، لكن لن يتم إرسالها حالياً.</p>}
        <p>املأ النموذج، ثم أرسل الطلب عبر قناة التواصل المتاحة.</p>
        <form
          className="support-form submission-form"
          onSubmit={(event) => {
            event.preventDefault();
            setError("");
            const data = new FormData(event.currentTarget);
            const website = String(data.get("website") || "").trim();
            try {
              const url = new URL(website);
              if (!["http:", "https:"].includes(url.protocol))
                throw new Error();
            } catch {
              setError("أدخل رابط متجر صحيحاً يبدأ بـ https:// أو http://.");
              return;
            }
            const fields = [
              ["الاسم", "name"],
              ["البريد الإلكتروني", "email"],
              ["اسم المتجر", "store"],
              ["رابط المتجر", "website"],
              ["التصنيف", "category"],
              ["كود الخصم", "code"],
              ["تفاصيل الخصم", "offer"],
              ["تاريخ الانتهاء", "expiry"],
              ["الشروط والاستثناءات", "terms"],
            ];
            setMessage(
              "طلب إضافة كوبون إلى كوبونيا\n\n" +
                fields
                  .map(
                    ([label, name]) =>
                      `${label}: ${String(data.get(name) || "غير محدد").trim()}`,
                  )
                  .join("\n"),
            );
          }}
        >
          <div className="form-row">
            <label>
              اسمك
              <input name="name" autoComplete="name" required maxLength={80} />
            </label>
            <label>
              البريد الإلكتروني
              <input
                name="email"
                type="email"
                autoComplete="email"
                dir="ltr"
                required
                maxLength={120}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              اسم المتجر
              <input name="store" required maxLength={100} />
            </label>
            <label>
              رابط المتجر
              <input
                name="website"
                type="url"
                placeholder="https://example.com"
                dir="ltr"
                required
                maxLength={200}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              التصنيف
              <select name="category" required defaultValue="">
                <option value="" disabled>
                  اختر التصنيف
                </option>
                {categories.map(([name]) => (
                  <option key={name}>{name}</option>
                ))}
                <option>أخرى</option>
              </select>
            </label>
            <label>
              كود الخصم
              <input
                name="code"
                dir="ltr"
                placeholder="SAVE20"
                required
                maxLength={60}
              />
            </label>
          </div>
          <label>
            تفاصيل الخصم
            <input
              name="offer"
              placeholder="مثال: خصم 20% على الطلب الأول"
              required
              maxLength={180}
            />
          </label>
          <label>
            تاريخ انتهاء الكوبون (اختياري)
            <input name="expiry" type="date" min={minDate} />
          </label>
          <label>
            الشروط والاستثناءات
            <textarea
              name="terms"
              rows={4}
              placeholder="الحد الأدنى للطلب، المنتجات المستثناة، وأي شروط أخرى..."
              required
              minLength={10}
              maxLength={700}
            />
          </label>
          <label className="consent-label">
            <input name="consent" type="checkbox" required />
            <span>
              أؤكد صحة المعلومات وصلاحيتي لمشاركة هذا الكوبون، وأوافق على
              التواصل معي بخصوصه. <Link href="/privacy">سياسة الخصوصية</Link>
            </span>
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="button button--primary" type="submit">
            مراجعة الطلب <ArrowLeft size={16} />
          </button>
        </form>
        {message && (
          <div className="submission-review" role="status">
            <h3>راجع طلبك قبل إرساله</h3>
            <pre>{message}</pre>
            {available ? (
              <>
                <div className="submission-actions">
                  {couponContact.email && (
                    <a className="button button--primary" href={emailHref}>
                      <Mail size={18} /> إرسال عبر البريد
                    </a>
                  )}
                  {couponContact.whatsapp && (
                    <a
                      className="button button--primary"
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle size={18} /> إرسال عبر واتساب
                    </a>
                  )}
                </div>
                <p>
                  يفتح الزر تطبيق التواصل برسالة جاهزة. أكمل الإرسال هناك؛ لم
                  يتم إرسال الطلب من هذا النموذج.
                </p>
              </>
            ) : (
              <p>قناة استقبال الكوبونات قيد الإعداد. لم يتم إرسال الطلب بعد.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
