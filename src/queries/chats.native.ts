import {useSuspenseQuery} from '@tanstack/react-query';
import {db} from '../lib/db.native';
import {chatsKeys} from '../lib/keys';
import type {Chat} from '../lib/types';

interface ChatWithLastMessage extends Chat {
  last_message: string;
  last_message_author_email: string;
}

export const getRecentChats = async () => {
  const response = await db.executeAsync(
    `SELECT
        json_extract(chat.value, '$.id') AS id,
        json_extract(chat.value, '$.title') AS title,
        json_extract(last_message.value, '$.content') AS last_message,
        json_extract(last_message_author.value, '$.email') AS last_message_author_email
    FROM
        kv AS chat
    LEFT JOIN (
        SELECT
            json_extract(message.value, '$.chat_id') AS chat_id,
            json_extract(message.value, '$.content') AS content,
            json_extract(message.value, '$.author_id') AS author_id,
            MAX(json_extract(message.value, '$.created_at')) AS max_created_at
        FROM
            kv AS message
        WHERE
            message.key LIKE 'message_%'
        GROUP BY
            json_extract(message.value, '$.chat_id')
    ) AS last_message_info ON json_extract(chat.value, '$.id') = last_message_info.chat_id
    LEFT JOIN
        kv AS last_message ON last_message_info.chat_id = json_extract(last_message.value, '$.chat_id')
        AND last_message_info.max_created_at = json_extract(last_message.value, '$.created_at')
    LEFT JOIN
        kv AS last_message_author ON json_extract(last_message.value, '$.author_id') = json_extract(last_message_author.value, '$.id')
    WHERE chat.key LIKE 'chat_%'
    GROUP BY json_extract(chat.value, '$.id')
    LIMIT 100
    `,
  );
  console.log('[Query] Recent chats');
  return response.rows?._array as ChatWithLastMessage[];
};

export const useRecentChats = () => {
  const recentChats = useSuspenseQuery({
    queryKey: chatsKeys.all,
    queryFn: getRecentChats,
    meta: {keys: ['message_', 'user_']},
  });

  return recentChats;
};
