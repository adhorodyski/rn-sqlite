import {useMemo} from 'react';
import {useSuspenseQuery} from '@tanstack/react-query';
import {getRecentChats} from './chats';
import {getByKey} from './kv';
import {getChatMessages} from './messages';
import {chatsKeys, messagesKeys} from '../lib/keys';
import {Chat} from '../lib/types';

export const useKey = <T>(key: string) => {
  const query = useSuspenseQuery({
    queryKey: [key],
    queryFn: () => getByKey<T>(key),
  });

  return query;
};

export const useBetas = () => useKey<string[]>('betas');
export const useChat = (chatId: number) => useKey<Chat>(`chat_${chatId}`);

export const useRecentChats = () => {
  const recentChats = useSuspenseQuery({
    queryKey: chatsKeys.all,
    queryFn: getRecentChats,
    meta: {automaticRevalidationKeys: ['message_', 'user_']},
  });

  return recentChats;
};

export const useChatMessages = (chatId: number) => {
  const queryKey = useMemo(() => messagesKeys.chat(chatId), [chatId]);

  const messages = useSuspenseQuery({
    queryKey,
    queryFn: () => getChatMessages(chatId),
    meta: {automaticRevalidationKeys: ['message_']},
  });

  return messages;
};
