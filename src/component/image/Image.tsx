import React from "react";
import { Image as ImageRN, ImageProps } from "react-native";
import { getStyleProps } from "../../style/style";

export interface IImageProps extends ImageProps {
  className?: string;
  children?: any;
}

const Image: React.FC<IImageProps> = ({ style, children, source, ...rest }) => {
  const transStyle = getStyleProps(rest);
  return (
    <ImageRN {...rest} style={[transStyle as any, style]} source={source} />
  );
};

export default Image;
