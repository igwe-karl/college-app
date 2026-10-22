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
