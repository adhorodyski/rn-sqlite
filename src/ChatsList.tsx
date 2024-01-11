import {FlatList, Text} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {getRecentChats} from './queries/chats.native';
import {chatsKeys} from './lib/keys';

export const ChatsList = () => {
  const recentChats = useQuery({
    queryKey: chatsKeys.all,
    queryFn: getRecentChats,
  });

  return (
    <FlatList
      data={recentChats.data}
      renderItem={({item}) => (
        <Text>
          {item.id}: {item.title}
        </Text>
      )}
    />
  );
};
