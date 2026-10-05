/* سوق الضوء: readable RTL administration with explicit publish controls. */
import { useState } from "react";
import { Link } from "wouter";
import { BackendError, backendConfigured, backendRequest, type StoreRecord, type CouponRecord } from "@/lib/backend";
import { categories } from "@/lib/data";
import { useCatalog } from "@/contexts/CatalogContext";
const blankStore = { id: "", name: "", initial: "", tone: "olive", website_url: "", active: false };
const blankCoupon = { id: "", store_id: "", title: "", description: "", discount: "10%", code: "", category: categories[0][0], terms: "", expires_at: "", published: false, verified_at: null as string | null };
export default function Admin() {
  const { reload } = useCatalog();
  const [token, setToken] = useState("");
  const [stores, setStores] = useState<StoreRecord[]>([]);
  const [coupons, setCoupons] = useState<CouponRecord[]>([]);
  const [store, setStore] = useState(blankStore);
  const [coupon, setCoupon] = useState(blankCoupon);
  const [tab, setTab] = useState("stores");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  async function load(accessToken: string) {
    const [s,c] = await Promise.all([backendRequest<StoreRecord[]>("/rest/v1/stores?select=*&order=name", {token:accessToken}), backendRequest<CouponRecord[]>("/rest/v1/coupons?select=*&order=created_at.desc", {token:accessToken})]);
    setStores(s); setCoupons(c); reload();
  }
  async function run(action: () => Promise<void>) { setBusy(true); setNotice(""); try { await action(); } catch(e) { if(e instanceof BackendError && e.status === 401) { setToken(""); setStores([]); setCoupons([]); } setNotice(e instanceof Error ? e.message : "تعذر تنفيذ الإجراء."); } finally { setBusy(false); } }
  return <section className="catalog-page container admin-page" dir="rtl">
    <Link href="/" className="text-link">العودة إلى كوبونيا</Link>
    <div className="page-heading"><span className="eyebrow">إدارة المحتوى</span><h1>لوحة إدارة كوبونيا</h1><p>أضف المتاجر والكوبونات، وراجع التفاصيل قبل نشرها.</p></div>
    {!backendConfigured ? <div className="content-panel"><h2>ربط قاعدة البيانات قيد الإعداد</h2><p>اللوحة جاهزة للربط. يلزم إعداد مشروع Supabase وحساب المدير لتفعيل الحفظ والنشر.</p></div> : !token ? <form className="content-panel support-form" onSubmit={e => {e.preventDefault(); const f = new FormData(e.currentTarget); const email=String(f.get("email")); const password=String(f.get("password")); e.currentTarget.reset(); void run(async()=>{
      const session = await backendRequest<{access_token:string; user:{id:string}}>("/auth/v1/token?grant_type=password", {method:"POST",body:{email,password}});
      try {
        const membership = await backendRequest<{user_id:string}[]>(`/rest/v1/admin_users?select=user_id&user_id=eq.${encodeURIComponent(session.user.id)}`,{token:session.access_token});
        if (!membership.length) throw new Error("هذا الحساب غير مخوّل لإدارة الموقع.");
        await load(session.access_token); setToken(session.access_token);
      } catch(error) { await backendRequest("/auth/v1/logout",{method:"POST",token:session.access_token}).catch(()=>{}); throw error; }
    });}}><h2>تسجيل دخول الإدارة</h2><label>البريد الإلكتروني<input name="email" type="email" dir="ltr" required autoComplete="username" /></label><label>كلمة المرور<input name="password" type="password" required autoComplete="current-password" /></label><button disabled={busy} className="button button--primary">{busy?"جارٍ الدخول…":"تسجيل الدخول"}</button><p>الجلسة مؤقتة في هذه الصفحة؛ بعد إعادة تحميلها يلزم تسجيل الدخول مجدداً.</p></form> : <>
      <div className="admin-toolbar"><button className="button button--outline" aria-pressed={tab==="stores"} onClick={()=>setTab("stores")}>المتاجر ({stores.length})</button><button className="button button--outline" aria-pressed={tab==="coupons"} onClick={()=>setTab("coupons")}>الكوبونات ({coupons.length})</button><button disabled={busy} className="button button--outline" onClick={()=>void run(async()=>{try { await backendRequest("/auth/v1/logout",{method:"POST",token}); } finally { setToken("");setStores([]);setCoupons([]); }})}>تسجيل الخروج</button></div>
      <div className="admin-layout">
      {tab==="stores" ? <>
        <form className="content-panel support-form" onSubmit={e=>{e.preventDefault();void run(async()=>{ const {id,...body}=store; const url = new URL(body.website_url); if(url.protocol!=="https:" || url.username || url.password) throw new Error("استخدم رابط متجر آمن يبدأ بـ https:// بدون بيانات دخول."); await backendRequest(`/rest/v1/stores${id?`?id=eq.${id}`:""}`,{method:id?"PATCH":"POST",token,body});setStore(blankStore);await load(token);setNotice("تم حفظ المتجر.");});}}>
          <h2>{store.id?"تعديل المتجر":"متجر جديد"}</h2>
          <label>اسم المتجر<input value={store.name} required maxLength={120} onChange={e=>setStore({...store,name:e.target.value})}/></label>
          <label>الحرف المختصر<input value={store.initial} required maxLength={3} onChange={e=>setStore({...store,initial:e.target.value})}/></label>
          <label>رابط المتجر<input value={store.website_url} type="url" dir="ltr" required pattern="https://.*" onChange={e=>setStore({...store,website_url:e.target.value})}/></label>
          <label>لون البطاقة<select value={store.tone} onChange={e=>setStore({...store,tone:e.target.value})}>{["olive","apricot","ink","mint","sand"].map(t=><option key={t}>{t}</option>)}</select></label>
          <label className="admin-checkbox"><input type="checkbox" checked={store.active} onChange={e=>setStore({...store,active:e.target.checked})}/>إظهار المتجر للزوار</label>
          <button disabled={busy} className="button button--primary">حفظ المتجر</button><button type="button" className="text-link" onClick={()=>setStore(blankStore)}>إلغاء التعديل</button>
        </form>
        <div className="admin-list">{!stores.length&&<p>لا توجد متاجر بعد. أضف أول متجر.</p>}{stores.map(s=><article className="content-panel" key={s.id}><h2>{s.name}</h2><p>{s.active?"ظاهر للزوار":"مخفي"}</p><button className="button button--outline" onClick={()=>setStore(s)}>تعديل</button></article>)}</div>
      </> : <>
        <form className="content-panel support-form" onSubmit={e=>{e.preventDefault();void run(async()=>{const {id,...values}=coupon;if(!stores.some(s=>s.id===values.store_id)) throw new Error("اختر متجراً أولاً."); if(!/^(100|\d{1,2})(\.\d{1,2})?%$/.test(values.discount)||parseFloat(values.discount)>100) throw new Error("أدخل نسبة صحيحة بين 0% و100%."); const body={...values,expires_at:values.expires_at||null}; await backendRequest(`/rest/v1/coupons${id?`?id=eq.${id}`:""}`,{method:id?"PATCH":"POST",token,body});setCoupon(blankCoupon);await load(token);setNotice("تم حفظ الكوبون.");});}}>
          <h2>{coupon.id?"تعديل الكوبون":"كوبون جديد"}</h2>
          <label>المتجر<select required value={coupon.store_id} onChange={e=>setCoupon({...coupon,store_id:e.target.value})}><option value="">اختر المتجر</option>{stores.map(s=><option key={s.id} value={s.id}>{s.name}{s.active?"":" (مخفي)"}</option>)}</select></label>
          <label>العنوان<input required maxLength={160} value={coupon.title} onChange={e=>setCoupon({...coupon,title:e.target.value})}/></label>
          <label>وصف العرض<textarea rows={3} maxLength={2000} value={coupon.description} onChange={e=>setCoupon({...coupon,description:e.target.value})}/></label>
          <label>كود الخصم<input required maxLength={80} pattern="\S+" dir="ltr" value={coupon.code} onChange={e=>setCoupon({...coupon,code:e.target.value})}/></label>
          <label>نسبة الخصم — مثال 20%<input required dir="ltr" value={coupon.discount} onChange={e=>setCoupon({...coupon,discount:e.target.value})}/></label>
          <label>التصنيف<select value={coupon.category} onChange={e=>setCoupon({...coupon,category:e.target.value})}>{categories.map(c=><option key={c[0]}>{c[0]}</option>)}</select></label>
          <label>الشروط والاستثناءات<textarea required rows={4} maxLength={3000} value={coupon.terms} onChange={e=>setCoupon({...coupon,terms:e.target.value})}/></label>
          <label>تاريخ الانتهاء — اختياري<input type="date" value={coupon.expires_at} onChange={e=>setCoupon({...coupon,expires_at:e.target.value})}/></label>
          <label className="admin-checkbox"><input type="checkbox" checked={!!coupon.verified_at} onChange={e=>setCoupon({...coupon,verified_at:e.target.checked?new Date().toISOString():null})}/>راجعت الكود وشروطه فعلياً</label>
          <label className="admin-checkbox"><input type="checkbox" checked={coupon.published} onChange={e=>setCoupon({...coupon,published:e.target.checked})}/>نشر الكوبون للزوار</label>
          <p>الكوبون المنتهي أو التابع لمتجر مخفي لا يظهر للزوار.</p>
          <button disabled={busy||!stores.length} className="button button--primary">حفظ الكوبون</button><button type="button" className="text-link" onClick={()=>setCoupon(blankCoupon)}>إلغاء التعديل</button>
        </form>
        <div className="admin-list">{!coupons.length&&<p>لا توجد كوبونات بعد.</p>}{coupons.map(c=><article className="content-panel" key={c.id}><h2>{c.title}</h2><p>{stores.find(s=>s.id===c.store_id)?.name} · {c.published?"محدد للنشر":"مسودة"}</p><p dir="ltr">{c.code} · {c.discount}</p><button className="button button--outline" onClick={()=>setCoupon({...c,expires_at:c.expires_at||""})}>تعديل</button></article>)}</div>
      </>}
      </div>
    </>}
    {notice&&<p className="admin-notice" role="status">{notice}</p>}
  </section>;
}
