import {db} from '../lib/db.web';

interface Props {
  chatId: number;
  content: string;
}

export const createMessage = ({chatId, content}: Props) => {
  const id = Math.floor(Math.random() * Date.now());
  return db.table('kv').put(
    {
      chatId,
      content,
    },
    `message_${id}`,
  );
};
