import ClassNames from 'classnames';
import React, {useMemo} from 'react';
import {
    ActivityIndicator,
    TextStyle,
    TouchableOpacityProps,
    useColorScheme,
} from 'react-native';
import {ThemeProps} from '../../interface/iTheme';
import {isDark} from '../../style/color/_color';
import Configs from '../../style/config/_config';
import {ColorKeyType} from '../../style/constant/AppColors';
import {getColorValue} from '../../style/modifier';
import Sizes from '../../style/size/_size';
import Icon, {IIconProps} from '../icon/Icon';
import Text, {ITextProps} from '../text/Text';
import TouchableOpacity from '../view/TouchableOpacity';

const defaultButtonHeight = Sizes?.buttonHeight ?? 30;

export type ButtonVariantType = 'standard' | 'outline' | 'trans';
export type ButtonShapeType = 'square' | 'pill' | 'rounded';
export type ButtonSizeType =
    | 'large'
    | 'medium'
    | 'small'
    | 'x-small'
    | 'x-large'
    | 'xx-large';

export interface IButtonProps
    extends TouchableOpacityProps,
        Omit<ThemeProps, 'useLightColor'> {
    className?: string;
    classNameLabel?: string;
    children?: any;
    size?: ButtonSizeType;
    variant?: ButtonVariantType;
    shape?: ButtonShapeType;
    color?: ColorKeyType;
    disableColor?: ColorKeyType;
    disableColorDarkMode?: ColorKeyType;
    colorBorderDisable?: ColorKeyType;
    colorBorderDisableDarkMode?: ColorKeyType;
    colorText?: ColorKeyType;
    colorTextDarkMode?: ColorKeyType;
    colorTextDisable?: ColorKeyType;
    colorTextDisableDarkMode?: ColorKeyType;
    iconName?: string;
    suffixIconName?: string;
    iconSize?: number;
    roundedRadius?: number;
    label?: string;
    height?: number | string;
    loading?: boolean;
    styleLabel?: TextStyle;
    renderPrefix?: ((props?: any) => React.ReactNode) | React.ReactNode;
    renderSuffix?: ((props?: any) => React.ReactNode) | React.ReactNode;
    iconProps?: IIconProps;
    textProps?: ITextProps;
}

const Button: React.FC<IButtonProps> = ({
    className,
    classNameLabel,
    disableColor: disableColorProps,
    disableColorDarkMode: disableColorDarkModeProps,
    color: colorProps,
    colorDarkMode,
    colorText,
    colorTextDarkMode,
    colorTextDisable,
    colorTextDisableDarkMode,
    colorBorderDisable: colorBorderDisableProps,
    colorBorderDisableDarkMode: colorBorderDisableDarkModeProps,
    variant: variantProps,
    size: sizeProps,
    shape: shapeProps,
    children,
    iconName,
    suffixIconName,
    iconSize = 14,
    height,
    label,
    disabled,
    style,
    styleLabel,
    loading = false,
    activeOpacity,
    renderPrefix,
    renderSuffix,
    iconProps = {},
    textProps = {},
    ...rest
}) => {
    const isDarkMode = useColorScheme() === 'dark';
    const {buttonConfig} = Configs;
    const {
        variant: variantConfig,
        shape: shapeConfig,
        roundedRadius: roundedRadiusConfig,
        size: sizeConfig,
        color: colorConfig,
        disableColor: disableColorConfig,
        disableColorDarkMode: disableColorDarkModeConfig,
        colorBorderDisable: colorBorderDisableConfig,
        colorBorderDisableDarkMode: colorBorderDisableDarkModeConfig,
    } = buttonConfig || {};
    const variant = variantProps || variantConfig || 'standard';
    const shape = shapeProps || shapeConfig || 'square';
    const size = sizeProps || sizeConfig || 'medium';
    const color = colorProps || colorConfig || 'primary';
    const disableColor = disableColorProps || disableColorConfig || 'greyLight';
    const disableColorDarkMode =
        disableColorDarkModeProps || disableColorDarkModeConfig || 'grayDark';
    const colorBorderDisable =
        colorBorderDisableProps || colorBorderDisableConfig || 'grayDark';
    const colorBorderDisableDarkMode =
        colorBorderDisableDarkModeProps ||
        colorBorderDisableDarkModeConfig ||
        'white';

    const buttonColor = useMemo(() => {
        return getColorValue(color);
    }, [color]);

    const buttonDisableBg = useMemo(() => {
        return getColorValue(disableColor);
    }, [disableColor]);

    const buttonDarkModeBg = useMemo(() => {
        if (variant === 'trans' || loading) {
            return 'transparent';
        }
        if (variant === 'outline' && disabled) {
            return disableColorDarkMode;
        }
        return getColorValue(colorDarkMode);
    }, [variant, color, isDarkMode, loading, disabled]);

    const buttonHeight = useMemo(() => {
        let result: number | string = 10;
        switch (size) {
            case 'xx-large':
                result = defaultButtonHeight + 15;
                break;
            case 'x-large':
                result = defaultButtonHeight + 10;
                break;
            case 'large':
                result = defaultButtonHeight + 5;
                break;
            case 'medium':
                result = defaultButtonHeight;
                break;
            case 'small':
                result = defaultButtonHeight - 5;
                break;
            case 'x-small':
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

    const buttonStyle: Array<any> = [{height: buttonHeight}];

    if (style) {
        buttonStyle.push(style);
    }
    if (buttonDisableBg && disabled) {
        buttonStyle.push({backgroundColor: buttonDisableBg});
    }

    const wrapperClass = ClassNames(
        'flex-center-y justify-content-center px-2.5',
        {
            [`bg-${color}`]: variant === 'standard',
            'rounded-pill': shape === 'pill',
            'rounded-2': shape === 'rounded',
            [`border border-${color}`]: variant === 'outline',
            [`border-${colorBorderDisable}`]: colorBorderDisable && disabled,
            [`border-${colorBorderDisableDarkMode}`]:
                colorBorderDisableDarkMode && disabled && isDarkMode,
            'bg-transparent': loading,
        },
        className,
    );

    const labelClass = ClassNames(
        'text-center',
        {
            [`text-${color}`]: variant === 'outline' || variant === 'trans',
            'text-white': variant === 'standard' && isDark(buttonColor),
            h3: size === 'x-large' || size === 'xx-large',
            h4: size === 'medium' || size === 'large',
            'h5 text-height-14': size === 'small' || size === 'x-small',
        },
        classNameLabel,
    );

    const getIconColor = () => {
        if (variant === 'standard' && isDark(buttonColor)) {
            return 'light';
        }
        if (variant === 'standard' && !isDark(buttonColor)) {
            return 'dark';
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

    if (typeof content === 'string') {
        let textColor = colorText;
        let textColorDM = colorTextDarkMode;
        if (disabled) {
            textColor = colorTextDisable || 'grayDark';
            textColorDM = colorTextDisableDarkMode || 'light';
        }
        mainView = (
            <Text
                className={labelClass}
                color={textColor}
                numberOfLines={1}
                colorDarkMode={textColorDM}
                style={styleLabel}
                {...textProps}>
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
                color={getIconColor()}
                size={iconSize}
                className="mr-2"
                {...iconProps}
                name={iconName}
            />
        );
    }
    if (suffixIconName) {
        suffixView = (
            <Icon
                color={getIconColor()}
                size={iconSize}
                className="mr-2"
                {...iconProps}
                name={suffixIconName}
            />
        );
    }
    if (renderPrefix) {
        prefixView =
            typeof renderPrefix === 'function' ? renderPrefix() : renderPrefix;
    }
    if (renderSuffix) {
        suffixView =
            typeof renderSuffix === 'function' ? renderSuffix() : renderSuffix;
    }

    return (
        <TouchableOpacity
            className={wrapperClass}
            style={buttonStyle}
            disabled={disabled || loading}
            colorDarkMode={buttonDarkModeBg}
            activeOpacity={activeOpacity || 0.85}
            {...rest}>
            {!loading && prefixView}
            {mainView}
            {!loading && suffixView}
        </TouchableOpacity>
    );
};

export default Button;
