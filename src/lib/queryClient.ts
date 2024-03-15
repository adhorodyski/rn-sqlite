import {QueryClient} from '@tanstack/react-query';
import {setupDatabaseHook} from './setupDatabaseHook';
import {db} from './db.native';

export const queryClient = new QueryClient();

setupDatabaseHook(db, queryClient);
