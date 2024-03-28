import {db} from '../lib/db.web';
import type {ChatWithLastMessage} from '../lib/types';

export const getRecentChats = async () => {
  const chats = await db.kv.where(':id').startsWith('chat_').toArray();

  const chatsWithLastMessage = await Promise.all(
    chats.map(async chat => {
      const messages = await db.kv
        .where(':id')
        .startsWith('message_')
        .filter(msg => msg.chat_id === chat.id)
        .toArray();

      const lastMessage = messages.sort((a, b) =>
        a.created_at > b.created_at ? -1 : 1,
      )[0];

      const lastMessageAuthor = await db.kv.get(
        `user_${lastMessage.author_id}`,
      );

      return {
        id: chat.id,
        title: chat.title,
        last_message: lastMessage.content,
        last_message_author_email: lastMessageAuthor.email,
      };
    }),
  );

  return chatsWithLastMessage as ChatWithLastMessage[];
};
