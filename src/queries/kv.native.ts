import {useSuspenseQuery} from '@tanstack/react-query';
import {db} from '../lib/db.native';
import type {Chat} from '../lib/types';

export const getByKey = async <T>(key: string) => {
  const response = await db.executeAsync(
    'SELECT json(value) AS value FROM kv WHERE key = ?',
    [key],
  );
  console.log(`[Query] '${key}'`);
  // TODO: handle json parsing with sqlite
  return JSON.parse(response.rows?._array[0].value) as T;
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
