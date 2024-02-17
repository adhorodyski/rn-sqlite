import {Suspense} from 'react';
import {Text} from 'react-native';
import {ChatsList} from './ChatsList';

export const ChatsScreen = () => {
  return (
    <Suspense fallback={<Text>Loading chats...</Text>}>
      <ChatsList />
    </Suspense>
  );
};
