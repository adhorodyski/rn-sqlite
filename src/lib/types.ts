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

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ChatWithLastMessage extends Chat {
  last_message: string;
  last_message_author_email: string;
}
