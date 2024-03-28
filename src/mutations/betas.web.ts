import {db} from '../lib/db.web';

export const setBetas = (data: string[]) => {
  return db.table('kv').put(data, 'betas');
};
