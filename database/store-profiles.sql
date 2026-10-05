-- Upgrade existing Coponya stores. Run once. Existing content and RLS remain intact.
alter table public.stores
 add column summary text not null default '' check(length(summary)<=300),
 add column about text not null default '' check(length(about)<=12000),
 add column products text not null default '' check(length(products)<=4000),
 add column shipping text not null default '' check(length(shipping)<=4000),
 add column payment text not null default '' check(length(payment)<=4000),
 add column returns_policy text not null default '' check(length(returns_policy)<=4000),
 add column faq text not null default '' check(length(faq)<=4000),
 add column logo_url text not null default '' check(logo_url='' or (length(logo_url)<=2048 and logo_url ~ '^https://[^[:space:]]+$'));
