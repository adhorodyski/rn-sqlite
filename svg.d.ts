declare type ImageSvg = React.FC<
  import('react-native-svg').SvgProps & {
    fill?: string;
    stroke?: string;
  }
>;

declare module '*.svg' {
  const content: ImageSvg;
  export default content;
}
