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
