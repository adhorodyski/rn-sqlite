import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSuspenseQuery} from '@tanstack/react-query';
import {Suspense, useState} from 'react';
import {Text, View} from 'react-native';
import {CreateMessageForm} from './CreateMessageForm';
import {Loader} from './Loader';
import {MessagesList} from './MessagesList';
import type {RootStackParamList} from './RootStack';
import {chatsKeys} from './lib/keys';
import {getChat} from './queries/chats.native';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export const ChatScreen = ({route: {params}}: Props) => {
  const [message, setMessage] = useState('');
  const chat = useSuspenseQuery({
    queryKey: chatsKeys.one(params.chatId),
    queryFn: () => getChat(params.chatId),
  });

  return (
    <View style={{maxHeight: '100%'}}>
      <Text
        style={{fontWeight: 'bold', paddingHorizontal: 16, paddingVertical: 8}}>
        {chat.data.title}
      </Text>

      <Suspense fallback={<Loader />}>
        <MessagesList chatId={chat.data.id} />
      </Suspense>

      <CreateMessageForm
        chatId={chat.data.id}
        message={message}
        setMessage={setMessage}
      />
    </View>
  );
};
