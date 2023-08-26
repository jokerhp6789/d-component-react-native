import ClassNames from "classnames";
import React from "react";
import { Dimensions, Modal } from "react-native";
import ImageViewer, {
  ImageViewerPropsDefine,
} from "react-native-image-zoom-viewer";
import Icon from "../icon/Icon";
import View from "../view/View";

const { width } = Dimensions.get("window");
export interface IImageViewerModalProps
  extends Omit<ImageViewerPropsDefine, "imageUrls" | "onCancel"> {
  open: boolean;
  value: ImageViewerPropsDefine["imageUrls"];
  onClose?: ImageViewerPropsDefine["onCancel"];
  customFooter?: ((currentIndex: number) => Element) | Element;
  leftFooterView?: ((currentIndex: number) => Element) | Element;
  classNameFooter?: string;
}

const ImageViewerModal: React.FC<IImageViewerModalProps> = ({
  open,
  value,
  onClose,
  customFooter,
  leftFooterView,
  index = 0,
  classNameFooter,
  ...rest
}) => {
  const footerClass = ClassNames(
    "flex-center-y justify-content-between bg-transparent height-70 p-3",
    classNameFooter
  );

  const renderFooter = (index: number) => {
    if (customFooter) {
      if (typeof customFooter === "function") {
        return customFooter(index);
      }
      return customFooter;
    }
    const leftView = () => {
      if (typeof leftFooterView === "function") {
        return leftFooterView(index);
      }
      return leftFooterView;
    };
    return (
      <View className={footerClass} style={{ width }}>
        <View>{leftFooterView ? leftView() : null}</View>
        <Icon name="cancel" onPress={onClose} size={30} color="light" />
      </View>
    );
  };
  return (
    <Modal visible={open} transparent>
      <ImageViewer
        {...rest}
        imageUrls={value}
        enableSwipeDown
        onCancel={onClose}
        renderFooter={renderFooter as any}
        index={index === -1 ? 0 : index}
      />
    </Modal>
  );
};

export default ImageViewerModal;
