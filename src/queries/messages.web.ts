import {db} from '../lib/db.web';

export const getChatMessages = async (chatId: number) => {
  const messages = (
    await db.kv
      .where('key')
      .startsWith('message_')
      .and(message => message.chat_id === chatId)
      .toArray()
  ).sort((a, b) => b.created_at - a.created_at);

  console.log('[Query] Messages');
  return messages;
};
