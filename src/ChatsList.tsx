import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSuspenseQuery} from '@tanstack/react-query';
import {getRecentChats} from './queries/chats.native';
import {chatsKeys} from './lib/keys';
import {queryClient} from './lib/queryClient';
import {useDatabaseSync} from './lib/useDatabaseSync';

export const ChatsList = () => {
  const navigation = useNavigation();

  const recentChats = useSuspenseQuery({
    queryKey: chatsKeys.all,
    queryFn: getRecentChats,
  });

  // This list will be updated when a new message comes in
  useDatabaseSync(() => {
    queryClient.invalidateQueries({queryKey: chatsKeys.all});
  }, ['message_']);

  return (
    <FlatList
      refreshing={recentChats.isRefetching}
      onRefresh={recentChats.refetch}
      data={recentChats.data}
      renderItem={({item}) => (
        <TouchableOpacity
          key={item.id}
          style={styles.item}
          onPress={() => navigation.navigate('Chat', {chatId: item.id})}>
          <Text>{item.id}</Text>
          <View>
            <Text>{item.title}</Text>
            <Text style={{color: 'gray'}}>
              {item.last_message_author_email}
            </Text>
            <Text style={{color: 'blue', maxWidth: 300}}>
              {item.last_message}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    gap: 16,
  },
});
