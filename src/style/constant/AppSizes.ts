/**
 * App Theme - Sizes
 */

import { Dimensions } from "react-native";
import DeviceInfo from "react-native-device-info";
import _ from "lodash";

const { width, height } = Dimensions.get("window");

const DefaultSize = {
  screenHeight: DeviceInfo.isTablet() && height > width ? width : height,
  screenWidth: DeviceInfo.isTablet() && height > width ? height : width,

  iconSize: 25,
  inputHeight: 30,
  buttonHeight: 30,

  paddingXXXLarge: 26,
  paddingXXLarge: 24,
  paddingXLarge: 22,
  paddingLarge: 20,
  padding: 18,
  paddingMedium: 16,
  paddingXMedium: 14,
  paddingXXMedium: 12,
  paddingSml: 10,
  paddingXSml: 8,
  paddingXXSml: 6,
  paddingTiny: 4,
  paddingXTiny: 2,
  paddingXXTiny: 1,
  paddingMicro: 0.5,

  fontXXSmall: 8,
  fontXSmall: 10,
  fontSmall: 12,
  fontBase: 14,
  fontMedium: 16,
  fontXMedium: 18,
  fontXXMedium: 20,
  fontLarge: 22,
  fontXLarge: 24,
  fontXXLarge: 26,

  borderTiny: 0.5,
  borderSmall: 1,
  borderMedium: 2,
  borderLarge: 3,
  borderXLarge: 4,

  borderRadiusTiny: 4,
  borderRadiusSmall: 6,
  borderRadiusMedium: 8,
  borderRadiusLarge: 10,
  borderRadiusXLarge: 12,
};

export type AppSizeKeyType = keyof typeof DefaultSize;

export default DefaultSize;
