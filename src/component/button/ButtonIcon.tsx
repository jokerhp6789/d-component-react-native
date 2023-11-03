import React from 'react';
import {ColorKeyType} from '../../style/constant/AppColors';
import {getColorValue} from '../../style/modifier';
import Icon from '../icon/Icon';
import Button, {IButtonProps} from './Button';

export interface IButtonIconProps extends Partial<Omit<IButtonProps, 'size'>> {
    size?: number;
    iconColor?: ColorKeyType;
}

const ButtonIcon: React.FC<IButtonIconProps> = ({
    children,
    className,
    iconName,
    iconSize = 20,
    iconProps = {},
    iconColor = 'primary',
    size = 35,
    style,
    ...rest
}) => {
    const renderChild = () => {
        const colorIcon = getColorValue(iconColor);
        if (iconName) {
            return (
                <Icon
                    name={iconName}
                    size={iconSize}
                    color={colorIcon}
                    {...iconProps}
                />
            );
        }
        if (children) {
            return React.cloneElement(children, {
                width: iconSize,
                height: iconSize,
                fill: colorIcon,
                color: colorIcon,
            });
        }
        return null;
    };
    return (
        <Button
            variant="standard"
            color="transparent"
            shape="pill"
            className={` ${className} px-0`}
            style={[{width: size, height: size}, style]}
            {...rest}>
            {renderChild()}
        </Button>
    );
};

export default ButtonIcon;
