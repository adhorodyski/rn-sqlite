import type {QueryClient} from '@tanstack/react-query';
import Dexie from 'dexie';
import {databaseQueryHook} from './databaseQueryHook';

export const setupDatabaseHook = (queryClient: QueryClient) => {
  Dexie.on('storagemutated', function (parts) {
    // TODO: This is a very naive implementation.
    // Here's a one we can reuse later: https://github.com/dexie/Dexie.js/blob/f7d3708b5adc48fc9faf8a6c5fd85cb1042081d8/src/live-query/live-query.ts#L88
    const keyChanged = Object.values(parts).find(part => part?.to)?.to;
    databaseQueryHook(keyChanged, queryClient);
  });
};
