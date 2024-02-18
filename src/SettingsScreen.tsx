import {useMutation} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {Switch, Text, View} from 'react-native';
import {useFeatureToggle} from './lib/featureProvider/useFeature';
import {featuresKeys} from './lib/keys';
import {queryClient} from './lib/queryClient';
import {updateFeature} from './mutations/features.native';

export const SettingsScreen = () => {
  const showChatListAvatar = useFeatureToggle('chat-list-avatar');
  const [toggleValue, setToggleValue] = useState<undefined | boolean>();

  useEffect(() => {
    if (toggleValue === undefined) {
      setToggleValue(showChatListAvatar);
    }
  }, [showChatListAvatar, setToggleValue, toggleValue]);

  const switchToggle = useMutation({
    mutationKey: featuresKeys.update(),
    mutationFn: updateFeature,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: featuresKeys.all});
      setToggleValue(!toggleValue);
    },
  });

  return (
    <View
      style={{
        maxHeight: '100%',
        flexDirection: 'row',
        marginVertical: 20,
        marginLeft: 20,
      }}>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={showChatListAvatar ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() =>
          switchToggle.mutate({
            featureName: 'chat-list-avatar',
            isEnabled: Number(!toggleValue),
          })
        }
        value={toggleValue ?? false}
      />
      <Text>{'Show Avatar'}</Text>
    </View>
  );
};
