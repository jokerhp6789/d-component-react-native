import React, {useMemo} from 'react';
import Text from '../text/Text';
import {ColorKeyType} from '../../style/constant/AppColors';
import {getColorValue} from '../../style/modifier';
import {isDark} from '../../style/color/_color';
import Icon from '../icon/Icon';
import {IStyleTransformerProps, styleTransformer} from '../../style/style';
import { View } from 'react-native';

export interface IChipProps {
    label?: string;
    className?: IStyleTransformerProps;
    color?: ColorKeyType;
    size?: 'small' | 'medium' | 'large';
    iconName?: string;
    onPressIcon?: any;
    variant?: 'default' | 'rounded' | 'pill';
}

const Chip: React.FC<IChipProps> = ({
    label,
    className,
    color = 'primary',
    size = 'small',
    variant = 'default',
    iconName,
    onPressIcon,
}) => {
    const wrapperClass = styleTransformer(
        `bg-${color} flex-center-y`,
        {
            'px-2 py-1': size === 'small' || size === 'medium',
            'px-4 py-2': size === 'large',
            'rounded-3': variant === 'rounded',
            'rounded-pill': variant === 'pill',
        },
        className,
    );
    const labelClass = styleTransformer({
        h5: size === 'small',
        h4: size === 'medium' || size === 'large',
    });
    const chipColor = getColorValue(color);
    const textColor = isDark(chipColor) ? 'white' : 'dark';
    const iconSize = useMemo(() => {
        switch (size) {
            case 'large':
                return 22;
            case 'medium':
                return 18;
            default:
                return 14;
        }
    }, [size]);

    return (
        <View style={[wrapperClass]}>
            {label && (
                <Text style={[labelClass, {color: textColor}]}>{label}</Text>
            )}
            {iconName && (
                <Icon
                    name={iconName}
                    color={textColor}
                    size={iconSize}
                    onPress={onPressIcon}
                    classNameWrapper="ml-1"
                />
            )}
        </View>
    );
};

export default Chip;
