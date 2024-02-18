import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFeatureToggle} from './lib/featureProvider/useFeature';
import {InboxMessage} from './lib/types';

import {Avatar} from './components/Avatar';
import {IconSvg} from './components/IconSVG/IconSVG';

interface Props {
  inboxMessages: InboxMessage[] | undefined;
  isLoading: boolean;
  refetch: () => void;
}

export const InboxMessagesList = ({
  inboxMessages,
  refetch,
  isLoading,
}: Props) => {
  const showInboxListActionIcons = useFeatureToggle('inbox-list-action-icons');

  return (
    <FlatList
      data={inboxMessages}
      refreshing={isLoading}
      onRefresh={refetch}
      ListEmptyComponent={
        <View>
          <Text>List is empty</Text>
        </View>
      }
      renderItem={({item}) => (
        <TouchableOpacity key={item.id} style={{padding: 16}}>
          <View>
            <View style={styles.row}>
              <Avatar
                size="small"
                initials={parseEmail(item.sender)}
                style={{marginRight: 10}}
                featureToggleName={'inbox-list-avatar'}
              />
              <View>
                <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                <Text style={{color: 'gray'}}>{item.content}</Text>
                <Text style={{color: 'blue', maxWidth: 300}}>
                  {item.sender}
                </Text>
              </View>
            </View>
            {showInboxListActionIcons && (
              <View>
                <View style={{flexDirection: 'row-reverse', marginTop: 10}}>
                  <TouchableOpacity
                    onPress={() => Alert.alert('Mark Read option pressed')}>
                    <IconSvg name="mark-read" width={20} style={{margin: 10}} />
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
