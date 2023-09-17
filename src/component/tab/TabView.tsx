/* eslint-disable no-nested-ternary */
import ClassNames from 'classnames';
import React, {
    ElementRef,
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import {
    Dimensions,
    Platform,
    StyleProp,
    StyleSheet,
    TextStyle,
    useColorScheme,
    ViewStyle,
} from 'react-native';
import {
    Route,
    SceneRendererProps,
    TabBarProps,
    TabView as RNTabView,
    TabViewProps,
} from 'react-native-tab-view';
import Colors from '../../style/color/_color';
import {ColorKeyType} from '../../style/constant/AppColors';
import {getColorValue} from '../../style/modifier';
import {getStyleProps} from '../../style/style';
import AwesomeList, {IAwesomeListProps} from '../list/awesomeList/AwesomeList';
import Text from '../text/Text';
import View from '../view/View';
import TabBarComponent from './TabBarComponent';
import Configs from '../../style/config/_config';

export interface ITabViewRoute extends Route {
    label?: string;
    render?: (props?: any) => any;
    component?: React.ReactNode;
}

export interface IRenderTabViewProps<T> extends SceneRendererProps {
    tabIndex: number;
    route: T;
}

export interface ITabViewProps
    extends Omit<
        Partial<TabViewProps<any>>,
        'onIndexChange' | 'navigationState'
    > {
    key?: any;
    variant?: 'standard' | 'pilled' | 'rounded' | 'box';
    initialIndex?: number;
    dataSource: Array<ITabViewRoute>;
    onChangeIndex?: (index: number) => any;
    labelWidth?: number | string;
    labelPadding?: number;
    isSeparate?: boolean; // if true all the tab view will be render using AwesomeList component
    scrollEnabled?: boolean;
    renderTabView?: (
        props: IRenderTabViewProps<ITabViewRoute>,
    ) => React.ReactNode;
    source?: (
        props: {pageIndex: number; pageSize: number},
        index: number,
    ) => any;
    transformer?: (res: any, index: number) => any;
    renderItem?: ({
        item,
        index,
        tabIndex,
    }: {
        item: any;
        index: number;
        tabIndex: number;
    }) => any;
    // Class Name
    className?: string;
    classNameLabel?: string;
    classNameTabBarWrapper?: string; //=> class name for view component wrap outside of tab-bar when renderTabBarSideView is active
    // Style
    tabBarStyle?: StyleProp<ViewStyle>;
    tabBarWrapperStyle?: StyleProp<ViewStyle>; // => style for view component wrap outside of tab-bar when renderTabBarSideView is active
    listStyle?: StyleProp<ViewStyle>;
    tabStyle?: StyleProp<ViewStyle>;
    activeLabelStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<ViewStyle>;
    textLabelStyle?: TextStyle;
    //Color
    colorActiveLabelText?: ColorKeyType;
    colorLabelText?: ColorKeyType;
    colorIndicator?: ColorKeyType;
    colorActiveLabelTextDarkMode?: ColorKeyType;
    colorLabelTextDarkMode?: ColorKeyType;
    colorIndicatorDarkMode?: ColorKeyType;
    backgroundColor?: ColorKeyType;
    backgroundColorDarkMode?: ColorKeyType;

    awesomeListProps?: Partial<IAwesomeListProps<any>>;
    getLabel?: (item?: ITabViewRoute) => string | Element;

    renderTabBarSideView?:
        | ((props: {index: any; routes: any}) => Element)
        | Element;

    renderCustomLabel?: TabBarProps<ITabViewRoute>['renderLabel'];
    renderLabelPrefix?: TabBarProps<ITabViewRoute>['renderLabel'];
    renderLabelSuffix?: TabBarProps<ITabViewRoute>['renderLabel'];
}
export interface ITabViewMethod {
    refreshList: (props?: any) => any;
}

const getTabViewColorProps = (defaultColor: any, color?: ColorKeyType) => {
    if (!color) {
        return defaultColor;
    }
    return getColorValue(color);
};

function TabView(
    {
        source,
        transformer,
        renderItem,
        getLabel,
        onChangeIndex,
        renderTabView,
        renderTabBarSideView,
        renderCustomLabel,
        renderLabelPrefix,
        renderLabelSuffix,
        initialIndex = 0,
        dataSource = [],
        labelWidth = 90,
        labelPadding = 10,
        isSeparate = true,
        variant = 'standard',
        scrollEnabled = false,
        style,
        tabBarStyle,
        tabStyle,
        listStyle,
        tabBarWrapperStyle,
        colorActiveLabelText,
        colorActiveLabelTextDarkMode,
        colorLabelText,
        colorLabelTextDarkMode,
        colorIndicator,
        colorIndicatorDarkMode,
        backgroundColor,
        backgroundColorDarkMode,
        textLabelStyle = {},
        activeLabelStyle,
        labelStyle,
        key,
        awesomeListProps = {} as any,
        classNameLabel,
        classNameTabBarWrapper,
        ...rest
    }: ITabViewProps,

    ref: React.ForwardedRef<ITabViewMethod>,
) {
    const {generalConfig} = Configs;
    const {colorDarkMode, autoSwitchColor} = generalConfig || {};
    const [index, setIndex] = useState(initialIndex);
    const [routes] = useState(dataSource);
    const listRef = useRef<ElementRef<typeof AwesomeList>>(null);
    const tranStyle = getStyleProps(rest);
    const isDarkMode = useColorScheme() === 'dark';
    const showLabelBgColor = variant !== 'standard';
    const containerBg = {
        backgroundColor: isDarkMode
            ? backgroundColorDarkMode
                ? backgroundColorDarkMode
                : autoSwitchColor
                ? colorDarkMode || Colors.dark
                : 'undefined'
            : backgroundColor,
    };

    useImperativeHandle(ref, () => ({
        refreshList: () => {
            listRef.current && listRef.current.refresh();
        },
    }));

    const renderScene = ({route}: {route: ITabViewRoute}) => {
        if (Math.abs(index - routes.indexOf(route)) > 0) {
            return <View />;
        }
        return (
            <AwesomeList
                key={route.key}
                ref={listRef}
                isPaging
                pageSize={10}
                {...awesomeListProps}
                keyExtractor={(item, index) => `${item?.id}${index}`}
                source={paging => source && source(paging, index)}
                transformer={res => transformer && transformer(res, index)}
                renderItem={data =>
                    renderItem && renderItem({...data, tabIndex: index})
                }
                listStyle={listStyle}
            />
        );
    };

    const renderTabBar: TabViewProps<ITabViewRoute>['renderTabBar'] = props => {
        const tabBarClass = ClassNames('border-bottom-0', {
            'bg-white': !isDarkMode,
            'bg-dark': isDarkMode,
        });
        const tabClass = ClassNames({'width-auto': scrollEnabled});

        const getIndicatorColor = () => {
            if (!showLabelBgColor) {
                return isDarkMode
                    ? getTabViewColorProps(
                          Colors.primary,
                          colorIndicatorDarkMode,
                      )
                    : getTabViewColorProps(Colors.primary, colorIndicator);
            }
            return isDarkMode
                ? getTabViewColorProps(Colors.light, colorIndicatorDarkMode)
                : getTabViewColorProps(Colors.dark, colorIndicator);
        };
        const tabBar = (
            <TabBarComponent
                {...(props as any)}
                style={[styles.tabBar, tabBarStyle]}
                renderLabel={renderLabel}
                scrollEnabled={scrollEnabled}
                pressColor="#c2e0ff"
                bounces={false}
                tabStyle={tabStyle}
                className={tabBarClass}
                classNameTab={tabClass}
                indicatorStyle={{backgroundColor: getIndicatorColor()}}
            />
        );
        if (renderTabBarSideView) {
            return (
                <View
                    className={`flex-center-y justify-content-between ${classNameTabBarWrapper}`}
                    style={tabBarWrapperStyle}>
                    {tabBar}
                    {typeof renderTabBarSideView === 'function'
                        ? renderTabBarSideView({index, routes})
                        : renderTabBarSideView}
                </View>
            );
        }
        return tabBar;
    };

    const renderLabel: TabBarProps<ITabViewRoute>['renderLabel'] = ({
        route,
        focused,
        color,
        ...rest
    }) => {
        if (renderCustomLabel) {
            return renderCustomLabel({route, focused, color, ...rest});
        }
        const labelClass = ClassNames(
            'flex-1 justify-content-center',
            {
                'bg-primary': focused && showLabelBgColor,
                'bg-white': isDarkMode && !focused && showLabelBgColor,
                'rounded-pilled': variant === 'pilled',
                'rounded-1': variant === 'rounded',
            },
            classNameLabel,
        );
        const textClass = ClassNames('h4 text-center px-2', {
            'font-weight-bold': !showLabelBgColor && focused,
        });
        let displayLabel: any = route?.label || route?.title;
        if (getLabel) {
            displayLabel = getLabel(route);
        }
        const textLabelColor = () => {
            if (showLabelBgColor) {
                return focused
                    ? getTabViewColorProps(
                          Colors.white,
                          isDarkMode
                              ? colorActiveLabelTextDarkMode
                              : colorActiveLabelText,
                      )
                    : getTabViewColorProps(
                          Colors.black,
                          isDarkMode ? colorLabelTextDarkMode : colorLabelText,
                      );
            }
            return focused
                ? getTabViewColorProps(
                      Colors.primary,
                      isDarkMode
                          ? colorActiveLabelTextDarkMode
                          : colorActiveLabelText,
                  )
                : getTabViewColorProps(
                      Colors.grayDark,
                      isDarkMode
                          ? colorActiveLabelTextDarkMode
                          : colorLabelText,
                  );
        };

        const prefix = () => {
            if (renderLabelPrefix && typeof renderLabelPrefix === 'function') {
                return renderLabelPrefix({focused, color, route, ...rest});
            }
        };

        const suffix = () => {
            if (renderLabelSuffix && typeof renderLabelSuffix === 'function') {
                return renderLabelSuffix({focused, color, route, ...rest});
            }
        };

        return (
            <View
                style={[
                    {
                        paddingVertical: focused ? undefined : labelPadding,
                        width: labelWidth as any,
                    },
                    focused ? activeLabelStyle : labelStyle,
                ]}
                className={labelClass}>
                {prefix()}
                <Text
                    className={textClass}
                    style={{
                        color: textLabelColor(),
                        paddingBottom: Platform.OS === 'ios' ? 0 : undefined,
                        ...textLabelStyle,
                    }}
                    numberOfLines={1}>
                    {displayLabel}
                </Text>
                {suffix()}
            </View>
        );
    };

    return (
        <RNTabView
            //@ts-ignore
            renderScene={
                isSeparate
                    ? ({route, jumpTo, layout, position}) =>
                          renderTabView &&
                          renderTabView({
                              route,
                              tabIndex: index,
                              position,
                              layout,
                              jumpTo,
                          })
                    : renderScene
            }
            initialLayout={{width: Dimensions.get('window').width}}
            {...rest}
            key={key}
            renderTabBar={renderTabBar}
            navigationState={{index, routes}}
            onIndexChange={index => {
                setIndex(index);
                onChangeIndex && onChangeIndex(index);
            }}
            sceneContainerStyle={[
                styles.sceneContainerStyle,
                containerBg,
                tranStyle,
                style,
            ]}
        />
    );
}

export default forwardRef(TabView);

const styles = StyleSheet.create({
    sceneContainerStyle: {
        alignItems: 'center',
        width: '100%',
        flex: 1,
    },
    tabBar: {
        shadowOffset: {height: 0, width: 0},
        shadowColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
    },
});
