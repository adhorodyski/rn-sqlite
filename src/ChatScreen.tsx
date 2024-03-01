import {Suspense} from 'react';
import {Text, View} from 'react-native';
import {useChat} from './queries/chats.native';
import type {RootStackParamList} from './RootStack';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MessagesList} from './MessagesList';
import {CreateMessageForm} from './CreateMessageForm';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export const ChatScreen = ({route: {params}}: Props) => {
  const chat = useChat(params.chatId);

  return (
    <View style={{maxHeight: '100%'}}>
      <Text
        style={{fontWeight: 'bold', paddingHorizontal: 16, paddingVertical: 8}}>
        {chat.data.title}
      </Text>

      <Suspense fallback={<Text>Loading messages...</Text>}>
        <MessagesList chatId={params.chatId} />
      </Suspense>

      <CreateMessageForm chatId={params.chatId} />
    </View>
  );
};
