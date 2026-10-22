export type DirectoryProfile = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  university: string | null;
  is_rep: boolean;
};

export type ChatConversation = {
  id: string;
  type: "direct" | "school";
  university: string | null;
  created_at: string;
};

export type ChatMessage = {
  id: string;
  conversation_id: string;
  sender_id: string;
  body: string;
  created_at: string;
};
