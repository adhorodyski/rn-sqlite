import type {QueryClient} from '@tanstack/react-query';

export const databaseQueryHook = (
  keyChanged: string,
  queryClient: QueryClient,
) => {
  const cache = queryClient.getQueryCache();

  const queries = cache.findAll({type: 'active'});

  // TODO offload equality checks to run on  C++ / worklet / native if it turns out to be ~5x faster than Hermes
  queries.forEach(query => {
    const metaKeys = query.meta?.automaticRevalidationKeys;

    // exact match against SQLite
    if (metaKeys === undefined && query.queryKey[0] !== keyChanged) {
      return;
    }

    // custom dependency match
    if (
      metaKeys !== undefined &&
      !metaKeys.some((key: string) => keyChanged.startsWith(key))
    ) {
      return;
    }

    queryClient.invalidateQueries({queryKey: query.queryKey});
  });
};
