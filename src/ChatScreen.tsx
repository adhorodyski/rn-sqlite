import {Suspense} from 'react';
import {Text, View} from 'react-native';
import {useSuspenseQuery} from '@tanstack/react-query';
import {getChat} from './queries/chats.native';
import {chatsKeys} from './lib/keys';
import type {RootStackParamList} from './RootStack';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MessagesList} from './MessagesList';
import {CreateMessageForm} from './CreateMessageForm';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export const ChatScreen = ({route: {params}}: Props) => {
  const chat = useSuspenseQuery({
    queryKey: chatsKeys.one(params.chatId),
    queryFn: () => getChat(params.chatId),
  });

  return (
    <View>
      <Text style={{fontWeight: 'bold'}}>{chat.data.title}</Text>

      <Suspense fallback={<Text>Loading messages...</Text>}>
        <MessagesList chatId={chat.data.id} />
      </Suspense>

      <CreateMessageForm chatId={chat.data.id} />
    </View>
  );
};
