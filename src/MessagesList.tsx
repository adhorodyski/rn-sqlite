import {FlatList, Text, TouchableOpacity} from 'react-native';
import {useBetas, useChatMessages} from './queries';
import {setBetas} from './mutations/betas';

interface Props {
  chatId: number;
}

export const MessagesList = ({chatId}: Props) => {
  const messages = useChatMessages(chatId);
  const betas = useBetas();

  return (
    <FlatList
      inverted
      data={messages.data}
      renderItem={({item}) => (
        <TouchableOpacity
          key={item.id}
          style={{padding: 16}}
          onPress={() =>
            setBetas([`feature-${new Date().getTime().toString()}`])
          }>
          <Text>
            {item.id}: {item.content}
          </Text>
          <Text>Betas: {betas.data.toString()}</Text>
        </TouchableOpacity>
      )}
    />
  );
};
