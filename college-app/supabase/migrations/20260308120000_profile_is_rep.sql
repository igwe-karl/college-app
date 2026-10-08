alter table public.profiles
  add column if not exists is_rep boolean not null default false;

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
    bio,
    is_rep
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
    coalesce((new.raw_user_meta_data ->> 'is_rep')::boolean, false)
  );
  return new;
end;
$$;
