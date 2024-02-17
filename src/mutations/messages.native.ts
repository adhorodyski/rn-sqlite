import {db} from '../lib/db.native';

interface Props {
  chatId: number;
  content: string;
}

export const createMessage = ({chatId, content}: Props) => {
  if (content === '/vip') {
    db.executeAsync('UPDATE chats SET is_vip = 1 WHERE id = ?', [chatId]);
  }

  return db.executeAsync(
    'INSERT INTO messages (chat_id, content, author_id) VALUES (?, ?, ?)',
    [chatId, content, 1],
  );
};
