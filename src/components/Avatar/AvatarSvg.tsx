import React from 'react';
import {StyleSheet} from 'react-native';
import Svg, {Rect, Text as SVGText} from 'react-native-svg';

type Props = {
  initials?: string;
  size: {height: number; width: number};
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
};

type CharDictionary = {
  [key: string]: string;
};

const COLORS: CharDictionary = {
  A: '#b30003',
  B: '#48ae02',
  C: '#ff7600',
  D: '#0197d6',
  E: '#c85bc4',
  F: '#00a4a0',
  G: '#8d55c0',
  H: '#f7046e',
  I: '#930906',
  J: '#adca16',
  K: '#f6b900',
  L: '#005ca9',
  M: '#ff7979',
  N: '#747b00',
  O: '#5f56c1',
  P: '#c40000',
  Q: '#460070',
  R: '#36773d',
  S: '#fd8100',
  T: '#5c8158',
  U: '#760173',
  V: '#626262',
  W: '#00b056',
  X: '#d82304',
  Y: '#904436',
  Z: '#007663',
  1: '#b30003',
  2: '#48ae02',
  3: '#ff7600',
  4: '#0197d6',
  5: '#c85bc4',
  6: '#00a4a0',
  7: '#760173',
  8: '#f7046e',
  9: '#930906',
};

export const AvatarSvg = ({
  initials,
  size,
  borderRadius,
  borderWidth,
  borderColor,
}: Props) => {
  const {height, width} = StyleSheet.flatten(size);
  const char = initials ? initials.substr(0, 1).toUpperCase() : undefined;

  const backgroundColor = getBackgroundColor(char);

  return (
    <Svg height={height} width={width}>
      <Rect
        x={borderWidth}
        y={borderWidth}
        rx={borderRadius}
        ry={borderRadius}
        width={width - 2 * borderWidth}
        height={height - 2 * borderWidth}
        fill={backgroundColor}
        stroke={borderColor}
        strokeWidth={borderWidth}
      />
      <SVGText
        fill={'#fff'}
        stroke={'#fff'}
        fontSize={height / 2}
        fontWeight="bold"
        x="50%"
        y={'52%'}
        alignmentBaseline="middle"
        textAnchor="middle">
        {initials ?? '?'}
      </SVGText>
    </Svg>
  );
};

const getBackgroundColor = (char?: string) => {
  if (!char) {
    return '#ccc';
  }

  return COLORS[char] ?? '#ccc';
};
