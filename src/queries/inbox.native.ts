import {db} from '../lib/db.native';
import {InboxMessage} from '../lib/types';

export const getInboxMessages = async () => {
  const response = await db.executeAsync('SELECT * FROM inbox');

  return response.rows?._array as InboxMessage[];
};
