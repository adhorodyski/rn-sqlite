import {useMemo} from 'react';
import {messagesKeys} from '../lib/keys';
import {useSuspenseQuery} from '@tanstack/react-query';

// TODO - This is a stub. Implement the getChatMessages query.
export const getChatMessages = async (chatId: number) => {
  return Promise.resolve([
    {id: 0, chat_id: chatId, author_id: 2, content: 'test chat content'},
  ]);
};

export const useChatMessages = (chatId: number) => {
  const queryKey = useMemo(() => messagesKeys.chat(chatId), [chatId]);

  const messages = useSuspenseQuery({
    queryKey,
    queryFn: () => getChatMessages(chatId),
  });

  return messages;
};
