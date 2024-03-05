import {useNavigation} from '@react-navigation/native';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useRecentChats} from './queries/chats.native';

export const ChatsList = () => {
  const navigation = useNavigation();

  const recentChats = useRecentChats();

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
