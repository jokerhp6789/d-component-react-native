/** @format */

import ClassNames from 'classnames';
import {isEmpty} from 'lodash';
import React, {
    ElementRef,
    useContext,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    Platform,
    TextInput as RNTextInput,
    StyleProp,
    TextInputProps,
    TextStyle,
    ViewStyle,
} from 'react-native';
import StyleStateContext from '../../context/StyleContext';
import useKeyBoard from '../../hooks/useKeyboard';
import {ThemeProps} from '../../interface/iTheme';
import Colors from '../../style/color/_color';
import Configs from '../../style/config/_config';
import {ColorKeyType} from '../../style/constant/AppColors';
import {getThemeColor} from '../../style/modifier';
import Sizes from '../../style/size/_size';
import {getStyleProps} from '../../style/style';
import Icon, {IIconProps} from '../icon/Icon';
import Text from '../text/Text';
import View from '../view/View';

export type InputVariantType =
    | 'standard'
    | 'outline'
    | 'rounded'
    | 'pill'
    | 'trans';

export interface IInputTextProps extends TextInputProps, ThemeProps {
    variant?: InputVariantType;
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
    classNamePrefixIcon?: string;
    classNameError?: string;
    iconName?: string;
    prefixIcon?: string;
    iconSize?: number;
    style?: ViewStyle;
    styleInput?: StyleProp<TextStyle>;
    useKeyboardAvoidingView?: boolean;
    offsetSpaceKeyboard?: number;
    iconProps?: Partial<IIconProps>;
    prefixIconProps?: Partial<IIconProps>;
    onPressIcon?: (props?: any) => any;
    onPressPrefixIcon?: (props?: any) => any;
    renderPrefixIcon?:
        | ((
              props?: Partial<IIconProps> & {focusing: boolean; error?: any},
          ) => React.ReactNode)
        | React.ReactNode;
    renderSuffixIcon?:
        | ((
              props?: Partial<IIconProps> & {focusing: boolean; error?: any},
          ) => React.ReactNode)
        | React.ReactNode;
}

export interface IInputTextMethod extends ITextInputMethods {}

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
    iconName = 'info',
    iconSize = 12,
}) => {
    const errorClass = ClassNames('flex-center-y', className);
    const textClass = ClassNames('text-error h5 ml-1', classNameText);

    if (isEmpty(error) && typeof error !== 'string') {
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
        variant: variantProps,
        error,
        label,
        height = Sizes.inputHeight,
        color = 'grey',
        colorFocus = Colors?.inputColorFocus ?? 'primary',
        colorDark = Colors?.inputColorDark,
        className,
        classNameInput,
        classNameIcon,
        classNamePrefixIcon,
        classNameWrapper,
        classNameLabel,
        classNameError,
        style,
        styleInput,
        iconName,
        prefixIcon,
        iconSize = 20,
        onBlur,
        onFocus,
        onPressIcon,
        onPressPrefixIcon,
        colorDarkMode,
        useLightColor = true,
        useKeyboardAvoidingView,
        offsetSpaceKeyboard,
        iconProps = {},
        prefixIconProps = {},
        renderPrefixIcon,
        renderSuffixIcon,
        ...rest
    },
    ref,
) => {
    const {light} = Colors;
    const {inputConfig} = Configs;
    const {colorSchema} = useContext(StyleStateContext);
    const inputRef = useRef<ElementRef<typeof TextInput>>(null);
    const {variant: variantConfig} = inputConfig || {};
    const isDarkMode = colorSchema === 'dark';
    const [focusing, setFocusing] = useState(false);
    const variant: InputVariantType =
        variantProps || variantConfig || 'standard';

    const hasBorder =
        variant === 'outline' || variant === 'pill' || variant === 'rounded';

    const containerClass = ClassNames(`w-100`, `${className}`);
    const labelClass = ClassNames(
        `h4`,
        {
            'mb-1': hasBorder,
            'font-weight-bold': focusing,
        },
        `${classNameLabel}`,
    );
    const wrapperClass = ClassNames(
        'flex-center-y justify-content-center',
        {
            border: hasBorder,
            [`border-${color}`]: hasBorder,
            'border-bottom-1': variant === 'standard',
            'rounded-pill': variant === 'pill',
            'rounded-1': variant === 'rounded',
            [`border-${colorFocus}`]: focusing,
            [`border-${colorDark}`]: focusing && isDarkMode && !!colorDark,
            'border-error': !!error,
            'px-1': variant === 'pill',
        },
        classNameWrapper,
    );
    const inputClass = ClassNames(
        'flex-1 h4 px-2',
        {
            'py-2': Platform.OS === 'android',
        },
        classNameInput,
    );
    const errorClass = ClassNames(
        'mt-1',
        {
            'px-2': variant === 'pill',
        },
        classNameError,
    );

    const {isKeyboardShow, heightKeyboard} = useKeyBoard(false);
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
        return Platform.OS === 'ios' ? heightKeyboard - 50 : heightKeyboard;
    }, [heightKeyboard, isKeyboardShow, focusing]);

    useImperativeHandle(ref, () => ({
        clear: () => inputRef.current && inputRef?.current.clear?.(),
        blur: () => inputRef.current && inputRef?.current.blur?.(),
        focus: () => inputRef.current && inputRef?.current.focus?.(),
    }));

    const customPrefix = (otherProps: any) => {
        if (renderPrefixIcon) {
            if (typeof renderPrefixIcon === 'function') {
                return renderPrefixIcon({...(otherProps || {})});
            }
            return renderPrefixIcon;
        }

        return null;
    };

    const customSuffix = (otherProps: any) => {
        if (renderSuffixIcon) {
            if (typeof renderSuffixIcon === 'function') {
                return renderSuffixIcon({...(otherProps || {})});
            }
            return renderSuffixIcon;
        }
        return null;
    };

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
            useLightColor={useLightColor}>
            {label && <Text className={labelClass}>{label}</Text>}
            <View className={wrapperClass}>
                {prefixIcon && (
                    <Icon
                        name={prefixIcon}
                        color={
                            // eslint-disable-next-line no-nested-ternary
                            focusing
                                ? error
                                    ? 'error'
                                    : getThemeColor({
                                          colorScheme: colorSchema,
                                          colorLightMode: colorFocus,
                                          colorDarkMode:
                                              colorDark || colorFocus,
                                      })
                                : error
                                ? 'error'
                                : color
                        }
                        type="material"
                        size={iconSize}
                        className={`ml-1 ${classNamePrefixIcon}`}
                        onPress={onPressPrefixIcon}
                        {...prefixIconProps}
                    />
                )}
                {customPrefix({focusing, error})}
                <TextInput
                    className={inputClass}
                    onFocus={e => {
                        onFocus && onFocus(e);
                        setFocusing(true);
                    }}
                    onBlur={e => {
                        onBlur && onBlur(e);
                        setFocusing(false);
                    }}
                    {...rest}
                    style={[
                        {height, color: isDarkMode ? light : undefined},
                        styleInput,
                    ]}
                />
                {customSuffix({focusing, error})}
                {iconName && (
                    <Icon
                        name={iconName}
                        color={
                            // eslint-disable-next-line no-nested-ternary
                            focusing
                                ? error
                                    ? 'error'
                                    : getThemeColor({
                                          colorScheme: colorSchema,
                                          colorLightMode: colorFocus,
                                          colorDarkMode:
                                              colorDark || colorFocus,
                                      })
                                : error
                                ? 'error'
                                : color
                        }
                        type="material"
                        size={iconSize}
                        className={`mr-1 ${classNameIcon}`}
                        onPress={onPressIcon}
                        {...iconProps}
                    />
                )}
            </View>
            {!isEmpty(error) && typeof error === 'string' && (
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

export interface ITextInputMethods extends Partial<RNTextInput> {}

export const TextInputRef: React.ForwardRefRenderFunction<
    ITextInputMethods,
    ITextInputProps
> = ({style, children, ...rest}, ref) => {
    const inputRef = useRef<ElementRef<typeof RNTextInput>>();
    const transStyle = getStyleProps(rest);

    useImperativeHandle(ref, () => ({
        clear: () => inputRef.current && inputRef?.current.clear?.(),
        blur: () => inputRef.current && inputRef?.current.blur?.(),
        focus: () => inputRef.current && inputRef?.current.focus?.(),
    }));

    return (
        <RNTextInput
            ref={inputRef as any}
            style={[transStyle, style]}
            {...rest}
        />
    );
};

export const TextInput = React.forwardRef(TextInputRef);
