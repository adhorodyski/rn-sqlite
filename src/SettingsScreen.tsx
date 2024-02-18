import {useMutation} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {Switch, Text, View} from 'react-native';
import {useFeatureToggle} from './lib/featureProvider/useFeature';
import {featuresKeys} from './lib/keys';
import {queryClient} from './lib/queryClient';
import {updateFeature} from './mutations/features.native';

export const SettingsScreen = () => {
  const showChatListAvatar = useFeatureToggle('chat-list-avatar');
  const showInboxListAvatar = useFeatureToggle('inbox-list-avatar');
  const [chatAvatarToggleValue, setChatAvatarToggleValueValue] = useState<
    undefined | boolean
  >();
  const [inboxAvatarToggleValue, setInboxAvatarToggleValueToggleValue] =
    useState<undefined | boolean>();

  useEffect(() => {
    if (chatAvatarToggleValue !== showChatListAvatar) {
      setChatAvatarToggleValueValue(showChatListAvatar);
    }
  }, [
    showChatListAvatar,
    setChatAvatarToggleValueValue,
    chatAvatarToggleValue,
  ]);

  useEffect(() => {
    if (inboxAvatarToggleValue !== showInboxListAvatar) {
      setInboxAvatarToggleValueToggleValue(showInboxListAvatar);
    }
  }, [
    showInboxListAvatar,
    setInboxAvatarToggleValueToggleValue,
    inboxAvatarToggleValue,
  ]);

  const switchToggle = useMutation({
    mutationKey: featuresKeys.update(),
    mutationFn: updateFeature,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: featuresKeys.all});
      // setToggleValue(!toggleValue);
    },
  });

  return (
    <View
      styles={{
        marginTop: 20,
      }}>
      <View
        style={{
          maxHeight: '100%',
          flexDirection: 'row',
          marginTop: 20,
          marginLeft: 20,
        }}>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={showChatListAvatar ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() =>
            switchToggle.mutate({
              featureName: 'chat-list-avatar',
              isEnabled: Number(!chatAvatarToggleValue),
            })
          }
          value={chatAvatarToggleValue ?? false}
        />
        <Text>{'Show Avatar in Chats'}</Text>
      </View>
      <View
        style={{
          maxHeight: '100%',
          flexDirection: 'row',
          marginTop: 20,
          marginLeft: 20,
        }}>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={showInboxListAvatar ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() =>
            switchToggle.mutate({
              featureName: 'inbox-list-avatar',
              isEnabled: Number(!inboxAvatarToggleValue),
            })
          }
          value={inboxAvatarToggleValue ?? false}
        />
        <Text>{'Show Avatar in Inbox'}</Text>
      </View>
    </View>
  );
};
