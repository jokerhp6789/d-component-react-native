import React from "react";
import {
  TouchableOpacity as TouchableOpacityRN,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
} from "react-native";
import { getListStyleProps, getStyleProps } from "../../style/style";
import { ThemeProps } from "../../interface/iTheme";

export interface ITouchableOpacityProps
  extends TouchableOpacityProps,
    ThemeProps {
  className?: string;
  children?: any;
}

export interface ITouchableOpacityMethod {}

const TouchableOpacity: React.ForwardRefRenderFunction<
  ITouchableOpacityMethod,
  ITouchableOpacityProps
> = ({ children, style, useLightColor, colorDarkMode, ...rest }, ref) => {
  const listStyle = getListStyleProps(
    rest,
    style,
    colorDarkMode,
    useLightColor
  );
  return (
    <TouchableOpacityRN {...rest} style={listStyle}>
      {children}
    </TouchableOpacityRN>
  );
};

export default React.forwardRef(TouchableOpacity);
