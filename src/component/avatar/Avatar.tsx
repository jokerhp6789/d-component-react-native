import React from 'react';
import {View} from 'react-native';
import {ColorKeyType} from '../../style/constant/AppColors';
import {IStyleTransformerProps, styleTransformer} from '../../style/style';
import Image, {IImageProps} from '../image/Image';
import Text from '../text/Text';

export interface IAvatarProps extends Omit<IImageProps, 'source'> {
    size?:
        | number
        | 'xx-large'
        | 'x-large'
        | 'large'
        | 'medium'
        | 'small'
        | 'x-small'
        | 'xx-small'
        | 'tiny';
    variant?: 'rounded' | 'square' | 'circle';
    text?: string;
    color?: string;
    classNameImage?: IStyleTransformerProps;
    classNameLetter?: IStyleTransformerProps;
    avatar?: IImageProps['source'] | string | null;
    styleImage?: IImageProps['style'];
    showBorder?: boolean;
    borderColor?: ColorKeyType;
}

const Avatar: React.FC<IAvatarProps> = ({
    size = 'medium',
    avatar,
    variant = 'circle',
    className,
    classNameImage,
    classNameLetter,
    text,
    color = '#D8D8D8',
    borderColor = 'gray',
    resizeMode = 'cover',
    resizeMethod = 'auto',
    style,
    styleImage,
    showBorder,
    ...rest
}) => {
    const letterClass = styleTransformer(
        'text-white text-center font-weight-bold',
        {
            'font-size-80': size === 'xx-large',
            'font-size-60': size === 'x-large',
            'font-size-48': size === 'large',
            'font-size-36': size === 'medium',
            'font-size-30': size === 'small',
            'font-size-20': size === 'x-small',
            h3: size === 'xx-small',
            h4: size === 'tiny',
        },
        classNameLetter,
    );

    const wrapperClass = styleTransformer(
        `position-relative`,
        {
            [`image-square-${size}`]: typeof size === 'string',
            [`w-[${size}] h-[${size}]`]: typeof size === 'number' && size > 0,
            'justify-content-center align-items-center': !!text,
            'rounded-pill': variant === 'circle',
            'rounded-1': variant === 'rounded',
            [`border-2 border-${borderColor}`]: !!showBorder,
        },
        className,
    );

    const imageClass = styleTransformer('w-100 h-100', {
        'rounded-pill': variant === 'circle',
        'rounded-1': variant === 'rounded',
    });

    let content;

    const getSource = () => {
        if (typeof avatar === 'string') {
            return {uri: avatar};
        }
        return avatar;
    };

    if (text) {
        const firstLetter = text.charAt(0);
        content = <Text style={letterClass}>{firstLetter}</Text>;
    }
    if (avatar) {
        content = (
            <Image
                source={getSource() as any}
                resizeMode={resizeMode}
                resizeMethod={resizeMethod}
                style={[imageClass, styleImage]}
                {...rest}
            />
        );
    }
    return (
        <View style={[wrapperClass, {backgroundColor: color}, style]}>
            {content}
        </View>
    );
};

export default Avatar;
