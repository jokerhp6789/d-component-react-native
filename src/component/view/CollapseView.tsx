import React, {useMemo, useState} from 'react';
import {LayoutAnimation, TouchableOpacity, View} from 'react-native';
import {IStyleTransformerProps, styleTransformer} from '../../style/style';
import Icon, {IIconProps} from '../icon/Icon';
import Text from '../text/Text';

export interface ICollapseViewProps {
    className?: IStyleTransformerProps;
    title?: string;
    children?: any;
    onPress?: any;
    defaultExpanding?: boolean;
    showIcon?: boolean;
    iconProps?: Partial<IIconProps>;
}

const CollapseView: React.FC<ICollapseViewProps> = ({
    className,
    children = null,
    title,
    defaultExpanding = true,
    showIcon = true,
    iconProps = {},
    onPress,
}) => {
    const [expanding, setExpanding] = useState(defaultExpanding);
    const iconView = useMemo(() => {
        if (!showIcon) {
            return null;
        }
        return (
            <View
                style={styleTransformer('rounded-full', {
                    transform: [
                        {
                            rotate: expanding ? '180deg' : '0deg',
                        },
                        {perspective: 1000},
                    ],
                })}>
                <Icon
                    name="expand-more"
                    color="primary"
                    {...iconProps}
                    colorDarkMode="light"
                />
            </View>
        );
    }, [showIcon, expanding, iconProps]);

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.9}
            style={styleTransformer(`bg-light rounded-2  ${className}`)}>
            <TouchableOpacity
                disabled={!!onPress}
                activeOpacity={0.85}
                style={styleTransformer(
                    `flex-center-y justify-between rounded-2 px-3 py-[10]`,
                )}
                onPress={() => {
                    if (!children) {
                        return;
                    }
                    setExpanding(!expanding);
                    LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut,
                    );
                }}>
                {title ? (
                    <Text
                        className="h5 font-weight-bold text-primary"
                        colorDarkMode="light">
                        {title}
                    </Text>
                ) : null}
                {iconView}
            </TouchableOpacity>
            {expanding && children}
        </TouchableOpacity>
    );
};

export default CollapseView;
