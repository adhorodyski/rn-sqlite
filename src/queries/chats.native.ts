import {db} from '../lib/db.native';
import type {Chat} from '../lib/types';

interface ChatWithLastMessage extends Chat {
  last_message: string;
  last_message_author_email: string;
}

export const getRecentChats = async () => {
  const response = await db.executeAsync(
    `SELECT
        chats.id,
        chats.title,
        chats.is_vip,
        messages.content AS last_message,
        users.email AS last_message_author_email
    FROM
        chats
    JOIN (
        SELECT chat_id, MAX(created_at) AS latest_message_time
        FROM messages
        GROUP BY chat_id
    ) latest_message ON chats.id = latest_message.chat_id
    JOIN
        messages ON chats.id = messages.chat_id AND latest_message.latest_message_time = messages.created_at
    JOIN
        users ON messages.author_id = users.id
    GROUP BY chats.id
    ORDER BY latest_message.latest_message_time DESC
`,
  );
  return response.rows?._array as ChatWithLastMessage[];
};

export const getChat = async (id: number) => {
  const response = await db.executeAsync('SELECT * FROM chats');
  const chats = response.rows?._array as Chat[];
  const chat = chats.find(chat => chat.id === id);
  return chat;
};
