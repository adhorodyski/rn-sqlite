export interface Chat {
  id: number;
  title: string;
}

export interface Message {
  id: number;
  chat_id: number;
  author_id: number;
  content: string;
  created_at: string;
}

export interface FeatureConfig {
  name: string;
  is_enabled: boolean;
}
