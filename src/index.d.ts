import '@tanstack/react-query';

declare module '@tanstack/react-query' {
  interface QueryMeta extends Record<string, unknown> {
    /*
     * Keys specified here are going to trigger automatic revalidation.
     */
    keys?: string[];
  }
}
