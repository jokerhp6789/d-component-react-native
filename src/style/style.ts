/* eslint-disable no-nested-ternary */
import { forEach, split, isEmpty } from "lodash";
import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  FlexStyle,
  ImageStyle,
  useColorScheme,
} from "react-native";
import flexStyle from "./layout/_flex";
import marginPadding from "./layout/_padding-margin";
import backgroundStyle from "./theme/_background";
import borderStyle from "./theme/_border";
import widthHeightStyle from "./layout/_width-height";
import textStyle from "./text/_text";
import positionStyle from "./layout/_position";
import imageStyle from "./image/_image";
import shadowStyle from "./theme/_shadow";
import { Colors } from "..";
import { getColorValue } from "./modifier";

const { dark, light } = Colors;

export const getStyleProps = (props: any, key?: string) => {
  const keyProps = key || "className";
  const classStr = props?.[keyProps] ?? "";
  const classArr = split(classStr, " ");
  const styleProps: ViewStyle[] | TextStyle[] | ImageStyle[] | FlexStyle[] = [];
  if (!isEmpty(classArr)) {
    try {
      forEach(classArr, (name: any) => {
        if (style?.[name as keyof typeof style]) {
          styleProps.push(style[name as keyof typeof style]);
        }
      });
    } catch (error) {
      console.error("GET STYLE PROPS ERROR", { error });
    }
  }
  return styleProps;
};

export const getListStyleProps = (
  rest: any,
  styleProps: any,
  colorDarkMode?: string,
  useLightColor?: boolean
): ViewStyle[] => {
  const tranStyle = getStyleProps(rest);
  const isDarkMode = useColorScheme() === "dark";
  const backgroundColor = isDarkMode ? dark : useLightColor ? light : undefined;
  const listStyle: ViewStyle[] = [{ backgroundColor }, tranStyle as any];
  if (styleProps) {
    listStyle.push(styleProps);
  }
  if (isDarkMode && colorDarkMode) {
    const backgroundColor = getColorValue(colorDarkMode);
    listStyle.push({ backgroundColor });
  }
  return listStyle;
};

const style = StyleSheet.create({
  ...flexStyle,
  ...marginPadding,
  ...backgroundStyle,
  ...borderStyle,
  ...widthHeightStyle,
  ...textStyle,
  ...positionStyle,
  ...imageStyle,
  ...shadowStyle,
});

export default style;
