import {FlatList, Text, TouchableOpacity} from 'react-native';
import {useSuspenseQuery} from '@tanstack/react-query';
import {getChatMessages} from './queries/messages.native';
import {messagesKeys} from './lib/keys';
import CalendarModule from './lib/calendarModule';

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
      inverted
      data={messages.data}
      renderItem={({item}) => (
        <TouchableOpacity
          key={item.id}
          style={{padding: 16}}
          onPress={() => {
            CalendarModule.createCalendarEvent(
              item.id.toString(),
              item.content,
            );
          }}>
          <Text>
            {item.id}: {item.content}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};
