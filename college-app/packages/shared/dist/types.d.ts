export type Profile = {
    id: string;
    display_name: string | null;
    avatar_url: string | null;
    university: string | null;
    major: string | null;
    year_level: string | null;
    phone: string | null;
    bio: string | null;
    created_at: string;
};
export type NewsPost = {
    id: string;
    title: string;
    body: string | null;
    author_id: string | null;
    published_at: string;
};
export type CampusEvent = {
    id: string;
    title: string;
    description: string | null;
    event_date: string;
    event_time: string | null;
    location: string | null;
    category: "social" | "academic" | "media" | "sports";
    organizer_id: string | null;
    created_at: string;
};
//# sourceMappingURL=types.d.ts.map