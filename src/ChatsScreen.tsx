import {Suspense} from 'react';
import {ChatsList} from './ChatsList';
import {Loader} from './Loader';

export const ChatsScreen = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ChatsList />
    </Suspense>
  );
};
