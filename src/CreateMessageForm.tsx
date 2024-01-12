import {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {createMessage} from './mutations/messages.native';
import {messagesKeys} from './lib/keys';
import {queryClient} from './lib/queryClient';

interface Props {
  chatId: number;
}

export const CreateMessageForm = ({chatId}: Props) => {
  const [content, setContent] = useState('');

  const create = useMutation({
    mutationKey: messagesKeys.create(chatId),
    mutationFn: createMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: messagesKeys.chat(chatId)});
    },
  });

  return (
    <View style={{padding: 16}}>
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Type a message..."
        style={{
          backgroundColor: 'white',
          padding: 16,
          marginBottom: 16,
        }}
      />

      <TouchableOpacity onPress={() => create.mutate({chatId, content})}>
        <Text>Send!</Text>
      </TouchableOpacity>
    </View>
  );
};
