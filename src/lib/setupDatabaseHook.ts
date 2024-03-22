import type {QueryClient} from '@tanstack/react-query';
import {db, type Row} from './db';
import {databaseQueryHook} from './databaseQueryHook';

export const setupDatabaseHook = (queryClient: QueryClient) => {
  db.updateHook(params => {
    const keyChanged = (params.row as Row).key;
    databaseQueryHook(keyChanged, queryClient);
  });
};
