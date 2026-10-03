export type Profile = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type NewsPost = {
  id: string;
  title: string;
  body: string | null;
  author_id: string | null;
  published_at: string;
};
