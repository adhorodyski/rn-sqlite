import {db} from '../lib/db.native';
import type {Chat} from '../lib/types';

export const getRecentChats = async () => {
  const response = await db.executeAsync('SELECT * FROM chats');
  return response.rows?._array as Chat[];
};
