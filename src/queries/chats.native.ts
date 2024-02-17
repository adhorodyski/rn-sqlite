import {db} from '../lib/db.native';
import type {Chat} from '../lib/types';

interface ChatWithLastMessage extends Chat {
  last_message: string;
  last_message_author_email: string;
}

export const getRecentChats = async () => {
  const now = performance.now();
  const response = await db.executeAsync(
    `SELECT
        chats.*,
        messages.content AS last_message,
        users.email AS last_message_author_email
    FROM
        chats
    LEFT JOIN
        messages ON chats.id = messages.chat_id
    LEFT JOIN
        users ON messages.author_id = users.id
    WHERE
        messages.created_at = (
            SELECT MAX(created_at)
            FROM messages
            WHERE chat_id = chats.id
        )
      GROUP BY chats.id
      ORDER BY messages.created_at DESC
`,
  );
  const end = performance.now() - now;
  console.log(`[Recent chats] took ${Math.round(end)}ms`);
  return response.rows?._array as ChatWithLastMessage[];
};

export const getChat = async (id: number) => {
  const now = performance.now();
  const response = await db.executeAsync('SELECT * FROM chats');
  const chats = response.rows?._array as Chat[];
  const chat = chats.find(chat => chat.id === id);
  const end = performance.now() - now;
  console.log(`[Chat] took ${Math.round(end)}ms (id: ${id})`);
  return chat;
};
