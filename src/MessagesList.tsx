import {FlatList, Text, TouchableOpacity} from 'react-native';
import {useSuspenseQuery} from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import isTodayPlugin from 'dayjs/plugin/isToday';
import {getChatMessages} from './queries/messages.native';
import {messagesKeys} from './lib/keys';

dayjs.extend(relativeTimePlugin);
dayjs.extend(isTodayPlugin);

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
        <TouchableOpacity key={item.id} style={{padding: 16}}>
          <Text>
            {item.author_id === 1 ? 'You' : 'Someone'},{' '}
            {dayjs(item.created_at).isToday()
              ? dayjs(item.created_at).format('h:mm A')
              : dayjs(item.created_at).fromNow(true)}
          </Text>
          <Text>{item.content}</Text>
        </TouchableOpacity>
      )}
    />
  );
};
