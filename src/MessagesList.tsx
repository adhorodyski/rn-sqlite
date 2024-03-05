import {FlatList, Text, TouchableOpacity} from 'react-native';
import {db} from './lib/db.native';
import {useBetas} from './queries/kv.native';
import {useChatMessages} from './queries/messages.native';

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
          onPress={() => {
            db.execute(
              `UPDATE kv
            SET value = ?
            WHERE key = 'betas'`,
              [JSON.stringify([...betas.data, item.id])],
            );
          }}>
          <Text>
            {item.id}: {item.content}
          </Text>
          <Text>Betas: {betas.data.toString()}</Text>
        </TouchableOpacity>
      )}
    />
  );
};
