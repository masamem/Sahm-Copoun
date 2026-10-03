export type Coupon = {
  store: string;
  initial: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  uses: string;
  state: string;
  tone: string;
  verified: string;
  category: string;
};
export function normalizeSearch(value: string) {
  return value
    .normalize("NFKC")
    .replace(/[\u064B-\u065F\u0670ـ]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .toLowerCase()
    .trim();
}
export function matchesSearch(value: string, query: string) {
  return normalizeSearch(value).includes(normalizeSearch(query));
}
export function readSaved<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}
export function saveLocal(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
