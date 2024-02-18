import {useFocusEffect} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {Suspense, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {InboxMessagesList} from './InboxMessagesList';
import {inboxKeys} from './lib/keys';
import {queryClient} from './lib/queryClient';
import {InboxMessage} from './lib/types';

import React from 'react';
import {getInboxMessages} from './queries/inbox.native';

export const InboxScreen = () => {
  const [inboxMessages, setInboxMessages] = useState<
    InboxMessage[] | undefined
  >(undefined);
  const [autoRefetch, setAutoRefetch] = useState(true);

  const inboxMessagesData = useQuery({
    queryKey: inboxKeys.all,
    queryFn: getInboxMessages,
  });

  const refetch = () => {
    queryClient.invalidateQueries({queryKey: inboxKeys.all});
    inboxMessagesData.refetch();
  };

  useFocusEffect(
    React.useCallback(() => {
      if (autoRefetch) {
        refetch();
        setAutoRefetch(false);
      }
      return () => setAutoRefetch(true);
    }, []),
  );

  useEffect(() => {
    if (inboxMessagesData.isSuccess) {
      setInboxMessages(inboxMessagesData.data);
    }
  }, [inboxMessagesData.isSuccess, inboxMessagesData.data]);

  return (
    <View style={{maxHeight: '100%'}}>
      <Text
        style={{fontWeight: 'bold', paddingHorizontal: 16, paddingVertical: 8}}>
        {'Inbox'}
      </Text>

      <Suspense fallback={<Text>Loading messages...</Text>}>
        <InboxMessagesList
          inboxMessages={inboxMessages}
          refetch={refetch}
          isLoading={
            inboxMessagesData.isLoading ||
            inboxMessagesData.isFetching ||
            inboxMessagesData.isRefetching
          }
        />
      </Suspense>
    </View>
  );
};
