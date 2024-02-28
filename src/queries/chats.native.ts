import {db} from '../lib/db.native';
import type {Chat} from '../lib/types';

interface ChatWithLastMessage extends Chat {
  last_message: string;
  last_message_author_email: string;
}

// TODO rewrite from relational to KV
export const getRecentChats = async () => {
  const now = performance.now();
  const response = await db.executeAsync(
    `SELECT json(value) AS value FROM kv
    WHERE key LIKE 'chat_%'`,
  );
  const end = performance.now() - now;
  console.log(`[Recent chats] took ${Math.round(end)}ms`);
  const chats = response.rows?._array.map(i => JSON.parse(i.value));
  return chats?.map(chat => ({
    ...chat,
    last_message: 'test',
    last_message_author_email: 'author@mail.com',
  })) as ChatWithLastMessage[];
};

export const getChat = async (id: number) => {
  const now = performance.now();
  const response = await db.executeAsync(
    `SELECT json(value) AS value FROM kv
    WHERE key LIKE 'chat_%'
    AND json_extract(value, '$.id') = ?
    LIMIT 1`,
    [id],
  );
  const end = performance.now() - now;
  console.log(`[Chat] took ${Math.round(end)}ms (id: ${id})`);
  const chat = response.rows?._array[0].value;
  return JSON.parse(chat) as Chat;
};
