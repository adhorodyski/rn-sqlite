import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {createMessage} from './mutations/messages.native';
import {messagesKeys} from './lib/keys';
import {queryClient} from './lib/queryClient';

interface Props {
  chatId: number;
  message: string;
  setMessage: (message: string) => void;
}

export const CreateMessageForm = ({chatId, message, setMessage}: Props) => {
  const create = useMutation({
    mutationKey: messagesKeys.create(chatId),
    mutationFn: createMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: messagesKeys.chat(chatId)});
      setMessage('');
    },
  });

  return (
    <KeyboardAvoidingView style={{padding: 16}}>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message..."
        style={{
          backgroundColor: 'white',
          padding: 16,
          marginBottom: 16,
        }}
      />

      <TouchableOpacity
        onPress={() => create.mutate({chatId, content: message})}>
        <Text>Send!</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
