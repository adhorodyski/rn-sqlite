import {db} from '../lib/db.web';

export const setBetas = (data: string[]) => {
  db.table('kv').put(data, 'betas');
};
