import ClassNames from 'classnames';
import React, {ReactNode} from 'react';
import {Platform, StyleProp, useColorScheme, ViewStyle} from 'react-native';
import {ThemeProps} from '../../interface/iTheme';
import {isDark} from '../../style/color/_color';
import {ColorKeyType} from '../../style/constant/AppColors';
import {getColorValue} from '../../style/modifier';
import Button, {IButtonProps} from '../button/Button';
import Icon, {IIconProps} from '../icon/Icon';
import InputSearch, {IInputSearchProps} from '../input/InputSearch';
import Text from '../text/Text';
import View from '../view/View';

export interface IHeaderProps extends ThemeProps {
    title?: string;
    onLeftPress?: (props?: any) => any;
    onRightPress?: (props?: any) => any;
    customLeft?: ((props?: any) => ReactNode) | ReactNode;
    customRight?: ((props?: any) => ReactNode) | ReactNode;
    customTitle?: ((props?: any) => ReactNode) | ReactNode;
    leftIcon?: string;
    leftText?: string;
    rightIcon?: string;
    rightText?: string;
    theme?: ColorKeyType;
    className?: string;
    classNameTitle?: string;
    classNameSearch?: string;
    classNameRight?: string;
    classNameLeft?: string;
    showSearch?: boolean;
    autoCenterCustomTitle?: boolean;
    size?: 'medium' | 'large' | 'small';
    style?: StyleProp<ViewStyle>;
    // input search props
    textSearch?: IInputSearchProps['value'];
    onChangeTextSearch?: IInputSearchProps['onChangeText'];
    inputSearchProps?: IInputSearchProps;

    buttonLeftProps?: Partial<IButtonProps>;
    iconLeftProps?: Partial<IIconProps>;
    buttonRightProps?: Partial<IButtonProps>;
    iconRightProps?: Partial<IIconProps>;
}

const Header: React.FC<IHeaderProps> = ({
    title,
    onLeftPress,
    onRightPress,
    customLeft,
    customRight,
    customTitle,
    leftIcon = 'arrow-back',
    leftText,
    rightIcon = 'more-horiz',
    rightText,
    theme,
    size = 'medium',
    className,
    classNameTitle,
    classNameSearch,
    classNameLeft,
    classNameRight,
    showSearch,
    autoCenterCustomTitle,
    colorDarkMode,
    style,
    textSearch,
    onChangeTextSearch,
    inputSearchProps = {},
    buttonLeftProps = {},
    iconLeftProps = {},
    buttonRightProps = {},
    iconRightProps = {},
}) => {
    const isDarkMode = useColorScheme() === 'dark';
    const bgColor = isDarkMode
        ? getColorValue(colorDarkMode) || getColorValue(theme as any)
        : getColorValue(theme as any);
    const wrapperClass = ClassNames(
        `flex-center-y px-2 bg-${theme}`,
        {
            'py-2': showSearch || size === 'medium',
            'py-3': size === 'large',
            'py-1': size === 'small',
        },
        className,
    );
    const titleClass = ClassNames(
        'flex-1 font-weight-bold text-center position-absolute left-40 right-40',
        {
            'text-dark': theme && !isDark(bgColor),
            'text-white': theme && isDark(bgColor),
            h5: size === 'small',
            h4: size === 'medium',
            h3: size === 'large',
        },
        classNameTitle,
    );

    const leftClass = ClassNames('px-0', classNameLeft);
    const rightClass = ClassNames('px-0', classNameRight);

    const headerStyle: Array<any> = [];

    if (style) {
        headerStyle.push(style);
    }

    const searchClass = ClassNames('flex-1 mx-3', classNameSearch);

    const getTextColor = () => {
        if (!theme) {
            if (isDarkMode) {
                return 'light';
            }
            return 'dark';
        }
        if (isDark(bgColor)) {
            return 'light';
        }
        return 'dark';
    };

    const renderLeft = () => {
        if (customLeft) {
            if (typeof customLeft === 'function') {
                return customLeft();
            }
            return customLeft;
        }
        if (leftText) {
            return (
                <Button
                    className={leftClass}
                    height="auto"
                    variant="trans"
                    color={getTextColor()}
                    onPress={onLeftPress}
                    label={leftText}
                    {...buttonLeftProps}
                />
            );
        }
        return (
            <Icon
                color={getTextColor()}
                className={leftClass}
                onPress={onLeftPress}
                // size={Platform.OS === 'android' ? 28 : undefined}
                style={[{zIndex: 20, elevation: 10}, iconLeftProps?.style]}
                name={leftIcon}
                {...iconLeftProps}
            />
        );
    };

    const renderCenter = () => {
        if (showSearch) {
            return (
                <InputSearch
                    className={searchClass}
                    value={textSearch}
                    onChangeText={onChangeTextSearch}
                    {...inputSearchProps}
                />
            );
        }

        if (customTitle && !autoCenterCustomTitle) {
            return null;
        }

        return <View className="flex-1" colorDarkMode="transparent" />;
    };

    const renderTitle = () => {
        if (showSearch) {
            return null;
        }
        if (customTitle) {
            let content = customTitle;
            if (typeof customTitle === 'function') {
                content = customTitle() as any;
            }
            if (autoCenterCustomTitle) {
                return typeof content === 'string' ? (
                    <Text
                        style={{zIndex: 1, pointerEvents: 'none'}}
                        className={titleClass}>
                        {content}
                    </Text>
                ) : (
                    <View
                        style={{zIndex: 1, pointerEvents: 'none'}}
                        className={titleClass}
                        colorDarkMode="transparent">
                        {content}
                    </View>
                );
            }

            return content;
        }
        if (title) {
            return (
                <Text
                    style={{
                        zIndex: 1,
                        elevation: 1,
                        pointerEvents: 'none',
                    }}
                    className={titleClass}>
                    {title}
                </Text>
            );
        }
    };

    const renderRight = () => {
        if (customRight) {
            if (typeof customRight === 'function') {
                return customRight();
            }
            return customRight;
        }
        if (rightText) {
            return (
                <Button
                    className={rightClass}
                    height="auto"
                    variant="trans"
                    color={getTextColor()}
                    onPress={onRightPress}
                    label={rightText}
                    {...buttonRightProps}
                />
            );
        }
        return (
            <Icon
                color={getTextColor()}
                className={rightClass}
                onPress={onRightPress}
                name={rightIcon}
                {...iconRightProps}
            />
        );
    };

    return (
        <View
            className={wrapperClass}
            style={headerStyle}
            colorDarkMode={colorDarkMode}>
            {(onLeftPress || customLeft) && renderLeft()}
            {renderTitle()}
            {renderCenter()}
            {(onRightPress || customRight) && renderRight()}
        </View>
    );
};

export default Header;
