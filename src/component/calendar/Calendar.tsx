import React, {ElementRef, useContext, useRef} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {
    CalendarProps,
    Calendar as RNCalendar,
    LocaleConfig as RNLocaleConfig,
    CalendarList,
    CalendarListProps,
} from 'react-native-calendars';
import StyleStateContext from '../../context/StyleContext';
import Colors from '../../style/color/_color';
import Sizes from '../../style/size/_size';
import {getStyleProps, IStyleTransformerProps} from '../../style/style';
import Icon from '../icon/Icon';

//@ts-ignore
export interface ICalendarProps extends CalendarProps {
    enableSwipeMonths?: boolean | undefined;
    markingType?: 'period' | 'dot' | 'multi-period' | 'custom';
    style?: StyleProp<ViewStyle>;
    className?: IStyleTransformerProps;
    lightDarkMode?: boolean;
    useCalendarList?: boolean;
    calendarListProps?: Partial<CalendarListProps>;
}

const darkTheme = {
    backgroundColor: Colors.dark,
    calendarBackground: Colors.dark,
    textSectionTitleColor: Colors.light,
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: '#00adf5',
    selectedDayTextColor: Colors.light,
    todayTextColor: '#00adf5',
    dayTextColor: Colors.light,
    textDisabledColor: 'grey',
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    arrowColor: Colors.primary,
    disabledArrowColor: '#d9e1e8',
    monthTextColor: Colors.light,
    indicatorColor: 'blue',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 14,
    textMonthFontSize: 14,
    textDayHeaderFontSize: 14,
};

const lightTheme = {
    backgroundColor: Colors.light,
    calendarBackground: Colors.light,
    textSectionTitleColor: Colors.dark,
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: '#00adf5',
    selectedDayTextColor: Colors.dark,
    todayTextColor: '#00adf5',
    dayTextColor: Colors.dark,
    textDisabledColor: 'grey',
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    arrowColor: Colors.primary,
    disabledArrowColor: '#d9e1e8',
    monthTextColor: Colors.dark,
    indicatorColor: 'blue',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16,
};

const Calendar: React.FC<ICalendarProps> = ({
    style,
    useCalendarList = false,
    calendarListProps: calendarListFromProps = {},
    ...rest
}) => {
    const {colorSchema} = useContext(StyleStateContext);
    const listRef = useRef<ElementRef<typeof CalendarList>>(null);
    const isDarkMode = colorSchema === 'dark';
    const tranStyle = getStyleProps(rest);
    const calendarProps: ICalendarProps = {
        theme: isDarkMode ? {...darkTheme} : ({...lightTheme} as any),
        enableSwipeMonths: true,
        ...rest,
        style: [styles.defaultStyle, tranStyle, style],
        renderArrow: direction => {
            if (direction === 'left') {
                return (
                    <Icon
                        name="keyboard-arrow-left"
                        color={Colors.primary as any}
                        colorDarkMode={Colors.light as any}
                    />
                );
            }
            if (direction === 'right') {
                return (
                    <Icon
                        name="keyboard-arrow-right"
                        color={Colors.primary as any}
                        colorDarkMode={Colors.light as any}
                    />
                );
            }
        },
    };
    const calendarListProps: CalendarListProps = {
        ...calendarProps,
        ...calendarListFromProps,
    };

    if (useCalendarList) {
        return (
            <CalendarList
                ref={listRef}
                horizontal
                pagingEnabled
                {...calendarListProps}
                enableSwipeMonths={rest?.enableSwipeMonths}
            />
        );
    }

    return <RNCalendar {...calendarProps} />;
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
