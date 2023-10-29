import React from 'react';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {ThemeProps} from '../../interface/iTheme';
import {IStyleTransformerProps, styleTransformer} from '../../style/style';
import {IButtonProps} from '../button/Button';
import Text, {ITextProps} from '../text/Text';
import Avatar, {IAvatarProps} from './Avatar';

export interface IUserBasic {
    fullName?: string;
    avatar?: IAvatarProps['avatar'];
    name?: string;
    [key: string]: any;
}

export interface IAvatarNameProps extends ThemeProps {
    user: IUserBasic;
    position?: 'before' | 'after';
    size?: IAvatarProps['size'];
    subLabel?: string;
    className?: IStyleTransformerProps;
    classNameWrapperText?: IStyleTransformerProps;
    classNameText?: IStyleTransformerProps;
    classNameSubText?: IStyleTransformerProps;
    color?: IButtonProps['color'];
    style?: StyleProp<ViewStyle>;
    styleWrapperText?: StyleProp<ViewStyle>;
    styleNameText?: StyleProp<TextStyle>;
    styleSubText?: StyleProp<TextStyle>;
    textNameProps?: ITextProps;
    avatarProps?: IAvatarProps;
    variant?: IAvatarProps['variant'];
}

const AvatarName: React.FC<IAvatarNameProps> = ({
    user,
    position = 'after',
    size = 'x-small',
    variant,
    subLabel,
    style,
    styleSubText,
    styleNameText,
    styleWrapperText,
    className,
    classNameText,
    classNameWrapperText,
    classNameSubText,
    color,
    colorDarkMode,
    textNameProps = {},
    avatarProps = {},
}) => {
    const {avatar, fullName, name = ''} = user;
    let displayName = name;
    if (fullName) {
        displayName = fullName;
    }

    const wrapperClass = styleTransformer(
        `flex-row align-center bg-transparent`,
        className,
    );
    const nameClass = styleTransformer(
        'flex-column bg-transparent',
        {
            'mr-1': position === 'before',
            'ml-1': position === 'after',
        },
        classNameWrapperText,
    );
    const nameTextClass = styleTransformer(
        `text-nowrap text-${color}`,
        {
            'size-60': size === 'xx-large',
            'size-50': size === 'x-large',
            'size-40': size === 'large',
            'size-32': size === 'medium',
            'h1 font-weight-500': size === 'small',
            'h3 font-weight-500': size === 'x-small',
            h5: size === 'xx-small',
        },
        classNameText,
    );

    const subTextClass = styleTransformer(
        `text-gray`,
        {
            'size-50': size === 'xx-large',
            'size-40': size === 'x-large',
            'size-30': size === 'large',
            'size-24': size === 'medium',
            'h4 font-weight-400': size === 'small',
            'size-10': size === 'x-small',
            'size-9': size === 'xx-small',
        },
        classNameSubText,
    );

    const renderName = () => {
        return (
            <View style={[nameClass, styleWrapperText]}>
                <Text
                    style={[nameTextClass, styleNameText]}
                    colorDarkMode={colorDarkMode}
                    {...textNameProps}>
                    {displayName}
                </Text>
                {subLabel && (
                    <Text style={[subTextClass, styleSubText]}>{subLabel}</Text>
                )}
            </View>
        );
    };
    return (
        <View style={[wrapperClass, style]}>
            {position === 'before' && renderName()}
            {avatar && (
                <Avatar
                    avatar={avatar as any}
                    size={size}
                    {...avatarProps}
                    variant={variant}
                />
            )}
            {!avatar && (
                <Avatar
                    text={displayName.charAt(0)}
                    size={size}
                    {...avatarProps}
                    variant={variant}
                />
            )}
            {position === 'after' && renderName()}
        </View>
    );
};

export default AvatarName;
