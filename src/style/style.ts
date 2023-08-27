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
import backgroundStyle from './theme/_background';
import borderStyle from './theme/_border';
import widthHeightStyle from './layout/_width-height';
import textStyle from './text/_text';
import positionStyle from './layout/_position';
import imageStyle from './image/_image';
import shadowStyle from './theme/_shadow';
import {Colors} from '..';
import {getColorValue} from './modifier';

const {dark, light} = Colors;

export interface IStyleWithThemeOptions {
    colorDarkMode?: string;
    useLightColor?: boolean;
}

export const getStyleProps = (props: any, key?: string) => {
    const keyProps = key || 'className';
    const classStr = props?.[keyProps] ?? '';
    return styleTransformer(classStr);
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
    options?: IStyleWithThemeOptions,
): ViewStyle[] => {
    const {useLightColor, colorDarkMode} = options || {};
    const tranStyle = getStyleProps(rest);
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundColor = isDarkMode
        ? dark
        : useLightColor
        ? light
        : undefined;
    const listStyle: ViewStyle[] = [{backgroundColor}, tranStyle as any];
    if (styleProps) {
        listStyle.push(styleProps);
    }
    if (isDarkMode && colorDarkMode) {
        const backgroundColor = getColorValue(colorDarkMode);
        listStyle.push({backgroundColor});
    }
    return listStyle;
};

const style = StyleSheet.create({
    ...flexStyle,
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
