import {db} from '../lib/db.web';

export const getByKey = async <T>(key: string) => {
  const value = await db.kv.get(key);
  console.log(`[Query] '${key}'`);
  return value as T;
};
