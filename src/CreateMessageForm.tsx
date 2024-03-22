import {useState} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {createMessage} from './mutations/messages';

interface Props {
  chatId: number;
}

export const CreateMessageForm = ({chatId}: Props) => {
  const [content, setContent] = useState('');

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

      <TouchableOpacity
        onPress={() => {
          createMessage({chatId, content});
          setContent('');
        }}>
        <Text>Send!</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
