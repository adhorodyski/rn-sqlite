import {db} from '../lib/db';

export const setBetas = (data: string[]) => {
  db.executeAsync("UPDATE kv SET value = ? WHERE key = 'betas'", [
    JSON.stringify(data),
  ]);
};
