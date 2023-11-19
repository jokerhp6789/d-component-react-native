import React, {forwardRef, useImperativeHandle, useMemo, useState} from 'react';
import {LayoutAnimation, TouchableOpacity, View} from 'react-native';
import {IStyleTransformerProps, styleTransformer} from '../../style/style';
import Icon, {IIconProps} from '../icon/Icon';
import Text, {ITextProps} from '../text/Text';

export interface ICollapseViewProps {
    className?: IStyleTransformerProps;
    classNameContent?: IStyleTransformerProps;
    classNameText?: IStyleTransformerProps;
    title?: string;
    children?: any;
    onPress?: any;
    defaultExpanding?: boolean;
    showIcon?: boolean;
    iconProps?: Partial<IIconProps>;
    textProps?: Partial<ITextProps>;
    customContent?: (() => React.ReactNode) | React.ReactNode;
}

export interface ICollapseViewMethods {
    toggle: () => void;
}

const CollapseView: React.ForwardRefRenderFunction<
    ICollapseViewMethods,
    ICollapseViewProps
> = (
    {
        className,
        classNameContent,
        classNameText,
        children = null,
        title,
        defaultExpanding = true,
        showIcon = true,
        iconProps = {},
        textProps = {},
        onPress,
        customContent,
    },
    ref,
) => {
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
    const content = useMemo(() => {
        if (customContent) {
            return typeof customContent === 'function'
                ? customContent()
                : customContent;
        }

        return (
            <View
                style={styleTransformer(
                    `flex-center-y justify-between`,
                    classNameContent,
                )}>
                {title ? (
                    <Text
                        {...textProps}
                        className={`h5 font-weight-bold text-primary ${classNameText}`}>
                        {title}
                    </Text>
                ) : null}
                {iconView}
            </View>
        );
    }, [iconView, title, classNameContent, textProps, customContent]);

    useImperativeHandle(ref, () => ({
        toggle: () => {
            setExpanding(!expanding);
        },
    }));

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.9}
            style={styleTransformer(`bg-light  ${className}`)}>
            <TouchableOpacity
                disabled={!!onPress}
                activeOpacity={0.9}
                onPress={() => {
                    if (!children) {
                        return;
                    }
                    LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut,
                    );
                    setExpanding(!expanding);
                }}>
                {content}
            </TouchableOpacity>
            {expanding && children}
        </TouchableOpacity>
    );
};

export default forwardRef(CollapseView);
