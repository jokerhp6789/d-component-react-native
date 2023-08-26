import ClassNames from "classnames";
import React, { ElementRef, useEffect, useRef } from "react";
import {
    FlatList,
    FlatListProps,
    StyleSheet,
    TextStyle,
    useColorScheme,
    ViewStyle,
} from "react-native";
import { AppSizes } from "../..";
import { ColorKeyType } from "../../style/constant/AppColors";
import { getColorValue } from "../../style/modifier";
import Icon from "../icon/Icon";
import { IBadgeProps } from "../items/Badge";
import Text from "../text/Text";
import TouchableOpacity from "../view/TouchableOpacity";
import View from "../view/View";

export interface ITabStepperItemData {
    id: any;
    label: string;
    style?: ViewStyle;
    [key: string]: any;
}

export interface ITabStepperProps extends Partial<ITabStepperItemProps> {
    dataSource: ITabStepperItemData[];
    value?: ITabStepperItemData;
    className?: string;
    classNameScrollView?: string;
    scrollable?: boolean;
    onChange?: (value: ITabStepperItemData, index?: number) => any;
    getValue?: (item: ITabStepperItemData, index?: number) => any;
    getLabel?: (item: ITabStepperItemData, index?: number) => any;
    onPressItem?: (item: ITabStepperItemData, index: number) => any;
    getItemProps?: (props: {
        item: ITabStepperItemData;
        isActive: boolean;
        isPassed: boolean;
    }) => Partial<ITabStepperItemProps>;
    style?: ViewStyle;
    styleScrollView?: ViewStyle;
    flatListProps?: FlatListProps<any>;
}

export interface ITabStepperItemThemeColors {
    activeColor?: ColorKeyType;
    activeColorDarkMode?: ColorKeyType;
    inActiveColor?: ColorKeyType;
    inActiveColorDarkMode?: ColorKeyType;
    indexActiveColorDarkMode?: ColorKeyType;
    indexActiveColor?: ColorKeyType;
    indexInActiveColorDarkMode?: ColorKeyType;
    indexInActiveColor?: ColorKeyType;
    labelActiveColorDarkMode?: ColorKeyType;
    labelActiveColor?: ColorKeyType;
    labelInActiveColorDarkMode?: ColorKeyType;
    labelInActiveColor?: ColorKeyType;
}

export interface ITabStepperItemProps {
    valueItem: ITabStepperItemData;
    index: number;
    isLastStep?: boolean;
    active?: boolean;
    isPassed?: boolean;
    onPress?: any;
    style?: ViewStyle;
    getLabel?: (item: ITabStepperItemData) => any;
    styleTextIndex?: TextStyle;
    styleTextLabel?: TextStyle;
    variant?: "icon" | "index";
    shape?: IBadgeProps["shape"];
    showBorderActive?: boolean;
    tabLineLength?: number;
    tabLineHeight?: number;
    firstDistance?: number;
    lastDistance?: number;
    themeColors?: ITabStepperItemThemeColors;
}

export const TabStepperItem: React.FC<ITabStepperItemProps> = ({
    valueItem,
    index,
    active,
    isPassed,
    isLastStep,
    onPress,
    style,
    styleTextIndex,
    styleTextLabel,
    getLabel = (item) => item?.label,
    variant = "index",
    shape = "circle",
    showBorderActive,
    tabLineLength = 20,
    tabLineHeight = 5,
    firstDistance = 30,
    lastDistance = 30,
    themeColors = {},
}) => {
    const {
        activeColor = "primary",
        activeColorDarkMode = "light",
        inActiveColor = "gray",
        inActiveColorDarkMode = "disabled",
        indexActiveColor = "white",
        indexActiveColorDarkMode = "black",
        indexInActiveColor = "white",
        indexInActiveColorDarkMode = "black",
        labelActiveColor = "black",
        labelActiveColorDarkMode = "white",
        labelInActiveColor = "black",
        labelInActiveColorDarkMode = "white",
    } = themeColors || {};

    const isDarkMode = useColorScheme() === "dark";
    const colorActive = getColorValue(
        isDarkMode ? activeColorDarkMode : activeColor
    );
    const colorInActive = getColorValue(
        isDarkMode ? inActiveColorDarkMode : inActiveColor
    );
    const indexColorActive = getColorValue(
        isDarkMode ? indexActiveColorDarkMode : indexActiveColor
    );
    const indexColorInActive = getColorValue(
        isDarkMode ? indexInActiveColorDarkMode : indexInActiveColor
    );
    const labelColorActive = getColorValue(
        isDarkMode ? labelActiveColorDarkMode : labelActiveColor
    );
    const labelColorInActive = getColorValue(
        isDarkMode ? labelInActiveColorDarkMode : labelInActiveColor
    );
    const displayLabel = getLabel(valueItem);

    const colorStyleActive: ViewStyle = {
        backgroundColor: colorActive,
    };

    const colorStyleInActive: ViewStyle = {
        backgroundColor: colorInActive,
    };

    const indexWrapperClass = ClassNames({
        "rounded-pill": shape === "circle",
        "rounded-2": shape === "rounded",
        "border-2 border-blue": showBorderActive && active,
    });
    const tabLineStyle: ViewStyle = {
        width: tabLineLength,
        height: tabLineHeight,
    };

    const indexView = () => {
        if (variant === "icon") {
            return (
                <Icon
                    name="check"
                    size={16}
                    color={
                        active || isPassed
                            ? indexColorActive
                            : indexColorInActive
                    }
                />
            );
        }
        return (
            <Text
                style={[styleTextIndex]}
                color={
                    active || isPassed ? indexColorActive : indexColorInActive
                }
            >
                {index}
            </Text>
        );
    };

    return (
        <View
            style={[
                styles.tabItem,
                { marginRight: isLastStep ? lastDistance : undefined },
                { marginLeft: index === 0 ? firstDistance : undefined },
                style,
            ]}
            colorDarkMode="transparent"
        >
            {index !== 0 && (
                <View
                    style={[
                        tabLineStyle,
                        active || isPassed
                            ? colorStyleActive
                            : colorStyleInActive,
                    ]}
                />
            )}
            <TouchableOpacity
                style={styles.tabLabel}
                onPress={onPress}
                colorDarkMode="transparent"
            >
                <View
                    style={[
                        {
                            justifyContent: "center",
                            alignItems: "center",
                            width: 30,
                            height: 30,
                            ...colorStyleActive,
                        },
                        active || isPassed
                            ? colorStyleActive
                            : colorStyleInActive,
                    ]}
                    className={indexWrapperClass}
                >
                    {indexView()}
                </View>
                {displayLabel && (
                    <Text
                        style={[
                            styles.tabLabelText,
                            {
                                color:
                                    active || isPassed
                                        ? labelColorActive
                                        : labelColorInActive,
                            },
                            styleTextLabel,
                        ]}
                    >
                        {displayLabel}
                    </Text>
                )}
            </TouchableOpacity>
            {!isLastStep && (
                <View
                    style={[
                        tabLineStyle,
                        isPassed ? colorStyleActive : colorStyleInActive,
                    ]}
                />
            )}
        </View>
    );
};

const TabStepper: React.FC<ITabStepperProps> = ({
    dataSource,
    value,
    onChange,
    getValue = (item) => item?.id,
    getLabel = (item) => item?.label,
    onPressItem,
    getItemProps,
    className,
    classNameScrollView,
    scrollable,
    variant,
    shape,
    style,
    styleScrollView,
    flatListProps = {},
    ...rest
}) => {
    const listRef = useRef<ElementRef<typeof FlatList>>(null);

    useEffect(() => {
        const findIndex = dataSource.findIndex(
            (item) => getValue(value as any) === getValue(item)
        );
        if (findIndex !== -1) {
            listRef.current &&
                listRef.current.scrollToIndex({ index: findIndex });
        }
    }, [value]);

    const renderItem = (iTab: ITabStepperItemData, index: number) => {
        const activeIndex = dataSource.findIndex(
            (item) => getValue(value as any, index) === getValue(item, index)
        );
        const isActive = activeIndex === index;
        const isPassed = activeIndex > index;
        let itemProps: any = {};
        if (getItemProps) {
            itemProps = getItemProps({ item: iTab, isActive, isPassed });
        }
        return (
            <TabStepperItem
                key={`${iTab?.id}_${iTab?.label}_${index}`}
                isLastStep={index === dataSource?.length - 1}
                active={isActive}
                isPassed={isPassed}
                getLabel={() => getLabel && getLabel(iTab, index)}
                onPress={() => onPressItem && onPressItem(iTab, index)}
                variant={variant}
                shape={shape}
                {...rest}
                {...itemProps}
                valueItem={iTab}
                index={index}
            />
        );
    };

    const content = (
        <View
            style={[styles.container, style]}
            className={className}
            colorDarkMode="transparent"
        >
            {dataSource.map((iTab, index) => {
                return renderItem(iTab, index);
            })}
        </View>
    );
    if (scrollable) {
        return (
            <FlatList
                showsHorizontalScrollIndicator={false}
                style={[{ width: AppSizes.screenWidth }, styleScrollView]}
                {...flatListProps}
                data={dataSource}
                renderItem={({ item, index }) => renderItem(item as any, index)}
                ref={listRef}
                horizontal
                onScrollToIndexFailed={({ index }) => {
                    listRef.current &&
                        listRef.current.scrollToIndex({ index: 0 });
                }}
            />
        );
    }
    return content;
};

export default TabStepper;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    tabItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    tabLabel: {
        alignItems: "center",
        position: "relative",
    },
    tabLabelText: {
        marginTop: 35,
        position: "absolute",
        overflow: "visible",
        width: 100,
        textAlign: "center",
    },
});
