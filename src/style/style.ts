/* eslint-disable no-nested-ternary */
import {forEach, replace, split} from 'lodash';
import {
    FlexStyle,
    ImageStyle,
    StyleProp,
    StyleSheet,
    TextStyle,
    ViewStyle,
} from 'react-native';
import {Colors} from '..';
import {ThemeProps} from '../interface/iTheme';
import Configs from './config/_config';
import {getColorValue} from './modifier';
import {StyleMap} from './data/styleData';
import Cache from './cache/cache';
import {BORDER_WIDTH_VARIATIONS} from './theme/_border';

const StyleCache = new Cache();
const {dark, light} = Colors;
const SPECIAL_STYLE_COLOR_PATTERN =
    /^(bg|text|border)-(\[#[0-9A-Fa-f]{6}\]|(?!#)\[rgba\((?:\d{1,3},\s*){3}(?:1|0\.\d{1,2})\)\])$/;
const SPECIAL_WIDTH_HEIGHT_PATTERN =
    /^(max-)?(w|h|width|height)-\[\d+(\.\d+)?%?\]$/;
const SPECIAL_PADDING_MARGIN_PATTERN =
    /^(p(x|y|l|t|r|b)?|g(x|y)?|m(x|y|l|t|r|b)?)-\[\d+\]$/;
const SPECIAL_BORDER_PATTERN =
    /^border(?:-(?:right|r|left|l|top|t|bottom|b))?-\[\d+\]$/;
const SPECIAL_POSITION_PATTERN = /^(r|t|l|b|top|left|right|bottom)-\[-?\d+\]$/;
const PERCENTAGE_PATTERN = /^\d+(\.\d+)?%$/;

export type IStyleTransformerProps =
    | string
    | {[key: string]: boolean | undefined | null}
    | FlexStyle
    | ImageStyle
    | ViewStyle
    | TextStyle
    | undefined
    | Array<IStyleTransformerProps>;

export const getStyleProps = (props: any, key?: string) => {
    const keyProps = key || 'className';
    const classStr = props?.[keyProps] ?? '';
    if (!classStr) {
        return {};
    }
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
        let stringArr = split(className, '-');
        let value = null;
        let styleKey: any = null;
        let isNegative = false;
        if (stringArr?.length > 2) {
            stringArr = split(className, '-[-');
            isNegative = true;
        }
        if (stringArr?.length === 2) {
            const key = stringArr?.[0];
            value = getValue(stringArr?.[1]);
            switch (key) {
                case 'z':
                    styleKey = 'zIndex';
                    break;
                case 't':
                case 'top':
                    styleKey = 'top';
                    break;
                case 'b':
                case 'bottom':
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
                return isNegative ? {[styleKey]: -value} : {[styleKey]: value};
            }
        }
    }
    if (SPECIAL_BORDER_PATTERN.test(className)) {
        const stringArr = split(className, '-');
        let value = null;
        let styleKey: any = null;
        if (stringArr?.length === 2) {
            value = stringArr[1];
            styleKey = stringArr[0];
        } else if (stringArr?.length === 3) {
            value = stringArr[2];
            styleKey = `${stringArr[0]}-${stringArr[1]}`;
        }
        value = value ? getValue(value) : null;
        styleKey = (BORDER_WIDTH_VARIATIONS as any)[styleKey];
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
    primaryStyle: IStyleTransformerProps,
    ...otherStyle: IStyleTransformerProps[]
) => {
    const styleProps: any[] = [];
    if (!primaryStyle) {
        return;
    }
    if (typeof primaryStyle === 'string') {
        if (primaryStyle?.length > 1) {
            const cachedSets = StyleCache.getStyleSet(primaryStyle);
            if (cachedSets?.length) {
                styleProps.push(...cachedSets);
            } else {
                const classArr = primaryStyle
                    .split(' ')
                    ?.filter?.(item => !!item);
                if (classArr && classArr.length) {
                    try {
                        const styleSets: any[] = [];
                        forEach(classArr, (name: any) => {
                            const styleItem = StyleMap.get(name);
                            if (styleItem) {
                                styleSets.push(styleItem);
                            } else if (
                                !!name &&
                                typeof name === 'string' &&
                                name?.length > 3 &&
                                name !== 'undefined'
                            ) {
                                const specialStyle = getSpecialStyle(name);
                                if (!!specialStyle) {
                                    styleSets.push(specialStyle);
                                }
                            }
                        });
                        if (styleSets?.length) {
                            StyleCache.setStyleSet(primaryStyle, styleSets);
                            styleProps.push(...styleSets);
                        }
                    } catch (error) {
                        console.error('GET STYLE PROPS ERROR', {error});
                    }
                }
            }
            // const classArr = primaryStyle.split(' ')?.filter?.(item => !!item);
            // if (classArr && classArr.length) {
            //     try {
            //         const styleSets: any[] = [];
            //         forEach(classArr, (name: any) => {
            //             const styleItem = StyleMap.get(name);
            //             if (styleItem) {
            //                 styleSets.push(styleItem);
            //             } else if (
            //                 !!name &&
            //                 typeof name === 'string' &&
            //                 name?.length > 3 &&
            //                 name !== 'undefined'
            //             ) {
            //                 const specialStyle = getSpecialStyle(name);
            //                 if (!!specialStyle) {
            //                     styleSets.push(specialStyle);
            //                 }
            //             }
            //         });
            //         if (styleSets?.length) {
            //             styleProps.push(...styleSets);
            //         }
            //     } catch (error) {
            //         console.error('GET STYLE PROPS ERROR', {error});
            //     }
            // }
        }
    } else if (Array.isArray(primaryStyle) && primaryStyle.length) {
        primaryStyle.forEach(styleItem => {
            const transStyleItem = styleTransformer(styleItem);
            if (transStyleItem) {
                styleProps.push(transStyleItem);
            }
        });
    } else if (typeof primaryStyle === 'object' && primaryStyle !== null) {
        for (const [key, value] of Object.entries(primaryStyle)) {
            if (typeof value === 'boolean') {
                if (value) {
                    const conditionalStyle = styleTransformer(key);
                    if (conditionalStyle) {
                        styleProps.push(conditionalStyle);
                    }
                }
            } else if (key && (value || typeof value === 'number')) {
                styleProps.push({[key]: value});
            }
        }
    }
    if (otherStyle && otherStyle?.length) {
        for (const secondaryStyle of otherStyle) {
            if (secondaryStyle) {
                if (typeof secondaryStyle === 'string') {
                    const conditionalStyle = styleTransformer(secondaryStyle);
                    if (conditionalStyle) {
                        styleProps.push(conditionalStyle);
                    }
                } else if (
                    Array.isArray(secondaryStyle) &&
                    secondaryStyle.length
                ) {
                    secondaryStyle.forEach(styleItem => {
                        const transStyleItem = styleTransformer(styleItem);
                        if (transStyleItem) {
                            styleProps.push(transStyleItem);
                        }
                    });
                } else if (
                    typeof secondaryStyle === 'object' &&
                    secondaryStyle !== null
                ) {
                    for (const [key, value] of Object.entries(secondaryStyle)) {
                        if (typeof value === 'boolean') {
                            if (value) {
                                const conditionalStyle = styleTransformer(key);
                                if (conditionalStyle) {
                                    styleProps.push(conditionalStyle);
                                }
                            }
                        } else if (key && value) {
                            styleProps.push({[key]: value});
                        }
                    }
                }
            }
        }
    }
    return StyleSheet.flatten(styleProps);
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
            : undefined;
    const listStyle: StyleProp<ViewStyle> = [];
    if (backgroundColor) {
        listStyle.push({backgroundColor});
    }
    if (tranStyle) {
        listStyle.push(tranStyle);
    }
    if (styleProps) {
        listStyle.push(styleProps);
    }
    if (isDarkMode && colorDarkMode) {
        const backgroundColor = getColorValue(colorDarkMode || dark);
        listStyle.push({backgroundColor});
    }
    return listStyle;
};
