import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {InboxMessage} from './lib/types';

interface Props {
  inboxMessages: InboxMessage[];
  isLoading: boolean;
  refetch: () => void;
}

export const InboxMessagesList = ({
  inboxMessages,
  refetch,
  isLoading,
}: Props) => {
  return (
    <FlatList
      data={inboxMessages}
      refreshing={isLoading}
      onRefresh={refetch}
      ListEmptyComponent={
        <View>
          <Text>List is empty</Text>
        </View>
      }
      renderItem={({item}) => (
        <TouchableOpacity key={item.id} style={{padding: 16}}>
          <Text>{item.sender}</Text>
          <Text>{item.content}</Text>
        </TouchableOpacity>
      )}
    />
  );
};
