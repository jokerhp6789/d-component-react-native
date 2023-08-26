import React from "react";
import { StyleSheet, ViewStyle, useColorScheme } from "react-native";
import {
    Calendar as RNCalendar,
    LocaleConfig as RNLocaleConfig,
    CalendarBaseProps,
    CalendarProps,
    MultiDotMarkingProps,
    DotMarkingProps,
    PeriodMarkingProps,
    MultiPeriodMarkingProps,
    CustomMarkingProps,
    DateObject as RNDateObject,
} from "react-native-calendars";
import Colors from "../../style/color/_color";
import { getStyleProps } from "../../style/style";
import Icon from "../icon/Icon";

export interface IDateObject extends RNDateObject {}

//@ts-ignore
export interface ICalendarProps
    extends CalendarBaseProps,
        Omit<Partial<MultiDotMarkingProps>, "markingType">,
        Omit<Partial<DotMarkingProps>, "markingType">,
        Omit<Partial<PeriodMarkingProps>, "markingType">,
        Omit<Partial<PeriodMarkingProps>, "markingType">,
        Omit<Partial<PeriodMarkingProps>, "markingType">,
        Omit<Partial<MultiPeriodMarkingProps>, "markingType">,
        Omit<Partial<CustomMarkingProps>, "markingType"> {
    enableSwipeMonths?: boolean | undefined;
    markingType?: "period" | "dot" | "multi-period" | "custom";
    markedDates?: CustomMarkingProps["markedDates"] &
        DotMarkingProps["markedDates"] &
        MultiDotMarkingProps["markedDates"] &
        MultiPeriodMarkingProps["markedDates"];
    style?: ViewStyle;
    className?: string;
    lightDarkMode?: boolean;
}

const darkTheme = {
    backgroundColor: Colors.dark,
    calendarBackground: Colors.dark,
    textSectionTitleColor: Colors.light,
    textSectionTitleDisabledColor: "#d9e1e8",
    selectedDayBackgroundColor: "#00adf5",
    selectedDayTextColor: Colors.light,
    todayTextColor: "#00adf5",
    dayTextColor: Colors.light,
    textDisabledColor: "grey",
    dotColor: "#00adf5",
    selectedDotColor: "#ffffff",
    arrowColor: Colors.primary,
    disabledArrowColor: "#d9e1e8",
    monthTextColor: Colors.light,
    indicatorColor: "blue",
    textDayFontWeight: "300",
    textMonthFontWeight: "bold",
    textDayHeaderFontWeight: "300",
    textDayFontSize: 14,
    textMonthFontSize: 14,
    textDayHeaderFontSize: 14,
};

const lightTheme = {
    backgroundColor: Colors.light,
    calendarBackground: Colors.light,
    textSectionTitleColor: Colors.dark,
    textSectionTitleDisabledColor: "#d9e1e8",
    selectedDayBackgroundColor: "#00adf5",
    selectedDayTextColor: Colors.dark,
    todayTextColor: "#00adf5",
    dayTextColor: Colors.dark,
    textDisabledColor: "grey",
    dotColor: "#00adf5",
    selectedDotColor: "#ffffff",
    arrowColor: Colors.primary,
    disabledArrowColor: "#d9e1e8",
    monthTextColor: Colors.dark,
    indicatorColor: "blue",
    textDayFontWeight: "300",
    textMonthFontWeight: "bold",
    textDayHeaderFontWeight: "300",
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16,
};

const Calendar: React.FC<ICalendarProps> = ({
    style,
    enableSwipeMonths = true,
    ...rest
}) => {
    const isDarkMode = useColorScheme() === "dark";
    const tranStyle = getStyleProps(rest);
    return (
        <RNCalendar
            theme={isDarkMode ? { ...darkTheme } : ({ ...lightTheme } as any)}
            renderArrow={(direction) => {
                if (direction === "left") {
                    return (
                        <Icon
                            name="keyboard-arrow-left"
                            color={Colors.primary as any}
                        />
                    );
                }
                if (direction === "right") {
                    return (
                        <Icon
                            name="keyboard-arrow-right"
                            color={Colors.primary as any}
                        />
                    );
                }
            }}
            {...rest}
            style={[styles.defaultStyle, tranStyle, style]}
            enableSwipeMonths={enableSwipeMonths}
        />
    );
};

export default Calendar;

export const LocaleConfig = RNLocaleConfig;

const styles = StyleSheet.create({
    defaultStyle: {
        // borderWidth: 1,
        // borderColor: "gray",
        // height: "auto",
    },
});
