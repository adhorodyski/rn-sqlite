import {QueryClient} from '@tanstack/react-query';
import {setupDatabaseHook} from './setupDatabaseHook';

export const queryClient = new QueryClient();

setupDatabaseHook(queryClient);
