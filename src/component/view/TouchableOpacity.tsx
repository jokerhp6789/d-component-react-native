import React from 'react';
import {
    TouchableOpacityProps,
    TouchableOpacity as TouchableOpacityRN,
    useColorScheme,
} from 'react-native';
import {ThemeProps} from '../../interface/iTheme';
import {getStyleWithTheme} from '../../style/style';

export interface ITouchableOpacityProps
    extends TouchableOpacityProps,
        ThemeProps {
    className?: string;
    children?: any;
}

export interface ITouchableOpacityMethod {}

const TouchableOpacity: React.ForwardRefRenderFunction<
    ITouchableOpacityMethod,
    ITouchableOpacityProps
> = ({children, style, useLightColor, colorDarkMode, ...rest}, ref) => {
    const isDarkMode = useColorScheme() === 'dark';
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
