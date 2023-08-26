import ClassNames from "classnames";
import React, { useMemo } from "react";
import { useColorScheme, ViewStyle } from "react-native";
import { ColorKeyType } from "../../style/constant/AppColors";
import { getColorValue } from "../../style/modifier";
import View from "../view/View";

export interface IProgressBarProps {
  variant?: "line" | "circel" | "dashboard";
  size?: "medium" | "large" | "small" | "x-large" | "x-small";
  strokeColor?: ColorKeyType;
  strokeColorDarkMode?: ColorKeyType;
  trailColor?: ColorKeyType;
  trailColorDarkMode?: ColorKeyType;
  className?: string;
  classNameStroke?: string;
  style?: ViewStyle;
  percent?: number;
  showInfo?: boolean;
  height?: number;
  rounded?: boolean;
}

const ProgressBar: React.FC<IProgressBarProps> = ({
  variant = "line",
  size,
  strokeColor = "primary",
  strokeColorDarkMode,
  trailColor = "grayLight",
  trailColorDarkMode,
  className,
  classNameStroke,
  style,
  percent = 0,
  showInfo,
  height = 10,
  rounded = true,
}) => {
  const isDarkMode = useColorScheme() === "dark";
  const bgColor = isDarkMode
    ? getColorValue(trailColorDarkMode) || getColorValue(trailColor as any)
    : getColorValue(trailColor as any);
  const lineColor = isDarkMode
    ? getColorValue(strokeColorDarkMode) || getColorValue(strokeColor as any)
    : getColorValue(strokeColor as any);
  const wrapperClass = ClassNames(
    `flex-center-y`,
    {
      "rounded-2": rounded,
    },
    className
  );

  const strokeClass = ClassNames(
    ``,
    {
      "rounded-2": rounded,
    },
    classNameStroke
  );

  const trailWidth = useMemo(() => {
    switch (size) {
      case "x-large":
        return 150;
      case "large":
        return 125;
      case "medium":
        return 100;
      case "small":
        return 75;

      default:
        return 50;
    }
  }, [size]);
  const strockWidth = useMemo(() => {
    return percent * trailWidth;
  }, [percent, trailWidth]);

  const wrapperStyle: ViewStyle[] = [
    { backgroundColor: bgColor, width: trailWidth, height },
    style || {},
  ];
  const strokeStyle: ViewStyle[] = [
    { width: strockWidth, backgroundColor: lineColor, height },
  ];

  return (
    <View className={wrapperClass} style={wrapperStyle}>
      <View style={strokeStyle} className={strokeClass} />
    </View>
  );
};

export default ProgressBar;
