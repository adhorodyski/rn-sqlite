import {db} from '../lib/db';

export const getByKey = async <T>(key: string) => {
  const response = await db.executeAsync(
    'SELECT json(value) AS value FROM kv WHERE key = ?',
    [key],
  );
  console.log(`[Query] '${key}'`);
  // TODO: handle json parsing with sqlite
  return JSON.parse(response.rows?._array[0].value) as T;
};
