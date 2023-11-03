import React, {useContext} from 'react';
import {SafeAreaView as SafeAreaViewRN, ViewProps} from 'react-native';
import StyleStateContext, {
    IStyleStateContext,
} from '../../context/StyleContext';
import {ThemeProps} from '../../interface/iTheme';
import {IStyleTransformerProps, getStyleWithTheme} from '../../style/style';

export interface ISafeAreaViewProps extends ViewProps, ThemeProps {
    className?: IStyleTransformerProps;
    children?: any;
}

const SafeAreaView: React.FC<ISafeAreaViewProps> = ({
    children,
    style,
    useLightColor,
    colorDarkMode,
    ...rest
}) => {
    const {colorSchema} =
        useContext<IStyleStateContext>(StyleStateContext) || {};
    const listStyle = getStyleWithTheme(rest, style, {
        colorDarkMode,
        useLightColor,
        isDarkMode: colorSchema === 'dark',
    });
    return <SafeAreaViewRN style={listStyle}>{children}</SafeAreaViewRN>;
};

export default SafeAreaView;
