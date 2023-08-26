import ClassNames from "classnames";
import React from "react";
import RNModal, { ModalProps } from "react-native-modal";
import { ThemeProps } from "../../interface/iTheme";
import { getStyleProps } from "../../style/style";
import Button, { IButtonProps } from "../button/Button";
import Header, { IHeaderProps } from "../header/Header";
import SafeAreaView from "../view/SafeAreaView";
import ScrollView from "../view/ScrollView";
import View from "../view/View";

export interface IModalProps
  extends Partial<ModalProps>,
    Omit<IHeaderProps, "children" | "size">,
    ThemeProps {
  open: boolean;
  size?: "fullscreen" | "large" | "medium" | "small";
  position?: "bottom" | "center" | "top";
  className?: string;
  classNameModal?: string;
  classNameContainer?: string;
  classNameHeader?: string;
  classNameFooter?: string;
  cancelText?: string;
  saveText?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  showCancelButton?: boolean;
  showSaveButton?: boolean;
  useScrollView?: boolean;
  disabledSave?: boolean;
  onClose?: (props?: any) => void;
  onSave?: (props?: any) => void;
  customHeader?: ((props?: any) => Element) | Element;
  customFooter?: ((props?: any) => Element) | Element;
  cancelButtonProps?: IButtonProps;
  saveButtonProps?: IButtonProps;
  swipeable?: boolean;
  closable?: boolean;
}

const Modal: React.FC<IModalProps> = ({
  children,
  open,
  onClose,
  onSave,
  size = "fullscreen",
  position = "center",
  showHeader,
  showFooter,
  showCancelButton = true,
  showSaveButton = true,
  swipeable = true,
  disabledSave,
  className,
  classNameModal,
  classNameContainer,
  classNameHeader,
  classNameFooter,
  title,
  cancelText = "Cancel",
  saveText = "Save",
  useScrollView,
  cancelButtonProps = {},
  saveButtonProps = {},
  onLeftPress,
  onRightPress,
  customHeader,
  customFooter,
  customRight,
  customLeft,
  leftIcon,
  leftText,
  rightIcon,
  rightText,
  theme,
  swipeDirection = "down",
  useLightColor = true,
  colorDarkMode,
  closable = true,
  onBackdropPress,
  ...rest
}) => {
  const modalClass = ClassNames(
    "",
    {
      "m-0": size === "fullscreen",
      "mx-0": size === "large",
      "mx-6": size === "medium",
      "mx-10": size === "small",
      "justify-content-end": position === "bottom",
      "justify-content-start": position === "top",
    },
    classNameModal
  );
  const containerClass = ClassNames(
    { "flex-1": size === "fullscreen" },
    classNameContainer
  );
  const contentClass = ClassNames("px-3 py-2", className);

  const headerClass = ClassNames("", classNameHeader);
  const footerClass = ClassNames(
    "flex-center-y justify-content-between px-3 py-2",
    {
      "justify-content-end": !showCancelButton,
    },
    classNameFooter
  );

  const renderHeader = () => {
    if (customHeader) {
      if (typeof customHeader === "function") {
        return customHeader();
      }
      return customHeader;
    }
    return (
      <Header
        title={title}
        onLeftPress={() => {
          if (onLeftPress) {
            return onLeftPress();
          }
          onClose && onClose();
        }}
        onRightPress={onRightPress}
        className={headerClass}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        leftText={leftText}
        rightText={rightText}
        theme={theme}
        customRight={customRight}
        customLeft={customLeft}
      />
    );
  };

  const renderMainView = () => {
    if (useScrollView) {
      return (
        <ScrollView>
          <View className={contentClass}>{children}</View>
        </ScrollView>
      );
    }
    return <View className={contentClass}>{children}</View>;
  };

  const renderFooter = () => {
    if (customFooter) {
      if (typeof customFooter === "function") {
        return customFooter();
      }
      return customFooter;
    }
    return (
      <View className={footerClass}>
        {showCancelButton && (
          <Button onPress={onClose} color="grey" {...cancelButtonProps}>
            {cancelText}
          </Button>
        )}
        {showSaveButton && (
          <Button disabled={disabledSave} onPress={onSave} {...saveButtonProps}>
            {saveText}
          </Button>
        )}
      </View>
    );
  };

  const hanldeBackDropPress = () => {
    if (closable) {
      return onClose && onClose();
    }
    return onBackdropPress;
  };

  return (
    <ModalTrans
      onSwipeMove={onClose}
      swipeDirection={
        // eslint-disable-next-line no-nested-ternary
        useScrollView ? undefined : swipeable ? swipeDirection : undefined
      }
      {...(rest as any)}
      isVisible={open}
      backdropTransitionInTiming={700}
      backdropTransitionOutTiming={300}
      onBackdropPress={hanldeBackDropPress}
      hideModalContentWhileAnimating
      className={modalClass}
    >
      <SafeAreaView
        className={containerClass}
        useLightColor={useLightColor}
        colorDarkMode={colorDarkMode}
      >
        {showHeader && renderHeader()}
        {renderMainView()}
        {showFooter && renderFooter()}
      </SafeAreaView>
    </ModalTrans>
  );
};

export default Modal;

export interface IModalTransProps extends ModalProps {
  className?: string;
}

export const ModalTrans: React.FC<IModalTransProps> = ({
  children,
  style,
  ...rest
}) => {
  const transStyle = getStyleProps(rest);
  return (
    <RNModal style={[{ marginBottom: 0 }, transStyle, style]} {...rest}>
      {children}
    </RNModal>
  );
};
