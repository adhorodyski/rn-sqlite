import '@tanstack/react-query';

declare module '@tanstack/react-query' {
  interface QueryMeta {
    /*
     * Keys specified here are going to trigger automatic revalidation.
     */
    automaticRevalidationKeys?: string[];
  }
}
