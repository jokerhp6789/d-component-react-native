/* eslint-disable no-nested-ternary */
import {forEach, split, isEmpty} from 'lodash';
import {
    StyleSheet,
    ViewStyle,
    TextStyle,
    FlexStyle,
    ImageStyle,
    useColorScheme,
} from 'react-native';
import flexStyle from './layout/_flex';
import marginPadding from './layout/_padding-margin';
import backgroundStyle, {BACKGROUND_PATTERN} from './theme/_background';
import borderStyle from './theme/_border';
import widthHeightStyle from './layout/_width-height';
import textStyle from './text/_text';
import positionStyle from './layout/_position';
import imageStyle from './image/_image';
import shadowStyle from './theme/_shadow';
import {Colors} from '..';
import {getColorValue} from './modifier';
import gapStyle from './layout/_gap';
import Configs from './config/_config';
import {ThemeProps} from '../interface/iTheme';

const {dark, light} = Colors;
const SPECIAL_STYLE_PATTERN = /^(bg|text|border)-#[0-9A-Fa-f]{6}$/;

export const getStyleProps = (props: any, key?: string) => {
    const keyProps = key || 'className';
    const classStr = props?.[keyProps] ?? '';
    return styleTransformer(classStr);
};

export const getSpecialStyle = (className: string) => {
    if (SPECIAL_STYLE_PATTERN.test(className)) {
        const stringArr = split(className, '-');
        const key = stringArr?.[0];
        const value = stringArr?.[1];
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
        if (styleKey) {
            return {[styleKey]: value};
        }
    }
    return null;
};

export const styleTransformer = (classStr: string) => {
    const classArr = split(classStr, ' ');
    const styleProps: ViewStyle[] | TextStyle[] | ImageStyle[] | FlexStyle[] =
        [];
    if (!isEmpty(classArr)) {
        try {
            forEach(classArr, (name: any) => {
                if (style?.[name as keyof typeof style]) {
                    styleProps.push(style[name as keyof typeof style]);
                }
                const specialStyle = getSpecialStyle(name);
                if (!!specialStyle) {
                    styleProps.push(specialStyle);
                }
            });
        } catch (error) {
            console.error('GET STYLE PROPS ERROR', {error});
        }
    }
    return styleProps;
};

export const getStyleWithTheme = (
    rest: any,
    styleProps: any,
    options?: ThemeProps & {isDarkMode?: boolean},
): ViewStyle[] => {
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
            : 'transparent';
    const listStyle: ViewStyle[] = [{backgroundColor}, tranStyle as any];
    if (styleProps) {
        listStyle.push(styleProps);
    }
    if (isDarkMode && colorDarkMode) {
        const backgroundColor = getColorValue(colorDarkMode || dark);
        listStyle.push({backgroundColor});
    }
    return listStyle;
};

const style = StyleSheet.create({
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
});

export default style;
