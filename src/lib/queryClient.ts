import {QueryClient} from '@tanstack/react-query';
import {setupDatabaseHook} from './setupDatabaseHook';
import {db} from './db';

export const queryClient = new QueryClient();

setupDatabaseHook(db, queryClient);
