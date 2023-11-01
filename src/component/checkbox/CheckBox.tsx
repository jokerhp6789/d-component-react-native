import React from 'react';
import {TextStyle, View, ViewStyle} from 'react-native';
import {ColorKeyType} from '../../style/constant/AppColors';
import {getColorValue} from '../../style/modifier';
import {IStyleTransformerProps, styleTransformer} from '../../style/style';
import Icon from '../icon/Icon';
import Text from '../text/Text';
import TouchableOpacity from '../view/TouchableOpacity';

export interface ICheckBoxProps {
    checked?: boolean;
    label?: any;
    className?: IStyleTransformerProps;
    color?: ColorKeyType;
    colorDisabled?: ColorKeyType;
    onChange?: (props?: any) => any;
    classNameLabel?: string;
    classNameBox?: string;
    pressEnable?: boolean;
    size?: number;
    iconSize?: number;
    iconName?: string;
    iconColor?: ColorKeyType;
    renderIcon?:
        | ((props: {checked?: boolean}) => React.ReactNode)
        | React.ReactNode;
    style?: ViewStyle;
    styleBox?: ViewStyle;
    styleLabel?: TextStyle;
    variant?: 'checkbox' | 'radio';
    disabled?: boolean;
}

const CheckBox: React.FC<ICheckBoxProps> = ({
    className,
    classNameLabel,
    classNameBox,
    checked,
    label,
    onChange,
    pressEnable = true,
    disabled,
    colorDisabled = 'gray',
    size = 20,
    iconSize = 16,
    iconName = 'done',
    iconColor = 'light',
    color = 'primary',
    variant = 'checkbox',
    renderIcon,
    style,
    styleBox,
    styleLabel,
}) => {
    const wrapperClass = styleTransformer('flex-row', className);
    const boxClass = styleTransformer(
        `width-[${size}] height-[${size}] border border-grey flex-center-y justify-content-center`,
        {
            [`bg-${color}`]: !!checked,
            [`rounded-full`]: variant === 'radio',
            [`bg-${colorDisabled}`]: !!disabled,
        },
        classNameBox,
    );
    const labelClass = styleTransformer('h4 ml-2', classNameLabel);
    let labelContent;
    if (typeof label === 'string') {
        labelContent = (
            <Text
                className={labelClass}
                style={[{overflow: 'hidden'}, styleLabel]}>
                {label}
            </Text>
        );
    }
    if (React.isValidElement(label)) {
        labelContent = label;
    }

    const renderBox = () => {
        const icon = () => {
            if (renderIcon) {
                if (typeof renderIcon === 'function') {
                    return renderIcon({checked});
                }
                return renderIcon;
            }
            if (variant === 'radio') {
                const realIconSize = Math.abs(iconSize - 6);
                return (
                    <View
                        style={{
                            width: realIconSize,
                            height: realIconSize,
                            backgroundColor: getColorValue(iconColor),
                            borderRadius: 999,
                        }}
                    />
                );
            }
            return <Icon name={iconName} color={iconColor} size={iconSize} />;
        };
        if (pressEnable) {
            return (
                <TouchableOpacity
                    onPress={onChange}
                    style={[boxClass, styleBox]}>
                    {checked ? icon() : null}
                </TouchableOpacity>
            );
        }
        return <View style={[boxClass, styleBox]}>{checked && icon()}</View>;
    };

    return (
        <View style={[wrapperClass, style]}>
            {renderBox()}
            {label && labelContent}
        </View>
    );
};

export default CheckBox;
