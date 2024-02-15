export interface Chat {
  id: number;
  title: string;
}

export interface Message {
  id: number;
  chat_id: number;
  author_id: number;
  content: string;
}

export interface FeatureConfig {
  name: string;
  is_enabled: boolean;
}
