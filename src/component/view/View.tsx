import React, {useContext, useMemo} from 'react';
import {ViewProps, View as ViewRN} from 'react-native';
import StyleStateContext, {
    IStyleStateContext,
} from '../../context/StyleContext';
import {ThemeProps} from '../../interface/iTheme';
import {getStyleWithTheme, IStyleTransformerProps} from '../../style/style';

export interface IViewProps extends ViewProps, ThemeProps {
    className?: IStyleTransformerProps;
    children?: any;
}

const View: React.FC<IViewProps> = ({
    children,
    style,
    colorDarkMode,
    useLightColor,
    ...rest
}) => {
    const {colorSchema} =
        useContext<IStyleStateContext>(StyleStateContext) || {};
    const listStyle = useMemo(() => {
        return getStyleWithTheme(rest, style, {
            colorDarkMode,
            useLightColor,
            isDarkMode: colorSchema === 'dark',
        });
    }, [colorDarkMode, style, rest?.className, colorSchema]);

    return (
        <ViewRN {...rest} style={listStyle}>
            {children}
        </ViewRN>
    );
};

export default View;
