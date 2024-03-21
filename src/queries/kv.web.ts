import type {Chat} from '../lib/types';

// TODO - This is a stub. Implement the getByKey query.
export const getByKey = async <T>(key: string) => {
  if (key === 'betas') {
    return ['test', 'test', 'test'] as T;
  }
  if (key.startsWith('chat_')) {
    return {id: 1, title: 'test'} as T;
  }
};

export const useKey = <T>(key: string) => {
  const query = getByKey(key) as unknown as T;

  return query;
};

export const useBetas = () => useKey<string[]>('betas');
export const useChat = (chatId: number) => useKey<Chat>(`chat_${chatId}`);
