import {FlatList, Text, TouchableOpacity} from 'react-native';
import {useSuspenseQuery} from '@tanstack/react-query';
import {getChatMessages} from './queries/messages.native';
import {messagesKeys} from './lib/keys';
import {queryClient} from './lib/queryClient';
import {useDatabaseUpdate} from './lib/useDatabaseUpdate';

interface Props {
  chatId: number;
}

export const MessagesList = ({chatId}: Props) => {
  const messages = useSuspenseQuery({
    queryKey: messagesKeys.chat(chatId),
    queryFn: () => getChatMessages(chatId),
  });

  useDatabaseUpdate(['message_'], () => {
    queryClient.invalidateQueries({queryKey: messagesKeys.chat(chatId)});
  });

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
