-- Apply after schema.sql and store-profiles.sql, BEFORE deploying this PR.
-- Additive, repeatable; existing content and row-level policies are preserved.
begin;
alter table public.stores
  add column if not exists seo_title text not null default '' check (length(seo_title) <= 120),
  add column if not exists meta_description text not null default '' check (length(meta_description) <= 300),
  add column if not exists primary_keyword text not null default '' check (length(primary_keyword) <= 160),
  add column if not exists supporting_keywords text not null default '' check (length(supporting_keywords) <= 4000),
  add column if not exists long_tail_keywords text not null default '' check (length(long_tail_keywords) <= 4000),
  add column if not exists article_ideas text not null default '' check (length(article_ideas) <= 4000);
notify pgrst, 'reload schema';
commit;

-- Verification (run separately):
-- select seo_title, meta_description, primary_keyword, supporting_keywords,
--        long_tail_keywords, article_ideas from public.stores limit 1;
