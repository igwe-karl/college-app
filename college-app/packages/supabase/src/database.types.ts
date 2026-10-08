export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          avatar_url: string | null;
          university: string | null;
          major: string | null;
          year_level: string | null;
          phone: string | null;
          bio: string | null;
          is_rep: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          avatar_url?: string | null;
          university?: string | null;
          major?: string | null;
          year_level?: string | null;
          phone?: string | null;
          bio?: string | null;
          is_rep?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          university?: string | null;
          major?: string | null;
          year_level?: string | null;
          phone?: string | null;
          bio?: string | null;
          is_rep?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      campus_events: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          event_date: string;
          event_time: string | null;
          location: string | null;
          category: string;
          organizer_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          event_date: string;
          event_time?: string | null;
          location?: string | null;
          category?: string;
          organizer_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          event_date?: string;
          event_time?: string | null;
          location?: string | null;
          category?: string;
          organizer_id?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "campus_events_organizer_id_fkey";
            columns: ["organizer_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      news_posts: {
        Row: {
          id: string;
          title: string;
          body: string | null;
          author_id: string | null;
          published_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          body?: string | null;
          author_id?: string | null;
          published_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          body?: string | null;
          author_id?: string | null;
          published_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "news_posts_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
