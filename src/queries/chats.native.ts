import {db} from '../lib/db.native';
import type {Chat} from '../lib/types';

interface ChatWithLastMessage extends Chat {
  last_message: string;
  last_message_author_email: string;
  last_message_time: string;
}

export const getRecentChats = async () => {
  const response = await db.executeAsync(
    `SELECT
        chats.id,
        chats.title,
        chats.is_vip,
        messages.content AS last_message,
        last_message.last_message_time,
        users.email AS last_message_author_email
    FROM
        chats
    JOIN (
        SELECT chat_id, MAX(created_at) AS last_message_time
        FROM messages
        GROUP BY chat_id
    ) last_message ON chats.id = last_message.chat_id
    JOIN
        messages ON chats.id = messages.chat_id AND last_message.last_message_time = messages.created_at
    JOIN
        users ON messages.author_id = users.id
    GROUP BY chats.id
    ORDER BY last_message.last_message_time DESC
`,
  );

  const chats = response.rows?._array as ChatWithLastMessage[];

  const vipChats = chats
    .sort((a, b) => {
      return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    })
    .filter(chat => chat.is_vip);

  const restChats = chats
    .sort((a, b) => {
      return a.last_message_time > b.last_message_time ? -1 : 1;
    })
    .filter(chat => !chat.is_vip);

  return [...vipChats, ...restChats];
};

export const getChat = async (id: number) => {
  const response = await db.executeAsync('SELECT * FROM chats');
  const chats = response.rows?._array as Chat[];
  const chat = chats.find(chat => chat.id === id);
  return chat;
};
