import {db} from '../lib/db';

interface Props {
  chatId: number;
  content: string;
}

export const createMessage = ({chatId, content}: Props) => {
  const id = Math.floor(Math.random() * Date.now());
  return db.executeAsync('INSERT INTO kv (key, value) VALUES (?, ?)', [
    `message_${id}`,
    JSON.stringify({
      id,
      chat_id: chatId,
      content,
      author_id: 1,
      created_at: Date.now(),
    }),
  ]);
};
