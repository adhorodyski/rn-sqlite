import type {QueryClient} from '@tanstack/react-query';
import type {OPSQLiteConnection} from '@op-engineering/op-sqlite';
import type {Row} from './db';

export const setupDatabaseHook = (
  db: OPSQLiteConnection,
  queryClient: QueryClient,
) => {
  db.updateHook(params => {
    const rowKey = (params.row as Row).key;
    const cache = queryClient.getQueryCache();

    const queries = cache.findAll({type: 'active'});

    // TODO offload equality checks to run on  C++ / worklet / native if it turns out to be ~5x faster than Hermes
    queries.forEach(query => {
      const metaKeys = query.meta?.automaticRevalidationKeys;

      // exact match against SQLite
      if (metaKeys === undefined && query.queryKey[0] !== rowKey) {
        return;
      }

      // custom dependency match
      if (
        metaKeys !== undefined &&
        !metaKeys.some((key: string) => rowKey.startsWith(key))
      ) {
        return;
      }

      queryClient.invalidateQueries({queryKey: query.queryKey});
    });
  });
};
