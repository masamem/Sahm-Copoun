import { describe, expect, it } from "vitest";
import { mapCatalog } from "./liveCatalog";
import type { CouponRecord, StoreRecord } from "./backend";
const store: StoreRecord = { id:"active",name:"متجر",initial:"م",tone:"olive",website_url:"https://example.com",active:true };
const coupon: CouponRecord = { id:"1",store_id:store.id,title:"خصم",description:"عرض",discount:"20%",code:"SAVE",category:"أزياء",terms:"الحد الأدنى 100 ريال",expires_at:"2026-10-05",published:true,verified_at:null };
describe("public catalog",()=>{
  it("excludes drafts, expired coupons, inactive and missing stores",()=>{
    const result=mapCatalog([store,{...store,id:"hidden",active:false}],[coupon,{...coupon,id:"2",code:"DRAFT",published:false},{...coupon,id:"3",code:"OLD",expires_at:"2026-10-04"},{...coupon,id:"4",code:"HIDDEN",store_id:"hidden"},{...coupon,id:"5",code:"MISSING",store_id:"missing"}],"2026-10-05");
    expect(result.coupons.map(c=>c.code)).toEqual(["SAVE"]); expect(result.stores).toHaveLength(1);
  });
  it("includes expiry day and coupons without expiry, and preserves actual terms and links",()=>{
    const result=mapCatalog([store],[coupon,{...coupon,id:"2",code:"OPEN",expires_at:null}],"2026-10-05");
    expect(result.coupons).toHaveLength(2);expect(result.coupons[0]).toMatchObject({isDemo:false,terms:coupon.terms,websiteUrl:store.website_url,verifiedAt:null});
  });
  it("preserves store profile content and keeps older stores compatible",()=>{
    const profile=mapCatalog([{...store,summary:"نبذة",about:"تفاصيل",products:"منتجات",shipping:"شحن",payment:"دفع",returns_policy:"استرجاع",faq:"سؤال\nإجابة",logo_url:"https://example.com/logo.png"}],[],"2026-10-05").stores[0];
    expect(profile).toMatchObject({summary:"نبذة",about:"تفاصيل",returnsPolicy:"استرجاع",faq:"سؤال\nإجابة",websiteUrl:store.website_url,logoUrl:"https://example.com/logo.png"});
    expect(mapCatalog([store],[],"2026-10-05").stores[0].about).toBe("");
  });
  it("does not substitute demo data for an empty real catalog",()=>expect(mapCatalog([],[],"2026-10-05")).toEqual({stores:[],coupons:[]}));
  it("calculates advertised discounts only from eligible coupons",()=>expect(mapCatalog([store],[coupon,{...coupon,discount:"90%",published:false}],"2026-10-05").stores[0].discount).toBe("20%"));
});
