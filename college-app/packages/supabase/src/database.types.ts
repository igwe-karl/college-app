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
          created_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
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
