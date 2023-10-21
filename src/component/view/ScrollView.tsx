import React, {forwardRef, useContext} from 'react';
import {ScrollViewProps, ScrollView as ScrollViewRN} from 'react-native';
import StyleStateContext, {
    IStyleStateContext,
} from '../../context/StyleContext';
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
    const {colorSchema} =
        useContext<IStyleStateContext>(StyleStateContext) || {};
    const isDarkMode = colorSchema === 'dark';
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
