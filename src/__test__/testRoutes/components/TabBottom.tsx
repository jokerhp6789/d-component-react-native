import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {map} from 'lodash';
import React, {useContext} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from '../../../component/icon/Icon';
import Text from '../../../component/text/Text';
import StyleStateContext from '../../../context/StyleContext';
import useKeyboard from '../../../hooks/useKeyboard';
import Colors from '../../../style/color/_color';
import {styleTransformer} from '../../../style/style';

const ICON_SIZE = 24;
export const TAB_BAR_HEIGHT = Platform.OS === 'android' ? 75 : 70;

interface ITabIconProps {
    showBadge?: boolean;
    focused?: boolean;
    iconActive?: any;
    iconInactive?: any;
    tabBarLabel?: string;
    title?: string;
    isShowTabLabel?: boolean;
    onPress?: () => any;
}

export interface ITabBottomProps extends BottomTabBarProps {
    [key: string]: any;
}

export const getNotiNumber = (noti: any) => {
    if (!noti?.unreadNoti) {
        return '0';
    }
    if (noti?.unreadNoti > 9) {
        return '+9';
    }
    return noti?.unreadNoti?.toString();
};

const MAIN_TABS = [
    {
        key: 'homeTabStacks',
        tabBarLabel: 'home',
        iconSvg: <Icon name="home" type="ionicon" />,
    },
    {
        key: 'nativeTabStacks',
        tabBarLabel: 'native',
        iconSvg: <Icon name="apple" type="font-awesome" />,
    },
    {
        key: 'settingTabStacks',
        tabBarLabel: 'setting',
        iconSvg: <Icon name="cog" type="font-awesome" />,
    },
];

const TabBottom: React.FC<ITabBottomProps> = props => {
    const {colorSchema} = useContext(StyleStateContext);
    const {navigation, state} = props || {};
    const {routes, index} = state || {};
    const isDarkMode = colorSchema === 'dark';
    const {isKeyboardShow} = useKeyboard();
    const renderTabItem = (
        element: (typeof MAIN_TABS)[0],
        elementIndex?: number,
    ) => {
        const {tabBarLabel, iconSvg} = element || {};
        const focused = elementIndex === index;
        let content = (
            <TabIcon
                focused={focused}
                key={`${iconSvg}_${elementIndex}`}
                tabBarLabel={tabBarLabel}
                iconActive={iconSvg}
            />
        );
        return (
            <TouchableOpacity
                activeOpacity={0.95}
                key={`${element.key}_${iconSvg}`}
                onPress={() => navigation?.navigate?.(element.key)}
                style={styleTransformer('flex-1 pb-3', {
                    'border-top-2 border-primary': focused,
                    'border-white': focused && isDarkMode,
                })}>
                {content}
            </TouchableOpacity>
        );
    };

    return (
        <View
            style={styleTransformer(
                'flex-center-y border-top bg-white shadow',
                {
                    height: TAB_BAR_HEIGHT,
                    borderTopColor: Colors.light,
                    display: isKeyboardShow ? 'none' : 'flex',
                },
            )}>
            {map(MAIN_TABS, renderTabItem)}
        </View>
    );
};

export default TabBottom;

const TabIcon: React.FC<ITabIconProps> = props => {
    const {
        showBadge = false,
        focused,
        title,
        tabBarLabel,
        onPress,
        isShowTabLabel = false,
    } = props;

    const getIconColor = (focused?: boolean) => {
        if (focused) {
            return Colors.primary;
        }
        return Colors.grayDark;
    };

    const renderViewIcon = (focused?: boolean) => {
        const {iconActive, tabBarLabel} = props;
        const icon = React.cloneElement(iconActive, {
            width: ICON_SIZE,
            height: ICON_SIZE,
            fill: getIconColor(focused),
        });
        return icon;
    };

    return (
        <View
            style={[
                {
                    ...stylesObj.tabContainer,
                },
            ]}>
            <View style={[stylesObj.tabContainer]}>
                {renderViewIcon(focused)}
                {isShowTabLabel && (
                    <Text style={{}} numberOfLines={1}>
                        {tabBarLabel || ''}
                    </Text>
                )}
            </View>
        </View>
    );
};

const stylesObj = StyleSheet.create({
    tabContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: TAB_BAR_HEIGHT,
    },
});
