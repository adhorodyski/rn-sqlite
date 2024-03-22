import type {QueryClient} from '@tanstack/react-query';
import {db} from './db.web';
import {databaseQueryHook} from './databaseQueryHook';

export const setupDatabaseHook = (queryClient: QueryClient) => {
  db.kv.hook('creating', keyChanged => {
    databaseQueryHook(keyChanged, queryClient);
  });

  db.kv.hook('updating', (_, keyChanged) => {
    databaseQueryHook(keyChanged, queryClient);
  });

  db.kv.hook('deleting', keyChanged => {
    databaseQueryHook(keyChanged, queryClient);
  });
};
