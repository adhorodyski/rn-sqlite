import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getRecentChats} from './queries/chats.native';
import {chatsKeys} from './lib/keys';

export const ChatsList = () => {
  const navigation = useNavigation();

  const recentChats = useQuery({
    queryKey: chatsKeys.all,
    queryFn: getRecentChats,
  });

  return (
    <FlatList
      data={recentChats.data}
      renderItem={({item}) => (
        <TouchableOpacity
          key={item.id}
          style={styles.item}
          onPress={() => navigation.navigate('Chat', {chatId: item.id})}>
          <Text>
            {item.id}: {item.title}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
  },
});
