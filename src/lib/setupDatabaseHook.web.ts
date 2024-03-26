import type {QueryClient} from '@tanstack/react-query';
import {db} from './db.web';
import {databaseQueryHook} from './databaseQueryHook';

export const setupDatabaseHook = (queryClient: QueryClient) => {
  db.kv.hook('creating', function (keyChanged) {
    this.onsuccess = function () {
      databaseQueryHook(keyChanged, queryClient);
    };
  });

  db.kv.hook('updating', function (_, keyChanged) {
    this.onsuccess = function () {
      databaseQueryHook(keyChanged, queryClient);
    };
  });

  db.kv.hook('deleting', function (keyChanged) {
    this.onsuccess = function () {
      databaseQueryHook(keyChanged, queryClient);
    };
  });
};
