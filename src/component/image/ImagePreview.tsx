import React, { useState } from "react";
import ClassNames from "classnames";
import TouchableOpacity from "../view/TouchableOpacity";
import View from "../view/View";
import Image, { IImageProps } from "./Image";
import ImageViewerModal from "./ImageViewerModal";
import { IAvatarProps } from "../avatar/Avatar";

export interface IImagePreviewProps extends Partial<IImageProps> {
  showLightBox?: boolean;
  onPress?: (props?: any) => any;
  uri?: string;
  size?: IAvatarProps["size"];
  classNameContainer?: string;
}

const ImagePreview: React.FC<IImagePreviewProps> = ({
  showLightBox,
  onPress,
  source,
  uri,
  size = "medium",
  className,
  classNameContainer,
  ...rest
}) => {
  const [openLightBox, setOpenLightBox] = useState(false);
  const imageClass = ClassNames(
    `my-2 image-square-x-large image-square-${size}`,
    className
  );

  return (
    <View className={classNameContainer}>
      <TouchableOpacity
        onPress={() => {
          if (onPress) {
            return onPress();
          }
          if (showLightBox) {
            return setOpenLightBox(true);
          }
        }}
      >
        <Image
          {...rest}
          source={uri ? { uri } : (source as any)}
          className={imageClass}
        />
      </TouchableOpacity>
      {openLightBox && (
        <ImageViewerModal
          open={openLightBox}
          onClose={() => setOpenLightBox(false)}
          value={[{ url: source } as any]}
        />
      )}
    </View>
  );
};

export default ImagePreview;
