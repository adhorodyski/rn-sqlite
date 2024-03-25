import {db} from '../lib/db.web';
import type {ChatWithLastMessage} from '../lib/types';

// TODO: Implement using Dexie
export const getRecentChats = async () => {
  // const chats = await db.kv.where('key').startsWith('chat_').toArray();
  // const recentMessages = await db.kv
  //   .where('key')
  //   .startsWith('message_')
  //   .toArray();

  // console.log(chats);

  return Promise.resolve([
    {
      id: 0,
      title: 'test',
      last_message: 'placeholder',
      last_message_author_email: 'placeholder',
    },
  ] as ChatWithLastMessage[]);
};
