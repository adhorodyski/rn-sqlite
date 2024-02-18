import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useFeatureToggle} from '../../lib/featureProvider/useFeature';
import {AvatarSvg} from './AvatarSvg';

const defaultInitials = '??';

type Shape = 'circle' | 'super-rounded' | 'rounded' | 'barely-rounded';
type Size = 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';

type Props = {
  initials?: string;
  size: Size;
  shape?: Shape;
  borderWidth?: number;
  color?: string;
  backgroundColor?: string;
  selectable?: boolean;
  selected?: boolean;
  disabled?: boolean;
  showDefaultImage?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Avatar = ({
  initials = defaultInitials,
  style,
  size,
  ...rest
}: Props) => {
  const shape = rest.shape ?? 'circle';

  const sizeStyle = styles[size] || styles.small;
  const borderRadius = getBorderRadius(
    shape,
    StyleSheet.flatten(sizeStyle).width,
  );
  const borderWidth = rest.borderWidth ?? 0;
  const borderColor = rest.color || '#fff';

  const disabled = rest.disabled;

  const showChatListAvatar = useFeatureToggle('chat-list-avatar');

  if (!showChatListAvatar) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[sizeStyle]}
        disabled={disabled}
        onPress={() => console.log('Pressed Avatar')}>
        <AvatarSvg
          size={sizeStyle}
          borderRadius={borderRadius * 2}
          borderWidth={borderWidth}
          borderColor={borderColor}
          initials={initials}
        />
      </TouchableOpacity>
    </View>
  );
};

const getBorderRadius = (shape: Shape | undefined, width: number) => {
  switch (shape) {
    case 'circle':
      return width / 2;
    case 'super-rounded':
      return width / 4;
    case 'rounded':
      return width / 10;
    case 'barely-rounded':
      return width / 20;
    default:
      return width / 2;
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  small: {
    width: 40,
    height: 40,
  },
  medium: {
    width: 60,
    height: 60,
  },
  large: {
    width: 80,
    height: 80,
  },
  'x-large': {
    width: 120,
    height: 120,
  },
  'xx-large': {
    width: 180,
    height: 180,
  },
});
