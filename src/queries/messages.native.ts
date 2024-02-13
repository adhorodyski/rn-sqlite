import {db} from '../lib/db.native';
import {Message} from '../lib/types';

export const getChatMessages = async (chatId: number) => {
  const now = performance.now();
  const response = await db.executeAsync(
    'SELECT * FROM messages WHERE chat_id = ? ORDER BY created_at DESC',
    [chatId],
  );
  const end = performance.now() - now;
  console.log(`[Messages] took ${Math.round(end)}ms (chat_id: ${chatId})`);
  return response.rows?._array as Message[];
};
