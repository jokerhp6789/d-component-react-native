import ClassNames from "classnames";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  TextStyle,
  TouchableOpacityProps,
} from "react-native";
import { ThemeProps } from "../../interface/iTheme";
import { isDark } from "../../style/color/_color";
import { ColorKeyType } from "../../style/constant/AppColors";
import { getColorValue } from "../../style/modifier";
import Sizes from "../../style/size/_size";
import Icon from "../icon/Icon";
import Text from "../text/Text";
import TouchableOpacity from "../view/TouchableOpacity";

const defaultButtonHeight = Sizes?.buttonHeight ?? 30;

export interface IButtonProps
  extends TouchableOpacityProps,
    Omit<ThemeProps, "useLightColor"> {
  className?: string;
  classNameLabel?: string;
  children?: any;
  size?: "large" | "medium" | "small" | "x-small" | "x-large" | "xx-large";
  variant?: "standard" | "outline" | "trans";
  shape?: "square" | "pill" | "rounded";
  color?: ColorKeyType;
  disableColor?: ColorKeyType;
  colorText?: ColorKeyType;
  colorTexDarkMode?: ColorKeyType;
  iconName?: string;
  iconSize?: number;
  suffixIcon?: string;
  suffixElement?: any;
  prefixElement?: any;
  label?: string;
  height?: number | string;
  loading?: boolean;
  styleLabel?: TextStyle;
}

const Button: React.FC<IButtonProps> = ({
  className,
  classNameLabel,
  disableColor = "disabled",
  color = "primary",
  variant = "standard",
  size = "medium",
  shape = "square",
  children,
  iconName,
  iconSize = 14,
  height,
  suffixIcon,
  suffixElement,
  prefixElement,
  label,
  disabled,
  style,
  styleLabel,
  colorDarkMode,
  colorText,
  colorTexDarkMode,
  loading = false,
  ...rest
}) => {
  const buttonColor = useMemo(() => {
    return getColorValue(color);
  }, [color]);

  const buttonDisableBg = useMemo(() => {
    return getColorValue(disableColor);
  }, [disableColor]);

  const buttonHeight = useMemo(() => {
    let result: number | string = 10;
    switch (size) {
      case "xx-large":
        result = defaultButtonHeight + 15;
        break;
      case "x-large":
        result = defaultButtonHeight + 10;
        break;
      case "large":
        result = defaultButtonHeight + 5;
        break;
      case "medium":
        result = defaultButtonHeight;
        break;
      case "small":
        result = defaultButtonHeight - 5;
        break;
      case "x-small":
        result = defaultButtonHeight - 10;
        break;

      default:
        break;
    }
    if (height) {
      result = height;
    }
    return result;
  }, [height, size]);

  const buttonStyle: Array<any> = [{ height: buttonHeight }];

  if (style) {
    buttonStyle.push(style);
  }
  if (buttonDisableBg && disabled) {
    buttonStyle.push({ backgroundColor: buttonDisableBg });
  }

  const wrapperClass = ClassNames(
    "flex-center-y justify-content-center px-3",
    {
      [`bg-${color}`]: variant === "standard",
      [`border border-${color}`]: variant === "outline",
      "rounded-pill": shape === "pill",
      "rounded-2": shape === "rounded",
      "bg-transparent": loading,
    },
    className
  );
  const labelClass = ClassNames(
    "text-center",
    {
      [`text-${color}`]: variant === "outline" || variant === "trans",
      "text-white": variant === "standard" && isDark(buttonColor),
      h3: size === "x-large" || size === "xx-large",
      h4: size === "medium" || size === "large",
      "h5 text-height-14": size === "small" || size === "x-small",
    },
    classNameLabel
  );

  const getIconColor = () => {
    if (variant === "standard" && isDark(buttonColor)) {
      return "light";
    }
    if (variant === "standard" && !isDark(buttonColor)) {
      return "dark";
    }
    return buttonColor;
  };

  let mainView;
  let content = children;
  let suffixView;
  let prefixView;

  if (label) {
    content = label;
  }

  if (typeof content === "string") {
    mainView = (
      <Text
        className={labelClass}
        color={colorText}
        numberOfLines={1}
        colorDarkMode={colorTexDarkMode}
        style={styleLabel}
      >
        {content}
      </Text>
    );
  }

  if (React.isValidElement(content)) {
    mainView = content;
  }

  if (loading) {
    mainView = <ActivityIndicator size="small" />;
  }
  if (iconName) {
    prefixView = (
      <Icon
        name={iconName}
        color={getIconColor()}
        size={iconSize}
        className="mr-2"
      />
    );
  }

  return (
    <TouchableOpacity
      className={wrapperClass}
      style={buttonStyle}
      disabled={disabled}
      colorDarkMode={
        variant === "trans" || loading ? "transparent" : colorDarkMode
      }
      {...rest}
    >
      {!loading && prefixView}
      {mainView}
      {!loading && suffixView}
    </TouchableOpacity>
  );
};

export default Button;
