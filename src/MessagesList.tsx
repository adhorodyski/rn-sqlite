import {FlatList, Text, TouchableOpacity} from 'react-native';
import {useChatMessages} from './queries/messages.native';

interface Props {
  chatId: number;
}

export const MessagesList = ({chatId}: Props) => {
  const messages = useChatMessages(chatId);

  return (
    <FlatList
      inverted
      data={messages.data}
      renderItem={({item}) => (
        <TouchableOpacity key={item.id} style={{padding: 16}}>
          <Text>
            {item.id}: {item.content}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};
