-- Run once in the Supabase SQL editor. No demo coupons are seeded.
begin;
create table public.admin_users (user_id uuid primary key references auth.users(id) on delete cascade);
alter table public.admin_users enable row level security;
revoke all on public.admin_users from anon, authenticated;
grant select on public.admin_users to authenticated;
create policy "Admins can read their own membership" on public.admin_users for select to authenticated using (user_id = auth.uid());
create table public.stores (
 id uuid primary key default gen_random_uuid(), name text not null unique check(length(name) between 1 and 120),
 initial text not null check(length(initial) between 1 and 3), tone text not null default 'olive' check(tone in ('olive','apricot','ink','mint','sand')),
 website_url text not null check(website_url ~ '^https://[^[:space:]]+$'), active boolean not null default false,
 created_at timestamptz not null default now()
);
create table public.coupons (
 id uuid primary key default gen_random_uuid(), store_id uuid not null references public.stores(id) on delete restrict,
 title text not null check(length(title) between 1 and 160), description text not null default '' check(length(description) <= 2000),
 discount text not null check(discount ~ '^(100|[0-9]{1,2})(\.[0-9]{1,2})?%$' and replace(discount,'%','')::numeric <= 100),
 code text not null unique check(length(code) between 1 and 80 and code !~ '[[:space:]]'), category text not null,
 terms text not null check(length(terms) between 1 and 3000), expires_at date, published boolean not null default false,
 verified_at timestamptz, created_at timestamptz not null default now()
);
create index coupons_store_idx on public.coupons(store_id);
alter table public.stores enable row level security;
alter table public.coupons enable row level security;
revoke all on public.stores, public.coupons from anon, authenticated;
grant select on public.stores, public.coupons to anon;
grant select, insert, update, delete on public.stores, public.coupons to authenticated;
create policy "Public active stores" on public.stores for select to anon, authenticated using(active);
create policy "Public published unexpired coupons" on public.coupons for select to anon, authenticated using (
 published and (expires_at is null or expires_at >= (now() at time zone 'Asia/Riyadh')::date)
 and exists(select 1 from public.stores where id = store_id and active)
);
create policy "Admin stores" on public.stores for all to authenticated using(exists(select 1 from public.admin_users where user_id = auth.uid())) with check(exists(select 1 from public.admin_users where user_id = auth.uid()));
create policy "Admin coupons" on public.coupons for all to authenticated using(exists(select 1 from public.admin_users where user_id = auth.uid())) with check(exists(select 1 from public.admin_users where user_id = auth.uid()));
alter table public.stores
 add column summary text not null default '' check(length(summary)<=300),
 add column about text not null default '' check(length(about)<=12000),
 add column products text not null default '' check(length(products)<=4000),
 add column shipping text not null default '' check(length(shipping)<=4000),
 add column payment text not null default '' check(length(payment)<=4000),
 add column returns_policy text not null default '' check(length(returns_policy)<=4000),
 add column faq text not null default '' check(length(faq)<=4000),
 add column logo_url text not null default '' check(logo_url='' or (length(logo_url)<=2048 and logo_url ~ '^https://[^[:space:]]+$'));
commit;
