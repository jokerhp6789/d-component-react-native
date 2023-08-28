import React, {forwardRef} from 'react';
import {ScrollView as ScrollViewRN, ScrollViewProps, useColorScheme} from 'react-native';
import {ThemeProps} from '../../interface/iTheme';
import {getStyleWithTheme} from '../../style/style';

export interface IScrollViewProps extends ScrollViewProps, ThemeProps {
    className?: string;
    children?: any;
}

export interface IScrollViewMethod {}

const ScrollView: React.ForwardRefRenderFunction<
    IScrollViewMethod,
    IScrollViewProps
> = ({children, style, colorDarkMode, useLightColor, ...rest}, ref) => {
    const isDarkMode = useColorScheme() === 'dark';
    const listStyle = getStyleWithTheme(rest, style, {
        useLightColor,
        colorDarkMode,
        isDarkMode,
    });
    return (
        <ScrollViewRN {...rest} style={listStyle}>
            {children}
        </ScrollViewRN>
    );
};

export default forwardRef(ScrollView);
