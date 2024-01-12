import {db} from '../lib/db.native';
import {Message} from '../lib/types';

export const getChatMessages = async (chatId: number) => {
  const response = await db.executeAsync(
    'SELECT * FROM messages WHERE chat_id = ?',
    [chatId],
  );
  return response.rows?._array as Message[];
};
