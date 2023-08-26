import moment from "moment";
import React, { useState } from "react";
import { TextStyle, useColorScheme, ViewStyle } from "react-native";
// @ts-ignore
import MonthPicker from "react-native-month-picker";
import { Icon } from "../..";
import AppColors, { ColorKeyType } from "../../style/constant/AppColors";
import Fonts from "../../style/font/_font";
import { getColorValue } from "../../style/modifier";
import Modal, { IModalProps } from "../modal/Modal";

export interface IMonthYearModalProps extends IModalProps {
    onChange?: (value: Date) => any;
    value?: Date;
    maximumDate?: Date;
    minimumDate?: Date;
    prevText?: string;
    nextText?: string;
    prevIcon?: React.ReactNode;
    nextIcon?: React.ReactNode;
    selectedBackgroundColor?: ColorKeyType;
    style?: ViewStyle;
    monthFormat?: "MMM" | "MMMM" | "MM";
    locale?: string;
}

const MonthYearModal: React.FC<IMonthYearModalProps> = ({
    open,
    onClose,
    onChange,
    value,
    minimumDate,
    maximumDate,
    prevText,
    nextText,
    selectedBackgroundColor,
    style,
    monthFormat,
    locale,
    prevIcon,
    nextIcon,
}) => {
    const isDarkMode = useColorScheme() === "dark";

    const [selectingDate, setSelectingDate] = useState<Date>(
        value || moment().toDate()
    );
    const thisTextStyle: TextStyle = {
        ...Fonts.fontClass.h4,
        color: isDarkMode ? "white" : "black",
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            position="bottom"
            size="medium"
            style={{ marginHorizontal: 0 }}
            swipeable={false}
            showFooter
            onSave={() => {
                onChange && onChange(selectingDate);
                onClose && onClose();
            }}
        >
            <MonthPicker
                selectedDate={selectingDate}
                onMonthChange={(value: any) => {
                    const trans = moment(value).toDate();
                    setSelectingDate && setSelectingDate(trans);
                }}
                minDate={minimumDate ? moment(minimumDate) : undefined}
                maxDate={
                    maximumDate
                        ? moment(maximumDate)
                        : moment().add(1000, "years")
                }
                nextText={nextText}
                prevText={prevText}
                prevIcon={
                    prevIcon || (
                        <Icon
                            name="arrow-left"
                            color={isDarkMode ? "white" : "black"}
                        />
                    )
                }
                nextIcon={
                    nextIcon || (
                        <Icon
                            name="arrow-right"
                            color={isDarkMode ? "white" : "black"}
                        />
                    )
                }
                containerStyle={[
                    {
                        backgroundColor: isDarkMode
                            ? AppColors.dark
                            : AppColors.light,
                    },
                    style,
                ]}
                selectedBackgroundColor={getColorValue(selectedBackgroundColor)}
                yearTextStyle={thisTextStyle}
                monthTextStyle={thisTextStyle}
                localeLanguage={locale}
            />
        </Modal>
    );
};

export default MonthYearModal;
