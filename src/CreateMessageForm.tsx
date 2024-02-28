import {useState} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {createMessage} from './mutations/messages.native';
import {messagesKeys} from './lib/keys';

interface Props {
  chatId: number;
}

export const CreateMessageForm = ({chatId}: Props) => {
  const [content, setContent] = useState('');

  const create = useMutation({
    mutationKey: messagesKeys.create(chatId),
    mutationFn: createMessage,
    onSuccess: () => {
      setContent('');
    },
  });

  return (
    <KeyboardAvoidingView style={{padding: 16}}>
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
    </KeyboardAvoidingView>
  );
};
