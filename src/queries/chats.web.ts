import type {ChatWithLastMessage} from '../lib/types';

export const getRecentChats = async () => {
  return Promise.resolve([
    {
      id: 0,
      title: 'test',
      last_message: 'placeholder',
      last_message_author_email: 'placeholder',
    },
  ] as ChatWithLastMessage[]);
};
