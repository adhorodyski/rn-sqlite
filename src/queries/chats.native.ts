import {db} from '../lib/db.native';
import type {Chat} from '../lib/types';

export const getRecentChats = async () => {
  const response = await db.executeAsync('SELECT * FROM chats');
  return response.rows?._array as Chat[];
};

export const getChat = async (id: number) => {
  const response = await db.executeAsync(
    'SELECT * FROM chats WHERE id = ? LIMIT 1',
    [id],
  );
  return response.rows?.item(0) as Chat;
};
