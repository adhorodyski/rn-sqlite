import {db} from '../lib/db.native';
import {Message} from '../lib/types';

export const getChatMessages = async (chatId: number) => {
  const now = performance.now();
  const response = await db.executeAsync(
    `SELECT json(value) AS value FROM kv
    WHERE key LIKE 'message_%'
    AND json_extract(value, '$.chat_id') = ?
    ORDER BY json_extract(value, '$.created_at') DESC
    `,
    [chatId],
  );
  const end = performance.now() - now;
  console.log(`[Messages] took ${Math.round(end)}ms (chat_id: ${chatId})`);
  const messages = response.rows?._array.map(i => JSON.parse(i.value));
  return messages as Message[];
};
