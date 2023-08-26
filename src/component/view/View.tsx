import React from 'react';
import {View as ViewRN, ViewProps} from 'react-native';
import {ThemeProps} from '../../interface/iTheme';
import {getListStyleProps} from '../../style/style';

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
    const listStyle = getListStyleProps(
        rest,
        style,
        colorDarkMode,
        useLightColor,
    );
    return (
        <ViewRN {...rest} style={listStyle}>
            {children}
        </ViewRN>
    );
};

export default View;
