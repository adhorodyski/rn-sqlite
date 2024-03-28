import type {QueryClient} from '@tanstack/react-query';

export const databaseQueryHook = (
  keyChanged: string,
  queryClient: QueryClient,
) => {
  const cache = queryClient.getQueryCache();

  const queries = cache.findAll({type: 'active'});

  queries.forEach(query => {
    const metaKeys = query.meta?.automaticRevalidationKeys;

    // not an exact match, bail out
    if (metaKeys === undefined && query.queryKey[0] !== keyChanged) {
      return;
    }

    // not a custom dependency match, bail out
    if (
      metaKeys !== undefined &&
      !metaKeys.some((key: string) => keyChanged.startsWith(key))
    ) {
      return;
    }

    // match, invalidate
    queryClient.invalidateQueries({queryKey: query.queryKey});
  });
};
