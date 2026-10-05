-- Run once after schema.sql. Public logos; only existing Coponya admins can upload.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('store-logos','store-logos',true,2097152,array['image/png']);
create policy "Coponya admins upload store logos" on storage.objects
for insert to authenticated with check (
 bucket_id='store-logos'
 and name ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}[.]png$'
 and exists(select 1 from public.admin_users where user_id=(select auth.uid()))
);
