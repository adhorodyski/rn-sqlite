import {useSuspenseQuery} from '@tanstack/react-query';
import type {Chat} from '../lib/types';

// TODO - This is a stub. Implement the getByKey query.
export const getByKey = async <T>(key: string) => {
  if (key === 'betas') {
    return Promise.resolve(['beta-1', 'beta-2', 'beta-3'] as T);
  }
  if (key.startsWith('chat_')) {
    return Promise.resolve({id: 1, title: 'Test - Chat Title'} as T);
  }
};

export const useKey = <T>(key: string) => {
  const query = useSuspenseQuery({
    queryKey: [key],
    queryFn: () => getByKey<T>(key),
  });

  return query;
};

export const useBetas = () => useKey<string[]>('betas');
export const useChat = (chatId: number) => useKey<Chat>(`chat_${chatId}`);
