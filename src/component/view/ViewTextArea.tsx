import React, { useMemo, useState } from "react";
import { ViewProps, ViewStyle, TextStyle } from "react-native";
import { ThemeProps } from "../../interface/iTheme";
import { getListStyleProps } from "../../style/style";
import View from "./View";
import Text, { ITextProps } from "../text/Text";
import Button from "../button/Button";
import Modal, { IModalProps } from "../modal/Modal";
import TouchableOpacity from "./TouchableOpacity";

export interface IViewTextAreaProps extends ThemeProps {
  children: string;
  style?: ViewStyle;
  styleContent?: TextStyle;
  styleShowMore?: TextStyle;
  styleShowLess?: TextStyle;
  showMoreText?: string;
  showLessText?: string;
  limitedLength?: number;
  className?: string;
  classNameContent?: string;
  classNameShowMore?: string;
  classNameShowLess?: string;
  textContentProps?: ITextProps;
  modalProps?: IModalProps;
  variant?: "modal" | "expand";
}

const ViewTextArea: React.FC<IViewTextAreaProps> = ({
  children,
  style,
  styleContent = {},
  styleShowLess,
  styleShowMore,
  className,
  classNameContent,
  classNameShowMore,
  classNameShowLess,
  limitedLength = 200,
  textContentProps = {},
  modalProps = {},
  showLessText = "Show Less",
  showMoreText = "Show More",
  variant = "modal",
  colorDarkMode,
  useLightColor,
  ...rest
}) => {
  if (typeof children !== "string") {
    throw Error("children is not string!");
  }

  const textStyle = "h4";

  const isOverFollow = useMemo(() => {
    return children && children?.length > limitedLength;
  }, [children, limitedLength]);
  const [showFullMessage, setShowFullMessage] = useState(false);

  const displayShowLess = useMemo(() => {
    return showFullMessage && variant === "expand";
  }, [showFullMessage, variant]);

  const displayText = useMemo(() => {
    let content = children;
    if (showFullMessage && variant === "expand") {
      return content;
    }
    if (isOverFollow) {
      content = children.substring(0, limitedLength);
    }
    return content;
  }, [children, isOverFollow, showFullMessage, limitedLength]);

  const getShowMoreText = () => {
    if (displayShowLess) {
      return showLessText;
    }
    return showMoreText;
  };

  const showDot = useMemo(() => {
    if (displayShowLess) {
      return false;
    }
    if (isOverFollow) {
      return true;
    }
    return false;
  }, [isOverFollow, showFullMessage]);

  return (
    <React.Fragment>
      <View
        style={style}
        className={className}
        colorDarkMode={colorDarkMode}
        useLightColor={useLightColor}
      >
        <Text
          className={`${textStyle} ${classNameContent}`}
          style={{ ...styleContent }}
          {...textContentProps}
        >
          {displayText}{" "}
          {showDot && <Text className={`${textStyle} h3`}>...</Text>}
          {isOverFollow && (
            <TouchableOpacity
              onPress={() => {
                if (variant === "expand") {
                  setShowFullMessage(!showFullMessage);
                } else {
                  setShowFullMessage(true);
                }
              }}
              colorDarkMode="transparent"
            >
              <Text
                className={`ml-2 text-secondary  py-0 h4 ${
                  displayShowLess ? classNameShowLess : classNameShowMore
                }`}
                style={displayShowLess ? styleShowLess : styleShowMore}
              >
                {getShowMoreText()}
              </Text>
            </TouchableOpacity>
          )}
        </Text>
      </View>
      {showFullMessage && variant === "modal" && (
        <Modal
          onClose={() => setShowFullMessage(false)}
          size="medium"
          showFooter
          useScrollView
          showSaveButton={false}
          classNameFooter="justify-content-end"
          {...modalProps}
          open={showFullMessage}
        >
          <Text className={`${textStyle} mt-2`} colorDarkMode="light">
            {children}
          </Text>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default ViewTextArea;
