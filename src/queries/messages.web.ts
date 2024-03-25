import {db} from '../lib/db.web';

export const getChatMessages = async (chatId: number) => {
  const messages = await db.kv
    .toCollection()
    .filter(msg => msg.chat_id === chatId)
    .toArray();

  const sortedMessages = messages.sort((a, b) =>
    a.created_at > b.created_at ? -1 : 1,
  );

  console.log('[Query] Messages');
  return sortedMessages;
};
