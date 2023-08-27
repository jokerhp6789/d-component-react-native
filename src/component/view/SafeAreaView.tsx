import React from "react";
import { SafeAreaView as SafeAreaViewRN, ViewProps } from "react-native";
import { ThemeProps } from "../../interface/iTheme";
import { getStyleWithTheme } from "../../style/style";

export interface ISafeAreaViewProps extends ViewProps, ThemeProps {
  className?: string;
  children?: any;
}

const SafeAreaView: React.FC<ISafeAreaViewProps> = ({
  children,
  style,
  useLightColor,
  colorDarkMode,
  ...rest
}) => {
  const listStyle = getStyleWithTheme(
    rest,
    style,
    colorDarkMode,
    useLightColor
  );
  return <SafeAreaViewRN style={listStyle}>{children}</SafeAreaViewRN>;
};

export default SafeAreaView;
