import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Suspense} from 'react';
import {Text, View} from 'react-native';
import {CreateMessageForm} from './CreateMessageForm';
import {MessagesList} from './MessagesList';
import type {RootStackParamList} from './RootStack';
import {useBetas, useChat} from './queries/kv.native';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export const ChatScreen = ({route: {params}}: Props) => {
  const chat = useChat(params.chatId);
  const betas = useBetas();

  return (
    <View style={{maxHeight: '100%'}}>
      <Text>{betas.data.toString()}</Text>

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
