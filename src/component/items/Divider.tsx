import React from 'react';
import {View, ViewProps} from 'react-native';
import {ThemeProps} from '../../interface/iTheme';
import {ColorKeyType} from '../../style/constant/AppColors';
import {getColorValue} from '../../style/modifier';
import {IStyleTransformerProps, styleTransformer} from '../../style/style';

export interface IDividerProps extends ThemeProps, ViewProps {
    className?: IStyleTransformerProps;
    color?: ColorKeyType;
}

const Divider: React.FC<IDividerProps> = ({
    className,
    style,
    color = 'muted',
    ...rest
}) => {
    return (
        <View
            style={[
                styleTransformer('h-[1] w-100', className),
                style,
                {backgroundColor: getColorValue(color)},
            ]}
            {...rest}
        />
    );
};

export default Divider;
