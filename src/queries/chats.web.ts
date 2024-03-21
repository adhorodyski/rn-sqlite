import {useSuspenseQuery} from '@tanstack/react-query';
import type {Chat} from '../lib/types';
import {chatsKeys} from '../lib/keys';

interface ChatWithLastMessage extends Chat {
  last_message: string;
  last_message_author_email: string;
}

export const getRecentChats = async () => {
  return Promise.resolve([
    {
      id: 0,
      title: 'test',
      last_message: 'placeholder',
      last_message_author_email: 'placeholder',
    },
  ] as ChatWithLastMessage[]);
};

export const useRecentChats = () => {
  const recentChats = useSuspenseQuery({
    queryKey: chatsKeys.all,
    queryFn: getRecentChats,
  });

  return recentChats;
};
