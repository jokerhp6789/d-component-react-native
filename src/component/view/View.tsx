import React from 'react';
import {useColorScheme, View as ViewRN, ViewProps} from 'react-native';
import {ThemeProps} from '../../interface/iTheme';
import {getStyleWithTheme} from '../../style/style';

export interface IViewProps extends ViewProps, ThemeProps {
    className?: string;
    children?: any;
}

const View: React.FC<IViewProps> = ({
    children,
    style,
    colorDarkMode,
    useLightColor,
    ...rest
}) => {
    const isDarkMode = useColorScheme() === 'dark';
    const listStyle = getStyleWithTheme(rest, style, {
        colorDarkMode,
        useLightColor,
        isDarkMode,
    });
    return (
        <ViewRN {...rest} style={listStyle}>
            {children}
        </ViewRN>
    );
};

export default View;
