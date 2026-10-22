-- Roles, pending reps, school/direct chat, and moderated media uploads

alter table public.profiles
  add column if not exists role text not null default 'student';

alter table public.profiles
  drop constraint if exists profiles_role_check;

alter table public.profiles
  add constraint profiles_role_check
  check (role in ('student', 'admin'));

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.protect_profile_privileged_columns()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is not null and not public.is_admin() then
    if tg_op = 'INSERT' then
      new.is_rep := false;
      new.role := 'student';
      return new;
    end if;
    new.is_rep := old.is_rep;
    new.role := old.role;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_profile_privileged_columns on public.profiles;
create trigger protect_profile_privileged_columns
  before insert or update on public.profiles
  for each row execute procedure public.protect_profile_privileged_columns();

create table if not exists public.rep_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  university text not null,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references public.profiles (id) on delete set null
);

create unique index if not exists rep_requests_one_pending_per_user
  on public.rep_requests (user_id)
  where status = 'pending';

create index if not exists rep_requests_status_idx on public.rep_requests (status, created_at desc);

alter table public.rep_requests enable row level security;

create policy "Users can view own rep requests"
  on public.rep_requests for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Users can create own pending rep requests"
  on public.rep_requests for insert
  with check (
    auth.uid() = user_id
    and status = 'pending'
  );

create policy "Admins can update rep requests"
  on public.rep_requests for update
  using (public.is_admin());

create or replace function public.on_rep_request_reviewed()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status = old.status then
    return new;
  end if;

  new.reviewed_at := now();
  new.reviewed_by := auth.uid();

  if new.status = 'approved' then
    update public.profiles
      set is_rep = true,
          university = coalesce(new.university, university)
      where id = new.user_id;
  elsif new.status = 'rejected' then
    update public.profiles
      set is_rep = false
      where id = new.user_id;
  end if;

  return new;
end;
$$;

drop trigger if exists on_rep_request_reviewed on public.rep_requests;
create trigger on_rep_request_reviewed
  before update on public.rep_requests
  for each row execute procedure public.on_rep_request_reviewed();

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  type text not null default 'direct'
    check (type in ('direct', 'school')),
  university text,
  created_at timestamptz not null default now(),
  constraint school_conversation_has_university
    check (type <> 'school' or university is not null)
);

create unique index if not exists conversations_school_university_uidx
  on public.conversations (lower(university))
  where type = 'school' and university is not null;

create table if not exists public.conversation_participants (
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  last_read_at timestamptz,
  joined_at timestamptz not null default now(),
  primary key (conversation_id, user_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  sender_id uuid not null references public.profiles (id) on delete cascade,
  body text not null check (char_length(body) between 1 and 4000),
  created_at timestamptz not null default now()
);

create index if not exists messages_conversation_created_idx
  on public.messages (conversation_id, created_at);

alter table public.conversations enable row level security;
alter table public.conversation_participants enable row level security;
alter table public.messages enable row level security;

create or replace function public.can_access_conversation(conv_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.conversations c
    left join public.profiles p on p.id = auth.uid()
    where c.id = conv_id
      and (
        public.is_admin()
        or (
          c.type = 'direct'
          and exists (
            select 1 from public.conversation_participants cp
            where cp.conversation_id = c.id and cp.user_id = auth.uid()
          )
        )
        or (
          c.type = 'school'
          and p.university is not null
          and lower(trim(p.university)) = lower(trim(c.university))
        )
      )
  );
$$;

create policy "Participants can view conversations"
  on public.conversations for select
  using (public.can_access_conversation(id));

create policy "Participants can view membership"
  on public.conversation_participants for select
  using (user_id = auth.uid() or public.can_access_conversation(conversation_id));

create policy "Participants can update own membership"
  on public.conversation_participants for update
  using (user_id = auth.uid());

create policy "Participants can read messages"
  on public.messages for select
  using (public.can_access_conversation(conversation_id));

create policy "Participants can send messages"
  on public.messages for insert
  with check (
    sender_id = auth.uid()
    and public.can_access_conversation(conversation_id)
  );

create or replace function public.get_or_create_direct_conversation(other_user_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  conv_id uuid;
  me uuid := auth.uid();
begin
  if me is null then
    raise exception 'Not authenticated';
  end if;
  if other_user_id is null or other_user_id = me then
    raise exception 'Invalid conversation partner';
  end if;
  if not exists (select 1 from public.profiles where id = other_user_id) then
    raise exception 'User not found';
  end if;

  select c.id into conv_id
  from public.conversations c
  join public.conversation_participants a
    on a.conversation_id = c.id and a.user_id = me
  join public.conversation_participants b
    on b.conversation_id = c.id and b.user_id = other_user_id
  where c.type = 'direct'
  limit 1;

  if conv_id is not null then
    return conv_id;
  end if;

  insert into public.conversations (type) values ('direct') returning id into conv_id;
  insert into public.conversation_participants (conversation_id, user_id)
  values (conv_id, me), (conv_id, other_user_id);
  return conv_id;
end;
$$;

create or replace function public.get_or_create_school_conversation()
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  conv_id uuid;
  me uuid := auth.uid();
  uni text;
begin
  if me is null then
    raise exception 'Not authenticated';
  end if;

  select university into uni from public.profiles where id = me;
  if uni is null or length(trim(uni)) < 2 then
    raise exception 'Add your university on your profile to join the school chat';
  end if;

  select id into conv_id
  from public.conversations
  where type = 'school' and lower(trim(university)) = lower(trim(uni))
  limit 1;

  if conv_id is not null then
    insert into public.conversation_participants (conversation_id, user_id)
    values (conv_id, me)
    on conflict do nothing;
    return conv_id;
  end if;

  insert into public.conversations (type, university)
  values ('school', trim(uni))
  returning id into conv_id;

  insert into public.conversation_participants (conversation_id, user_id)
  values (conv_id, me)
  on conflict do nothing;

  return conv_id;
end;
$$;

grant execute on function public.is_admin() to authenticated;
grant execute on function public.can_access_conversation(uuid) to authenticated;
grant execute on function public.get_or_create_direct_conversation(uuid) to authenticated;
grant execute on function public.get_or_create_school_conversation() to authenticated;

create table if not exists public.media_uploads (
  id uuid primary key default gen_random_uuid(),
  uploader_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  description text,
  file_url text not null,
  storage_path text not null,
  mime_type text,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references public.profiles (id) on delete set null
);

create index if not exists media_uploads_status_idx on public.media_uploads (status, created_at desc);

alter table public.media_uploads enable row level security;

create policy "Approved media is public; owners and admins see all theirs"
  on public.media_uploads for select
  using (
    status = 'approved'
    or uploader_id = auth.uid()
    or public.is_admin()
  );

create policy "Authenticated users can submit media"
  on public.media_uploads for insert
  with check (
    auth.uid() = uploader_id
    and status = 'pending'
  );

create policy "Admins can review media"
  on public.media_uploads for update
  using (public.is_admin());

create or replace function public.on_media_reviewed()
returns trigger
language plpgsql
as $$
begin
  if new.status is distinct from old.status then
    new.reviewed_at := now();
    new.reviewed_by := auth.uid();
  end if;
  return new;
end;
$$;

drop trigger if exists on_media_reviewed on public.media_uploads;
create trigger on_media_reviewed
  before update on public.media_uploads
  for each row execute procedure public.on_media_reviewed();

insert into storage.buckets (id, name, public)
values ('media-uploads', 'media-uploads', true)
on conflict (id) do nothing;

drop policy if exists "Authenticated users can upload campus media" on storage.objects;
create policy "Authenticated users can upload campus media"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'media-uploads'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Public can read campus media" on storage.objects;
create policy "Public can read campus media"
  on storage.objects for select
  using (bucket_id = 'media-uploads');

drop policy if exists "Owners can update own campus media" on storage.objects;
create policy "Owners can update own campus media"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'media-uploads'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  wants_rep boolean;
  uni text;
begin
  insert into public.profiles (
    id,
    display_name,
    avatar_url,
    university,
    major,
    year_level,
    phone,
    bio,
    is_rep,
    role
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', new.raw_user_meta_data ->> 'full_name'),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', new.raw_user_meta_data ->> 'picture'),
    new.raw_user_meta_data ->> 'university',
    new.raw_user_meta_data ->> 'major',
    new.raw_user_meta_data ->> 'year_level',
    new.raw_user_meta_data ->> 'phone',
    new.raw_user_meta_data ->> 'bio',
    false,
    'student'
  );

  wants_rep := coalesce(
    (new.raw_user_meta_data ->> 'requested_rep')::boolean,
    (new.raw_user_meta_data ->> 'is_rep')::boolean,
    false
  );
  uni := nullif(trim(coalesce(
    new.raw_user_meta_data ->> 'rep_university',
    new.raw_user_meta_data ->> 'university',
    ''
  )), '');

  if wants_rep and uni is not null then
    insert into public.rep_requests (user_id, university, status)
    values (new.id, uni, 'pending');
  end if;

  return new;
end;
$$;

do $$
begin
  alter publication supabase_realtime add table public.messages;
exception
  when duplicate_object then null;
end $$;
