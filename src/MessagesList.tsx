import {FlatList, Text, TouchableOpacity} from 'react-native';
import {useSuspenseQuery} from '@tanstack/react-query';
import {getChatMessages} from './queries/messages.native';
import {messagesKeys} from './lib/keys';

interface Props {
  chatId: number;
}

export const MessagesList = ({chatId}: Props) => {
  const messages = useSuspenseQuery({
    queryKey: messagesKeys.chat(chatId),
    queryFn: () => getChatMessages(chatId),
  });

  return (
    <FlatList
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
