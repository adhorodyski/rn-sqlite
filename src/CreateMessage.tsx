import {Pressable, Text} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {createMessage} from './mutations/messages.native';
import {queryClient} from './lib/queryClient';
import {chatsKeys, messagesKeys} from './lib/keys';

interface Props {
  chatId: number;
}

export const CreateMessage = ({chatId}: Props) => {
  const createMessageMutation = useMutation({
    mutationKey: messagesKeys.create(chatId),
    mutationFn: createMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: chatsKeys.all});
    },
  });

  return (
    <Pressable
      onPress={() => createMessageMutation.mutate({chatId, content: 'Hello'})}
      style={{backgroundColor: 'pink', padding: 10, borderRadius: 5}}>
      <Text>Create message</Text>
    </Pressable>
  );
};
