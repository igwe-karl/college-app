-- Extended profile fields
alter table public.profiles
  add column if not exists university text,
  add column if not exists major text,
  add column if not exists year_level text,
  add column if not exists phone text,
  add column if not exists bio text;

-- Campus events
create table if not exists public.campus_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date date not null,
  event_time text,
  location text,
  category text not null default 'social'
    check (category in ('social', 'academic', 'media', 'sports')),
  organizer_id uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists campus_events_event_date_idx on public.campus_events (event_date desc);

alter table public.campus_events enable row level security;

create policy "Events are viewable by everyone"
  on public.campus_events for select
  using (true);

create policy "Authenticated users can create events"
  on public.campus_events for insert
  with check (auth.uid() = organizer_id);

create policy "Organizers can update own events"
  on public.campus_events for update
  using (auth.uid() = organizer_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    display_name,
    avatar_url,
    university,
    major,
    year_level,
    phone,
    bio
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', new.raw_user_meta_data ->> 'full_name'),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', new.raw_user_meta_data ->> 'picture'),
    new.raw_user_meta_data ->> 'university',
    new.raw_user_meta_data ->> 'major',
    new.raw_user_meta_data ->> 'year_level',
    new.raw_user_meta_data ->> 'phone',
    new.raw_user_meta_data ->> 'bio'
  );
  return new;
end;
$$;
