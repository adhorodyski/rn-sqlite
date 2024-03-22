import {db} from '../lib/db';
import type {Message} from '../lib/types';

export const getChatMessages = async (chatId: number) => {
  const response = await db.executeAsync(
    `SELECT
        json_extract(value, '$.id') AS id,
        json_extract(value, '$.chat_id') AS chat_id,
        json_extract(value, '$.author_id') AS author_id,
        json_extract(value, '$.content') AS content
    FROM kv
    WHERE key LIKE 'message_%'
    AND json_extract(value, '$.chat_id') = ?
    ORDER BY json_extract(value, '$.created_at') DESC
    `,
    [chatId],
  );
  console.log('[Query] Messages');
  return response.rows?._array as Message[];
};
