import type { Coupon } from "./catalog";
export const stores = [
  {
    name: "متجر ألف",
    initial: "أ",
    count: "12 كوبون",
    discount: "25%",
    tone: "olive",
  },
  {
    name: "رحلة",
    initial: "ر",
    count: "8 كوبونات",
    discount: "30%",
    tone: "apricot",
  },
  {
    name: "نمط",
    initial: "ن",
    count: "15 كوبون",
    discount: "20%",
    tone: "ink",
  },
  {
    name: "بيت وورد",
    initial: "ب",
    count: "6 كوبونات",
    discount: "18%",
    tone: "mint",
  },
  {
    name: "سلة يومية",
    initial: "س",
    count: "9 كوبونات",
    discount: "15%",
    tone: "sand",
  },
];

export const coupons: Coupon[] = [
  {
    category: "إلكترونيات",
    store: "متجر ألف",
    initial: "أ",
    title: "خصم إضافي على طلبك",
    description: "استخدم الكود واحصل على خصم إضافي على المنتجات المختارة",
    discount: "20%",
    code: "SAVE20",
    uses: "1,250 شخص",
    state: "featured",
    tone: "olive",
    verified: "تم التحقق اليوم",
  },
  {
    category: "السفر",
    store: "رحلة",
    initial: "ر",
    title: "خصم على حجوزاتك القادمة",
    description: "وفر أكثر عند حجز رحلتك التالية مع العرض المميز",
    discount: "30%",
    code: "TRAVEL30",
    uses: "864 شخص",
    state: "exclusive",
    tone: "apricot",
    verified: "كود موثوق",
  },
  {
    category: "أزياء",
    store: "نمط",
    initial: "ن",
    title: "خصم على القطع الجديدة",
    description: "تسوق مجموعتك المفضلة بخصم إضافي لفترة محدودة",
    discount: "15%",
    code: "STYLE15",
    uses: "532 شخص",
    state: "soon",
    tone: "ink",
    verified: "ينتهي قريباً",
  },
];

export const categories = [
  ["أزياء", "124 عرض", "✦"],
  ["إلكترونيات", "88 عرض", "◈"],
  ["توصيل الطعام", "64 عرض", "⌁"],
  ["السفر", "42 عرض", "↗"],
  ["الجمال والعناية", "71 عرض", "✧"],
  ["المنزل", "58 عرض", "⌂"],
  ["الأطفال", "36 عرض", "○"],
  ["الرياضة", "29 عرض", "◒"],
];

export const deals = [
  {
    brand: "متجر ألف",
    title: "اختيارات الموسم بخصم يصل إلى",
    discount: "25%",
    oldPrice: "249 ر.س",
    newPrice: "186 ر.س",
    tone: "olive",
  },
  {
    brand: "رحلة",
    title: "خطط لرحلتك القادمة بسعر أذكى",
    discount: "30%",
    oldPrice: "890 ر.س",
    newPrice: "623 ر.س",
    tone: "apricot",
  },
  {
    brand: "بيت وورد",
    title: "لمسات صغيرة تغيّر بيتك",
    discount: "18%",
    oldPrice: "180 ر.س",
    newPrice: "147 ر.س",
    tone: "mint",
  },
];
