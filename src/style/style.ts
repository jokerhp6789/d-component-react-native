/* eslint-disable no-nested-ternary */
import {forEach, replace, split} from 'lodash';
import {
    FlexStyle,
    ImageStyle,
    StyleProp,
    TextStyle,
    ViewStyle,
} from 'react-native';
import {Colors} from '..';
import {ThemeProps} from '../interface/iTheme';
import Configs from './config/_config';
import imageStyle from './image/_image';
import flexStyle from './layout/_flex';
import gapStyle from './layout/_gap';
import marginPadding from './layout/_padding-margin';
import positionStyle from './layout/_position';
import widthHeightStyle from './layout/_width-height';
import {getColorValue} from './modifier';
import textStyle from './text/_text';
import backgroundStyle from './theme/_background';
import borderStyle from './theme/_border';
import shadowStyle from './theme/_shadow';

const {dark, light} = Colors;
const SPECIAL_STYLE_COLOR_PATTERN =
    /^(bg|text|border)-(\[#[0-9A-Fa-f]{6}\]|(?!#)\[rgba\((?:\d{1,3},\s*){3}(?:1|0\.\d{1,2})\)\])$/;
const SPECIAL_WIDTH_HEIGHT_PATTERN = /^(max-)?(w|h|width|height)-\[\d+(\.\d+)?%?\]$/;
const SPECIAL_PADDING_MARGIN_PATTERN =
    /^(p(x|y|l|t|r|b)?|g(x|y)?|m(x|y|l|t|r|b)?)-\[\d+\]$/;
const SPECIAL_POSITION_PATTERN = /^(r|t|l|b|top|left|right|bottom)-\[\d+\]$/;
const PERCENTAGE_PATTERN = /^\d+(\.\d+)?%$/;

export const getStyleProps = (props: any, key?: string) => {
    const keyProps = key || 'className';
    const classStr = props?.[keyProps] ?? '';
    return styleTransformer(classStr);
};

export const getSpecialStyle = (className: string) => {
    function getValue(valueToGet?: string) {
        let res: any = valueToGet;
        if (valueToGet && typeof valueToGet === 'string') {
            res = replace(res, '[', '');
            res = replace(res, ']', '');
        }
        return res;
    }
    if (SPECIAL_STYLE_COLOR_PATTERN.test(className)) {
        const stringArr = split(className, '-');
        const key = stringArr?.[0];
        const value: any = getValue(stringArr?.[1]);
        let styleKey: any = null;
        switch (key) {
            case 'bg':
                styleKey = 'backgroundColor';
                break;
            case 'text':
                styleKey = 'textColor';
                break;
            case 'border':
                styleKey = 'borderColor';
                break;
            default:
                break;
        }
        if (styleKey && value) {
            return {[styleKey]: value};
        }
    }
    if (SPECIAL_WIDTH_HEIGHT_PATTERN.test(className)) {
        const stringArr = split(className, '-');
        let value = null;
        let styleKey: any = null;
        if (stringArr?.length === 3) {
            const key = `${stringArr?.[0]}-${stringArr?.[1]}`;
            value = getValue(stringArr?.[2]);
            switch (key) {
                case 'max-w':
                case 'max-width':
                    styleKey = 'maxWidth';
                    break;
                case 'max-h':
                case 'max-height':
                    styleKey = 'maxHeight';
                    break;
                default:
                    break;
            }
        } else if (stringArr?.length === 2) {
            const key = stringArr?.[0];
            value = getValue(stringArr?.[1]);
            switch (key) {
                case 'w':
                case 'width':
                    styleKey = 'width';
                    break;
                case 'h':
                case 'height':
                    styleKey = 'height';
                    break;
                default:
                    break;
            }
        }
        if (styleKey && value) {
            if (!PERCENTAGE_PATTERN.test(value) && !isNaN(parseFloat(value))) {
                value = parseFloat(value);
            }
            return {[styleKey]: value};
        }
    }
    if (SPECIAL_PADDING_MARGIN_PATTERN.test(className)) {
        const stringArr = split(className, '-');
        let value = null;
        let styleKey: any = null;
        if (stringArr?.length === 2) {
            const key = stringArr?.[0];
            value = getValue(stringArr?.[1]);
            switch (key) {
                case 'g':
                    styleKey = 'gap';
                    break;
                case 'gy':
                    styleKey = 'rowGap';
                    break;
                case 'gx':
                    styleKey = 'columnGap';
                    break;
                case 'p':
                    styleKey = 'padding';
                    break;
                case 'pl':
                    styleKey = 'paddingLeft';
                    break;
                case 'pt':
                    styleKey = 'paddingTop';
                    break;
                case 'pr':
                    styleKey = 'paddingRight';
                    break;
                case 'pb':
                    styleKey = 'paddingBottom';
                    break;
                case 'px':
                    styleKey = 'paddingHorizontal';
                    break;
                case 'py':
                    styleKey = 'paddingVertical';
                    break;
                case 'm':
                    styleKey = 'margin';
                    break;
                case 'ml':
                    styleKey = 'marginLeft';
                    break;
                case 'mt':
                    styleKey = 'marginTop';
                    break;
                case 'mr':
                    styleKey = 'marginRight';
                    break;
                case 'mb':
                    styleKey = 'marginBottom';
                    break;
                case 'mx':
                    styleKey = 'marginHorizontal';
                    break;
                case 'my':
                    styleKey = 'marginVertical';
                    break;
                default:
                    break;
            }
        }
        if (styleKey && value) {
            if (!isNaN(parseFloat(value))) {
                value = parseFloat(value);
            }
            if (typeof value === 'number') {
                return {[styleKey]: value};
            }
        }
    }
    if (SPECIAL_POSITION_PATTERN.test(className)) {
        const stringArr = split(className, '-');
        let value = null;
        let styleKey: any = null;
        if (stringArr?.length === 2) {
            const key = stringArr?.[0];
            value = getValue(stringArr?.[1]);
            switch (key) {
                case 'z':
                    styleKey = 'zIndex';
                    break;
                case 't' :
                case 'top' :
                    styleKey = 'top';
                    break;
                case 'b' :
                case 'bottom' :
                    styleKey = 'bottom';
                    break;
                case 'l':
                case 'left':
                    styleKey = 'left';
                    break;
                case 'r':
                case 'right':
                    styleKey = 'right';
                    break;
                default:
                    break;
            }
        }
        if (styleKey && value) {
            if (!isNaN(parseFloat(value))) {
                value = parseFloat(value);
            }
            if (typeof value === 'number') {
                return {[styleKey]: value};
            }
        }
    }
    return null;
};

export const styleTransformer = (
    primaryStyle: string | {[key: string]: any},
    ...otherStyle: any
) => {
    const styleProps: ViewStyle[] | TextStyle[] | ImageStyle[] | FlexStyle[] =
        [];
    if (typeof primaryStyle === 'string') {
        if (primaryStyle?.length > 1) {
            const classArr = primaryStyle.split(' ');
            if (!!classArr) {
                try {
                    forEach(classArr, (name: any) => {
                        if (style?.[name as keyof typeof style]) {
                            styleProps.push(style[name]);
                        } else if (
                            !!name &&
                            typeof name === 'string' &&
                            name?.length > 3 &&
                            name !== 'undefined'
                        ) {
                            const specialStyle = getSpecialStyle(name);
                            if (!!specialStyle) {
                                styleProps.push(specialStyle);
                            }
                        }
                    });
                } catch (error) {
                    console.error('GET STYLE PROPS ERROR', {error});
                }
            }
        }
    } else if (primaryStyle) {
        Object.keys(primaryStyle).forEach(key => {
            if (!!primaryStyle?.[key]) {
                const conditionalStyle = styleTransformer(key);
                if (conditionalStyle && conditionalStyle?.length) {
                    styleProps.push(...(conditionalStyle as any));
                }
            }
        });
    }
    if (otherStyle && otherStyle?.length) {
        for (const secondaryStyle of otherStyle) {
            if (secondaryStyle) {
                if (typeof secondaryStyle === 'string') {
                    const conditionalStyle = styleTransformer(secondaryStyle);
                    if (conditionalStyle && conditionalStyle?.length) {
                        styleProps.push(...(conditionalStyle as any));
                    }
                } else {
                    Object.keys(secondaryStyle).forEach(key => {
                        if (!!secondaryStyle?.[key]) {
                            const conditionalStyle = styleTransformer(key);
                            if (conditionalStyle && conditionalStyle?.length) {
                                styleProps.push(...(conditionalStyle as any));
                            }
                        }
                    });
                }
            }
        }
    }
    return styleProps;
};

export const getStyleWithTheme = (
    rest: any,
    styleProps: any,
    options?: ThemeProps & {isDarkMode?: boolean},
): StyleProp<ViewStyle> => {
    const {
        isDarkMode,
        useLightColor: useLightColorProps,
        colorDarkMode: colorDarkModeProps,
        autoSwitchColor: autoSwitchColorProps,
    } = options || {};
    const {generalConfig} = Configs;
    const {
        autoSwitchColor: autoSwitchColorConfig,
        useLightColor: useLightColorConfig,
        colorDarkMode: colorDarkModeConfig,
    } = generalConfig || {};
    const tranStyle = getStyleProps(rest);
    // const tranStyle = {};
    const useLightColor =
        typeof useLightColorProps === 'boolean'
            ? useLightColorProps
            : useLightColorConfig;
    const colorDarkMode = colorDarkModeProps || colorDarkModeConfig;
    const autoSwitchColor =
        typeof autoSwitchColorProps === 'boolean'
            ? autoSwitchColorProps
            : !!autoSwitchColorConfig;
    const backgroundColor =
        isDarkMode && autoSwitchColor
            ? colorDarkModeConfig || dark
            : useLightColor
            ? light
            : 'transparent';
    const listStyle: StyleProp<ViewStyle> = [
        {backgroundColor},
        tranStyle as any,
    ];
    if (styleProps) {
        listStyle.push(styleProps);
    }
    if (isDarkMode && colorDarkMode) {
        const backgroundColor = getColorValue(colorDarkMode || dark);
        listStyle.push({backgroundColor});
    }
    return listStyle;
};

const style = {
    ...flexStyle,
    ...gapStyle,
    ...marginPadding,
    ...backgroundStyle,
    ...borderStyle,
    ...widthHeightStyle,
    ...textStyle,
    ...positionStyle,
    ...imageStyle,
    ...shadowStyle,
};

export default style;
