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
          role: "student" | "admin";
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
          role?: "student" | "admin";
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
          role?: "student" | "admin";
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
      rep_requests: {
        Row: {
          id: string;
          user_id: string;
          university: string;
          status: "pending" | "approved" | "rejected";
          created_at: string;
          reviewed_at: string | null;
          reviewed_by: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          university: string;
          status?: "pending" | "approved" | "rejected";
          created_at?: string;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          university?: string;
          status?: "pending" | "approved" | "rejected";
          created_at?: string;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
        };
        Relationships: [];
      };
      conversations: {
        Row: {
          id: string;
          type: "direct" | "school";
          university: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          type?: "direct" | "school";
          university?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          type?: "direct" | "school";
          university?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      conversation_participants: {
        Row: {
          conversation_id: string;
          user_id: string;
          last_read_at: string | null;
          joined_at: string;
        };
        Insert: {
          conversation_id: string;
          user_id: string;
          last_read_at?: string | null;
          joined_at?: string;
        };
        Update: {
          conversation_id?: string;
          user_id?: string;
          last_read_at?: string | null;
          joined_at?: string;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string;
          body: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          sender_id: string;
          body: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          sender_id?: string;
          body?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      media_uploads: {
        Row: {
          id: string;
          uploader_id: string;
          title: string;
          description: string | null;
          file_url: string;
          storage_path: string;
          mime_type: string | null;
          status: "pending" | "approved" | "rejected";
          created_at: string;
          reviewed_at: string | null;
          reviewed_by: string | null;
        };
        Insert: {
          id?: string;
          uploader_id: string;
          title: string;
          description?: string | null;
          file_url: string;
          storage_path: string;
          mime_type?: string | null;
          status?: "pending" | "approved" | "rejected";
          created_at?: string;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
        };
        Update: {
          id?: string;
          uploader_id?: string;
          title?: string;
          description?: string | null;
          file_url?: string;
          storage_path?: string;
          mime_type?: string | null;
          status?: "pending" | "approved" | "rejected";
          created_at?: string;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<PropertyKey, never>; Returns: boolean };
      can_access_conversation: { Args: { conv_id: string }; Returns: boolean };
      get_or_create_direct_conversation: {
        Args: { other_user_id: string };
        Returns: string;
      };
      get_or_create_school_conversation: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
