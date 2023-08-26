import ClassNames from "classnames";
import React from "react";
// import { Text } from "react-native";
import { IButtonProps } from "../button/Button";
import Image, { IImageProps } from "../image/Image";
import Text from "../text/Text";
import View from "../view/View";

export interface IAvatarProps extends Omit<IImageProps, "source"> {
  size?:
    | "xx-large"
    | "x-large"
    | "large"
    | "medium"
    | "small"
    | "x-small"
    | "xx-small"
    | "tiny";
  variant?: "rounded" | "square" | "circle";
  text?: string;
  color?: string;
  classNameImage?: string;
  classNameLetter?: string;
  avatar?: IImageProps["source"] | string | null;
  styleImage?: IImageProps["style"];
  showBorder?: boolean;
  borderColor?: IButtonProps["color"];
}

const Avatar: React.FC<IAvatarProps> = ({
  size = "medium",
  avatar,
  variant = "circle",
  className,
  classNameImage,
  classNameLetter,
  text,
  color = "#D8D8D8",
  borderColor = "gray",
  resizeMode = "cover",
  resizeMethod = "auto",
  style,
  styleImage,
  showBorder,
  ...rest
}) => {
  const letterClass = ClassNames(
    "text-white text-center font-weight-bold",
    {
      "font-size-80": size === "xx-large",
      "font-size-60": size === "x-large",
      "font-size-48": size === "large",
      "font-size-36": size === "medium",
      "font-size-30": size === "small",
      "font-size-20": size === "x-small",
      h3: size === "xx-small",
      h4: size === "tiny",
    },
    classNameLetter
  );
  const wrapperClass = ClassNames(
    `position-relative image-square-${size} bg-red`,
    {
      "justify-content-center align-items-center": !!text,
      "rounded-pill": variant === "circle",
      "rounded-1": variant === "rounded",
      [`border-2 border-${borderColor}`]: showBorder,
    },
    className
  );
  const imageClass = ClassNames("w-100 h-100", {
    "rounded-pill": variant === "circle",
    "rounded-1": variant === "rounded",
  });
  let content;

  const getSource = () => {
    if (typeof avatar === "string") {
      return { uri: avatar };
    }
    return avatar;
  };

  if (text) {
    const firstLetter = text.charAt(0);
    content = <Text className={letterClass}>{firstLetter}</Text>;
  }
  if (avatar) {
    content = (
      <Image
        source={getSource() as any}
        className={imageClass}
        resizeMode={resizeMode}
        resizeMethod={resizeMethod}
        style={styleImage}
        {...rest}
      />
    );
  }
  return (
    <View className={wrapperClass} style={[{ backgroundColor: color }, style]}>
      {content}
    </View>
  );
};

export default Avatar;
