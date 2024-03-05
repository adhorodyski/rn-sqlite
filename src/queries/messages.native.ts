import {useSuspenseQuery} from '@tanstack/react-query';
import {useMemo} from 'react';
import {db} from '../lib/db.native';
import {messagesKeys} from '../lib/keys';
import {queryClient} from '../lib/queryClient';
import type {Message} from '../lib/types';
import {useDatabaseSync} from '../lib/useDatabaseSync';

export const getChatMessages = async (chatId: number) => {
  const response = await db.executeAsync(
    `SELECT
        json_extract(value, '$.id') AS id,
        json_extract(value, '$.chat_id') AS chat_id,
        json_extract(value, '$.author_id') AS author_id,
        json_extract(value, '$.content') AS content
    FROM kv
    WHERE key LIKE 'message_%'
    AND json_extract(value, '$.chat_id') = ?
    ORDER BY json_extract(value, '$.created_at') DESC
    `,
    [chatId],
  );
  console.log('[Query] Messages');
  return response.rows?._array as Message[];
};

export const useChatMessages = (chatId: number) => {
  const queryKey = useMemo(() => messagesKeys.chat(chatId), [chatId]);

  const messages = useSuspenseQuery({
    queryKey,
    queryFn: () => getChatMessages(chatId),
  });

  useDatabaseSync(() => {
    console.log('[Invalidate] Messages');
    queryClient.invalidateQueries({queryKey});
  }, ['message_']);

  return messages;
};
