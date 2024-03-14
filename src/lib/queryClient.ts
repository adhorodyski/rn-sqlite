import {QueryClient} from '@tanstack/react-query';

export const queryClient = new QueryClient();

declare module '@tanstack/react-query' {
  interface QueryMeta extends Record<string, unknown> {
    /*
     * Keys specified here are going to trigger automatic revalidation.
     */
    keys?: string[];
  }
}
