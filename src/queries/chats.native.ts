import {db} from '../lib/db.native';
import type {Chat} from '../lib/types';

export const getRecentChats = async () => {
  const now = performance.now();
  const response = await db.executeAsync(
    `SELECT chats.*, messages.content AS last_message 
    FROM chats 
    LEFT JOIN (
      SELECT * FROM messages ORDER BY created_at DESC
    ) messages ON chats.id = messages.chat_id
    GROUP BY chats.id`,
  );
  const end = performance.now() - now;
  console.log(`[Recent chats] took ${Math.round(end)}ms`);
  return response.rows?._array as Chat & {last_message: string}[];
};

export const getChat = async (id: number) => {
  const now = performance.now();
  const response = await db.executeAsync(
    'SELECT * FROM chats WHERE id = ? LIMIT 1',
    [id],
  );
  const end = performance.now() - now;
  console.log(`[Chat] took ${Math.round(end)}ms`);
  return response.rows?.item(0) as Chat;
};
