import {useNavigation} from '@react-navigation/native';
import {useSuspenseQuery} from '@tanstack/react-query';
import React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar} from './components/Avatar';
import {useFeatureToggle} from './lib/featureProvider/useFeature';

import {IconSvg} from './components/IconSVG/IconSVG';
import {chatsKeys} from './lib/keys';
import {getRecentChats} from './queries/chats.native';

export const ChatsList = () => {
  const navigation = useNavigation();
  const showChatListActionIcons = useFeatureToggle('chat-list-action-icons');

  const recentChats = useSuspenseQuery({
    queryKey: chatsKeys.recent,
    queryFn: getRecentChats,
  });

  return (
    <FlatList
      refreshing={recentChats.isRefetching}
      onRefresh={recentChats.refetch}
      data={recentChats.data}
      renderItem={({item}) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.item,
            {backgroundColor: item.is_vip ? 'lightyellow' : 'white'},
          ]}
          onPress={() => navigation.navigate('Chat', {chatId: item.id})}>
          <View>
            <View style={styles.row}>
              <Avatar
                size="small"
                initials={parseEmail(item.last_message_author_email)}
                style={{marginRight: 10}}
              />
              <View>
                <Text style={{fontWeight: 'bold'}}>
                  {item.title} {item.is_vip ? '(VIP)' : ''}
                </Text>
                <Text style={{color: 'gray'}}>
                  {item.last_message_author_email}
                </Text>
                <Text style={{color: 'blue', maxWidth: 300}}>
                  {item.last_message}
                </Text>
              </View>
            </View>
            {showChatListActionIcons && (
              <View>
                <View style={{flexDirection: 'row-reverse', marginTop: 10}}>
                  <TouchableOpacity
                    onPress={() => Alert.alert('Quote option pressed')}>
                    <IconSvg
                      name="quote-right"
                      width={20}
                      style={{margin: 10}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Alert.alert('Remove option pressed')}>
                    <IconSvg
                      name="recycle-bin"
                      width={20}
                      style={{margin: 10}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Alert.alert('Reply option pressed')}>
                    <IconSvg
                      name="reply-arrow"
                      width={20}
                      style={{margin: 10}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const parseEmail = (email: string | undefined) => {
  const initials = (email ?? 'UN')
    .replace(/^(\S{2})\S*$|(?:^|\s*)(\S)\S*\s*/g, '$1$2')
    .toUpperCase();
  return initials;
};

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flex: 1,
    alignItems: 'stretch',
    padding: 16,
    gap: 16,
  },
  row: {
    flexDirection: 'row',
  },
});
