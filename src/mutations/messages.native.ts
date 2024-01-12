import {db} from '../lib/db.native';

interface Props {
  chatId: number;
  content: string;
}

export const createMessage = ({chatId, content}: Props) => {
  return db.executeAsync(
    'INSERT INTO messages (chat_id, content) VALUES (?, ?)',
    [chatId, content],
  );
};
