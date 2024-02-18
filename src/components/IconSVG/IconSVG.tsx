import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import MarkRead from '../../assets/mail-symbol-icon.svg';
import QuoteRight from '../../assets/quote-right-icon.svg';
import RecycleBin from '../../assets/recycle-bin-icon.svg';
import ReplyArrow from '../../assets/reply-arrow-icon.svg';

type Size =
  | 'original'
  | 'xxxLarge'
  | 'xxLarge'
  | 'xLarge'
  | 'large'
  | 'medium'
  | 'small';

export type IconName =
  | 'recycle-bin'
  | 'reply-arrow'
  | 'quote-right'
  | 'mark-read';

type Props = {
  name: IconName;
  tintColor?: string;
  secondaryTintColor?: string;
  size?: Size;
  style?: StyleProp<ViewStyle>;
  height?: number;
  width?: number;
};

export const IconSvg = ({
  name,
  tintColor,
  secondaryTintColor,
  size = 'small',
  style,
  width,
  height: propsHeight,
}: Props) => {
  const height = propsHeight ?? heightBySize[size];
  const IconComponent = iconComponentByName[name];

  return (
    <IconComponent
      {...(height && {height})}
      {...(width && {width})}
      fill={tintColor ?? '#000'}
      stroke={secondaryTintColor ?? '#000'}
      style={style}
    />
  );
};

const heightBySize: Record<Size, number | undefined> = {
  original: undefined,
  xxxLarge: 75,
  xxLarge: 65,
  xLarge: 45,
  large: 35,
  medium: 25,
  small: 20,
};

const iconComponentByName: Record<IconName, ImageSvg> = {
  'recycle-bin': RecycleBin,
  'reply-arrow': ReplyArrow,
  'quote-right': QuoteRight,
  'mark-read': MarkRead,
};
