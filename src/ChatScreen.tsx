import {useQuery} from '@tanstack/react-query';
import {Text, View} from 'react-native';
import {getChat} from './queries/chats.native';
import {chatsKeys} from './lib/keys';
import type {RootStackParamList} from './RootStack';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MessagesList} from './MessagesList';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export const ChatScreen = ({route: {params}}: Props) => {
  const chat = useQuery({
    queryKey: chatsKeys.one(params.chatId),
    queryFn: () => getChat(params.chatId),
  });

  if (!chat.data) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text style={{fontWeight: 'bold'}}>{chat.data.title}</Text>

      <MessagesList chatId={params.chatId} />
    </View>
  );
};
