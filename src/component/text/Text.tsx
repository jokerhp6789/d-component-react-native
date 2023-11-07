/** @format */

import {find, split} from 'lodash';
import React, {useContext, useMemo} from 'react';
import {
    Text as RNText,
    TextProps,
    TextStyle,
    StyleSheet,
    Platform,
} from 'react-native';
import StyleStateContext, {
    IStyleStateContext,
} from '../../context/StyleContext';
import Colors from '../../style/color/_color';
import {ColorKeyType} from '../../style/constant/AppColors';
import Fonts from '../../style/font/_font';
import {getColorValue} from '../../style/modifier';
import {IStyleTransformerProps, getStyleProps} from '../../style/style';
import Configs from '../../style/config/_config';

export interface ITextProps extends TextProps {
    className?: IStyleTransformerProps;
    color?: ColorKeyType;
    colorDarkMode?: ColorKeyType;
}

const Text: React.FC<ITextProps> = ({
    children,
    color: colorProp,
    colorDarkMode: colorDarkModeProp,
    style,
    ...rest
}) => {
    const {locale, useFontToLocale, colorSchema} =
        useContext<IStyleStateContext>(StyleStateContext) || {};
    const {generalConfig, textConfig} = Configs;
    const {color: colorConfig, colorDarkMode: colorDarkModeConfig} =
        textConfig || {};
    const {autoSwitchColor} = generalConfig || {};
    const transStyle = getStyleProps(rest);
    const isDarkMode = colorSchema === 'dark';
    const {white, black} = Colors;
    const {fontClass, locale: loadFontLocale} = Fonts;
    const defaultStyle: TextStyle = {
        ...fontClass.h4,
        color: isDarkMode && autoSwitchColor ? white : black,
    };
    const listStyle = [defaultStyle, transStyle];
    const color = colorProp || colorConfig;
    const colorDarkMode = colorDarkModeProp || colorDarkModeConfig;
    if (color) {
        const colorValue = getColorValue(color);
        listStyle.push({color: colorValue});
    }
    if (isDarkMode && colorDarkMode && autoSwitchColor) {
        const color = getColorValue(colorDarkMode);
        listStyle.push({color});
    }
    if (style) {
        listStyle.push(style);
    }
    const flattenStyle = StyleSheet.flatten<TextStyle>(listStyle);
    const hasBoldStyle =
        split((rest as any)?.['className'], ' ').includes('font-weight-bold') ||
        ['500', '600', '700', '800', '900', 'bold'].includes(
            flattenStyle?.fontWeight as any,
        );
    const localeFont: string | null = useMemo(() => {
        let res = null;
        if (locale && useFontToLocale) {
            const foundFontLocale = find(loadFontLocale, (v, k) => {
                return k === locale;
            });
            if (foundFontLocale) {
                if (typeof foundFontLocale === 'string') {
                    res = foundFontLocale;
                } else {
                    if (foundFontLocale?.[Platform.OS]) {
                        res = hasBoldStyle
                            ? foundFontLocale?.[Platform.OS]?.bold
                            : foundFontLocale?.[Platform.OS]?.normal;
                    } else {
                        res = hasBoldStyle
                            ? foundFontLocale?.bold
                            : foundFontLocale?.normal;
                    }
                }
            }
        }
        return res;
    }, [locale, useFontToLocale, hasBoldStyle]);
    if (localeFont) {
        listStyle.push({fontFamily: localeFont});
    }
    const finalStyle = StyleSheet.flatten(listStyle);

    return (
        <RNText {...rest} style={finalStyle}>
            {children}
        </RNText>
    );
};

export default Text;
