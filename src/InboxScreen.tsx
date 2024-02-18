import {useFocusEffect} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {Suspense, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {InboxMessagesList} from './InboxMessagesList';
import {inboxKeys} from './lib/keys';
import {queryClient} from './lib/queryClient';
import {InboxMessage} from './lib/types';

import React from 'react';
import {Loader} from './Loader';
import {getInboxMessages} from './queries/inbox.native';

export const InboxScreen = () => {
  const [inboxMessages, setInboxMessages] = useState<
    InboxMessage[] | undefined
  >(undefined);
  const [autoRefetch, setAutoRefetch] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const inboxMessagesData = useQuery({
    queryKey: inboxKeys.all,
    queryFn: getInboxMessages,
  });

  const refetch = (isAuto = false) => {
    if (!isAuto) {
      setIsRefreshing(true);
    }
    queryClient.invalidateQueries({queryKey: inboxKeys.all});
    inboxMessagesData.refetch();
    if (!isAuto) {
      setIsRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (autoRefetch) {
        refetch(true);
        setAutoRefetch(false);
      }
      return () => setAutoRefetch(true);
    }, []),
  );

  useEffect(() => {
    if (inboxMessagesData.isSuccess) {
      setInboxMessages(inboxMessagesData.data);
      setIsRefreshing(false);
    }
  }, [inboxMessagesData.isSuccess, inboxMessagesData.data]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch(true);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{maxHeight: '100%', backgroundColor: 'white'}}>
      <Text
        style={{fontWeight: 'bold', paddingHorizontal: 16, paddingVertical: 8}}>
        {'Inbox'}
      </Text>

      <Suspense fallback={<Loader />}>
        <InboxMessagesList
          inboxMessages={inboxMessages}
          refetch={refetch}
          isLoading={isRefreshing}
        />
      </Suspense>
    </View>
  );
};
