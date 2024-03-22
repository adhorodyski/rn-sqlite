import {db} from '../lib/db.web';

interface Props {
  chatId: number;
  content: string;
}

export const createMessage = ({chatId, content}: Props) => {
  const id = Math.floor(Math.random() * Date.now());
  return db.table('kv').put(
    {
      id,
      chat_id: chatId,
      content,
      author_id: 1,
      created_at: Date.now(),
    },
    `message_${id}`,
  );
};
