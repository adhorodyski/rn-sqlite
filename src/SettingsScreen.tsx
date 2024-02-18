import {useMutation} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {Switch, Text, View} from 'react-native';
import {useFeatureToggle} from './lib/featureProvider/useFeature';
import {featuresKeys} from './lib/keys';
import {queryClient} from './lib/queryClient';
import {updateFeature} from './mutations/features.native';

export const SettingsScreen = () => {
  const showChatListAvatar = useFeatureToggle('chat-list-avatar');
  const showChatListActionIcons = useFeatureToggle('chat-list-action-icons');
  const showInboxListAvatar = useFeatureToggle('inbox-list-avatar');
  const showInboxListActionIcons = useFeatureToggle('inbox-list-action-icons');
  const showSettingsNewFeature = useFeatureToggle('settings-new-feature');
  const showNewFeature = useFeatureToggle('new-feature');

  const [chatAvatarToggleValue, setChatAvatarToggleValue] = useState<
    undefined | boolean
  >();
  const [chatActionIconsToggleValue, setChatActionIconsToggleValue] = useState<
    undefined | boolean
  >();
  const [inboxAvatarToggleValue, setInboxAvatarToggleValue] = useState<
    undefined | boolean
  >();
  const [inboxActionIconsToggleValue, setInboxActionIconsToggleValue] =
    useState<undefined | boolean>();
  const [settingsNewFeatureToggleValue, setSettingsNewFeatureToggleValue] =
    useState<undefined | boolean>();
  const [newFeatureToggleValue, setNewFeatureToggleValue] = useState<
    undefined | boolean
  >();

  useEffect(() => {
    if (chatAvatarToggleValue !== showChatListAvatar) {
      setChatAvatarToggleValue(showChatListAvatar);
    }
  }, [showChatListAvatar, setChatAvatarToggleValue, chatAvatarToggleValue]);

  useEffect(() => {
    if (chatActionIconsToggleValue !== showChatListActionIcons) {
      setChatActionIconsToggleValue(showChatListActionIcons);
    }
  }, [
    showChatListActionIcons,
    setChatActionIconsToggleValue,
    chatActionIconsToggleValue,
  ]);

  useEffect(() => {
    if (inboxActionIconsToggleValue !== showInboxListActionIcons) {
      setInboxActionIconsToggleValue(showInboxListActionIcons);
    }
  }, [
    showInboxListActionIcons,
    setInboxActionIconsToggleValue,
    inboxActionIconsToggleValue,
  ]);

  useEffect(() => {
    if (inboxAvatarToggleValue !== showInboxListAvatar) {
      setInboxAvatarToggleValue(showInboxListAvatar);
    }
  }, [showInboxListAvatar, setInboxAvatarToggleValue, inboxAvatarToggleValue]);

  useEffect(() => {
    if (settingsNewFeatureToggleValue !== showSettingsNewFeature) {
      setSettingsNewFeatureToggleValue(showSettingsNewFeature);
    }
  }, [
    showSettingsNewFeature,
    setSettingsNewFeatureToggleValue,
    settingsNewFeatureToggleValue,
  ]);

  useEffect(() => {
    if (newFeatureToggleValue !== showNewFeature) {
      setNewFeatureToggleValue(showNewFeature);
    }
  }, [showNewFeature, setNewFeatureToggleValue, newFeatureToggleValue]);

  const switchToggle = useMutation({
    mutationKey: featuresKeys.update(),
    mutationFn: updateFeature,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: featuresKeys.all});
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
          thumbColor={showChatListActionIcons ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() =>
            switchToggle.mutate({
              featureName: 'chat-list-action-icons',
              isEnabled: Number(!chatActionIconsToggleValue),
            })
          }
          value={chatActionIconsToggleValue ?? false}
        />
        <Text>{'Show Action Icons in Chats'}</Text>
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
      <View
        style={{
          maxHeight: '100%',
          flexDirection: 'row',
          marginTop: 20,
          marginLeft: 20,
        }}>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={showInboxListActionIcons ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() =>
            switchToggle.mutate({
              featureName: 'inbox-list-action-icons',
              isEnabled: Number(!inboxActionIconsToggleValue),
            })
          }
          value={inboxActionIconsToggleValue ?? false}
        />
        <Text>{'Show Action Icons in Inbox'}</Text>
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
          thumbColor={showSettingsNewFeature ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() =>
            switchToggle.mutate({
              featureName: 'settings-new-feature',
              isEnabled: Number(!settingsNewFeatureToggleValue),
            })
          }
          value={settingsNewFeatureToggleValue ?? false}
        />
        <Text>{'Show New Features Toggles'}</Text>
      </View>
      {showSettingsNewFeature && (
        <View
          style={{
            maxHeight: '100%',
            flexDirection: 'row',
            marginTop: 20,
            marginLeft: 40,
          }}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={showNewFeature ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() =>
              switchToggle.mutate({
                featureName: 'new-feature',
                isEnabled: Number(!newFeatureToggleValue),
              })
            }
            value={newFeatureToggleValue ?? false}
          />
          <Text>{'Show New Features'}</Text>
        </View>
      )}
    </View>
  );
};
