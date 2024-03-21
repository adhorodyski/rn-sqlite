import type {Chat} from '../lib/types';

interface ChatWithLastMessage extends Chat {
  last_message: string;
  last_message_author_email: string;
}

export const getRecentChats = async () => {
  return [
    {last_message: 'placeholder', last_message_author_email: 'placeholder'},
  ];
};

export const useRecentChats = (): ChatWithLastMessage[] => {
  return [
    {
      id: 0,
      title: 'test',
      last_message: 'placeholder',
      last_message_author_email: 'placeholder',
    },
  ];
};
