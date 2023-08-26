/** @format */

import ClassNames from "classnames";
import { isEmpty } from "lodash";
import React, { useMemo, useState } from "react";
import {
    Platform,
    StyleProp,
    TextInput as RNTextInput,
    TextInputProps,
    TextStyle,
    useColorScheme,
    ViewStyle,
} from "react-native";
import useKeyBoard from "../../hooks/useKeyboard";
import { ThemeProps } from "../../interface/iTheme";
import Colors from "../../style/color/_color";
import { ColorKeyType } from "../../style/constant/AppColors";
import { getThemeColor } from "../../style/modifier";
import Sizes from "../../style/size/_size";
import { getStyleProps } from "../../style/style";
import Icon from "../icon/Icon";
import Text from "../text/Text";
import View from "../view/View";

const { light } = Colors;
export interface IInputTextProps extends TextInputProps, ThemeProps {
    variant?: "standard" | "outline" | "rounded" | "pill" | "trans";
    label?: any;
    error?: any;
    height?: number;
    color?: ColorKeyType;
    colorFocus?: ColorKeyType;
    colorDark?: ColorKeyType;
    className?: string;
    classNameLabel?: string;
    classNameWrapper?: string;
    classNameInput?: string;
    classNameIcon?: string;
    classNameError?: string;
    iconName?: string;
    iconSize?: number;
    style?: ViewStyle;
    styleInput?: StyleProp<TextStyle>;
    onPressIcon?: (props?: any) => any;
    useKeyboardAvoidingView?: boolean;
    offsetSpaceKeyboard?: number;
}

export interface IInputTextMethod {}

export interface IInputErrorViewProps {
    error: any;
    className?: string;
    iconName?: string;
    iconSize?: number;
    classNameText?: string;
}

export const InputErrorView: React.FC<IInputErrorViewProps> = ({
    error,
    className,
    classNameText,
    iconName = "info",
    iconSize = 12,
}) => {
    const errorClass = ClassNames("flex-center-y", className);
    const textClass = ClassNames("text-error h5 ml-1", classNameText);

    if (isEmpty(error) && typeof error !== "string") {
        return null;
    }

    return (
        <View className={errorClass}>
            <Icon name={iconName} size={iconSize} color="error" />
            <Text className={textClass}>{error}</Text>
        </View>
    );
};

const InputText: React.ForwardRefRenderFunction<
    IInputTextMethod,
    IInputTextProps
> = (
    {
        variant = "standard",
        error,
        label,
        height = Sizes.inputHeight,
        color = "grey",
        colorFocus = Colors?.inputColorFocus ?? "primary",
        colorDark = Colors?.inputColorDark,
        className,
        classNameInput,
        classNameIcon,
        classNameWrapper,
        classNameLabel,
        classNameError,
        style,
        styleInput,
        iconName,
        iconSize = 20,
        onBlur,
        onFocus,
        onPressIcon,
        colorDarkMode,
        useLightColor = true,
        useKeyboardAvoidingView,
        offsetSpaceKeyboard,
        ...rest
    },
    ref
) => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";
    const [focusing, setFocusing] = useState(false);
    const hasBorder =
        variant === "outline" || variant === "pill" || variant === "rounded";

    const containerClass = ClassNames(`w-100`, `${className}`);
    const labelClass = ClassNames(
        `h4`,
        {
            "mb-1": hasBorder,
            "font-weight-bold": focusing,
        },
        `${classNameLabel}`
    );
    const wrapperClass = ClassNames(
        "flex-center-y justify-content-center",
        {
            border: hasBorder,
            [`border-${color}`]: hasBorder,
            "border-bottom-1": variant === "standard",
            "rounded-pill": variant === "pill",
            "rounded-1": variant === "rounded",
            [`border-${colorFocus}`]: focusing,
            [`border-${colorDark}`]: focusing && isDarkMode && !!colorDark,
            "border-error": !!error,
            "px-1": variant === "pill",
        },
        classNameWrapper
    );
    const inputClass = ClassNames(
        "flex-1 h4",
        {
            "py-2": Platform.OS === "android",
            "px-2": variant !== "standard" && variant !== "trans",
        },
        classNameInput
    );
    const errorClass = ClassNames(
        "mt-1",
        {
            "px-2": variant === "pill",
        },
        classNameError
    );

    const { isKeyboardShow, heightKeyboard } = useKeyBoard(false);
    const bottomPadding = useMemo(() => {
        if (!useKeyboardAvoidingView || !focusing) {
            return undefined;
        }
        if (!isKeyboardShow) {
            return 0;
        }
        if (offsetSpaceKeyboard) {
            return offsetSpaceKeyboard;
        }
        return Platform.OS === "ios" ? heightKeyboard - 50 : heightKeyboard;
    }, [heightKeyboard, isKeyboardShow, focusing]);

    const content = (
        <View
            className={containerClass}
            key={label}
            style={[
                {
                    paddingBottom: bottomPadding,
                },
                style,
            ]}
            colorDarkMode={colorDarkMode}
            useLightColor={useLightColor}
        >
            {label && <Text className={labelClass}>{label}</Text>}
            <View className={wrapperClass}>
                <TextInput
                    className={inputClass}
                    onFocus={(e) => {
                        onFocus && onFocus(e);
                        setFocusing(true);
                    }}
                    onBlur={(e) => {
                        onBlur && onBlur(e);
                        setFocusing(false);
                    }}
                    {...rest}
                    style={[
                        { height, color: isDarkMode ? light : undefined },
                        styleInput,
                    ]}
                />
                {iconName && (
                    <Icon
                        name={iconName}
                        color={
                            // eslint-disable-next-line no-nested-ternary
                            focusing
                                ? error
                                    ? "error"
                                    : getThemeColor({
                                          colorScheme,
                                          colorLightMode: colorFocus,
                                          colorDarkMode:
                                              colorDark || colorFocus,
                                      })
                                : error
                                ? "error"
                                : color
                        }
                        type="material"
                        size={iconSize}
                        classNameWrapper={`mr-1 ${classNameIcon}`}
                        onPress={onPressIcon}
                    />
                )}
            </View>
            {!isEmpty(error) && typeof error === "string" && (
                <InputErrorView error={error} className={errorClass} />
            )}
        </View>
    );

    // if (useKeyboardAvoidingView && focusing) {
    //     return (
    //         <KeyboardAvoidingView
    //             behavior={Platform.OS === "ios" ? "padding" : "height"}
    //         >
    //             {content}
    //         </KeyboardAvoidingView>
    //     );
    // }
    return content;
};

export default React.forwardRef(InputText);

export interface ITextInputProps extends TextInputProps {
    className?: string;
}

export const TextInput: React.FC<ITextInputProps> = ({
    style,
    children,
    ...rest
}) => {
    const transStyle = getStyleProps(rest);
    return <RNTextInput style={[transStyle, style]} {...rest} />;
};
