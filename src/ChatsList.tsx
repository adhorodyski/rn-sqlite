import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {getRecentChats} from './queries/chats.native';
import {chatsKeys} from './lib/keys';

const renderItem = ({item}) => (
  <TouchableOpacity key={item.id} style={styles.item}>
    <Text>
      {item.id}: {item.title}
    </Text>
  </TouchableOpacity>
);

export const ChatsList = () => {
  const recentChats = useQuery({
    queryKey: chatsKeys.all,
    queryFn: getRecentChats,
  });

  return <FlatList data={recentChats.data} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
  },
});
