import React, {useContext} from 'react';
import {
    TouchableOpacityProps,
    TouchableOpacity as TouchableOpacityRN,
} from 'react-native';
import StyleStateContext, {
    IStyleStateContext,
} from '../../context/StyleContext';
import {ThemeProps} from '../../interface/iTheme';
import {getStyleWithTheme, IStyleTransformerProps} from '../../style/style';

export interface ITouchableOpacityProps
    extends TouchableOpacityProps,
        ThemeProps {
    className?: IStyleTransformerProps;
    children?: any;
}

export interface ITouchableOpacityMethod {}

const TouchableOpacity: React.ForwardRefRenderFunction<
    ITouchableOpacityMethod,
    ITouchableOpacityProps
> = ({children, style, useLightColor, colorDarkMode, ...rest}, ref) => {
    const {colorSchema} =
        useContext<IStyleStateContext>(StyleStateContext) || {};
    const isDarkMode = colorSchema === 'dark';
    const listStyle = getStyleWithTheme(rest, style, {
        colorDarkMode,
        useLightColor,
        isDarkMode,
    });
    return (
        <TouchableOpacityRN {...rest} style={listStyle}>
            {children}
        </TouchableOpacityRN>
    );
};

export default React.forwardRef(TouchableOpacity);
