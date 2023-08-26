import React, { forwardRef } from "react";
import { ScrollView as ScrollViewRN, ScrollViewProps } from "react-native";
import { ThemeProps } from "../../interface/iTheme";
import { getListStyleProps } from "../../style/style";

export interface IScrollViewProps extends ScrollViewProps, ThemeProps {
  className?: string;
  children?: any;
}

export interface IScrollViewMethod {}

const ScrollView: React.ForwardRefRenderFunction<
  IScrollViewMethod,
  IScrollViewProps
> = ({ children, style, colorDarkMode, useLightColor, ...rest }, ref) => {
  const listStyle = getListStyleProps(
    rest,
    style,
    colorDarkMode,
    useLightColor
  );
  return (
    <ScrollViewRN {...rest} style={listStyle}>
      {children}
    </ScrollViewRN>
  );
};

export default forwardRef(ScrollView);
