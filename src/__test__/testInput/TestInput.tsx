/** @format */

import React, { ElementRef, useRef, useState } from "react";
import DatePicker from "react-native-date-picker";
import CheckBox from "../../component/checkbox/CheckBox";
import InputDate from "../../component/input/InputDate";
import InputDateRange from "../../component/input/InputDateRange";
import InputSearch from "../../component/input/InputSearch";
import InputText from "../../component/input/InputText";
import Text from "../../component/text/Text";
import ScrollView from "../../component/view/ScrollView";
import TouchableOpacity from "../../component/view/TouchableOpacity";
import View from "../../component/view/View";

export interface ITestInputProps {
    [key: string]: any;
}

const TestInput: React.FC<ITestInputProps> = ({ id }) => {
    const dateRef = useRef<ElementRef<typeof DatePicker>>(null);
    const [openDateModal, setOpenDateModal] = useState(false);
    const [date, setDate] = useState<any>();
    const [dateRange, setDateRange] = useState<any[]>([]);

    return (
        <ScrollView className="my-4 w-100">
            {/* <CheckBox /> */}
            <InputText
                variant="standard"
                className="my-2"
                label="Input Standard"
                color="red"
                colorDark="yellow"
                onPressIcon={() => {}}
                placeholder="Input Standard"
                // error="Error Test Input"
            />

            <InputText
                variant="rounded"
                className="my-2"
                label="Input Rounded"
                color="red"
                placeholder="Input Rounded"
                onPressIcon={() => {}}
            />
            <InputSearch
                variant="pill"
                className="my-2"
                onPressIcon={() => {}}
                label="Search Input"
                colorFocus="pink"
                colorDark="yellow"
                useKeyboardAvoidingView
                offsetSpaceKeyboard={50}
            />
            <InputDate
                label="Date Input Select Month Year"
                variant="outline"
                className="my-2"
                mode="month"
                format="MM/YYYY"
                placeholder="Date Input Select Month Year"
                onChange={(v) => {
                    setDate(v);
                }}
                value={date}
            />
            <InputDate
                label="Date Input Outline"
                variant="outline"
                className="my-2"
                mode="date"
                placeholder="Date Input Outline"
                onChange={(v) => {
                    setDate(v);
                }}
                disabled
                value={date}
            />
            <InputDate
                label="Date Input Standard"
                variant="standard"
                className="my-2"
                mode="datetime"
                onChange={(v) => {
                    setDate(v);
                }}
                value={date}
                // disabled
                placeholder="Date Input Outline"
            />
            <InputDate
                label="Date Input Rounded"
                variant="rounded"
                className="my-2"
                mode="datetime"
                placeholder="Date Input Rounded"
                onChange={(v) => {
                    setDate(v);
                }}
                value={date}
            />
            <InputDate
                label="Date Input Pill"
                variant="pill"
                className="my-2"
                mode="date"
                placeholder="Date Input Pill"
                onChange={(v) => {
                    setDate(v);
                }}
                value={date}
            />
            <InputDateRange
                label="Date Input Range Month Year"
                className="my-2"
                value={dateRange}
                onChange={(v = []) => setDateRange(v)}
                mode="month"
                format="MM/YYYY"
            />
            <InputDateRange
                label="Date Input Range"
                className="my-2"
                value={dateRange}
                onChange={(v = []) => setDateRange(v)}
                mode="date"
            />

            <InputDate
                variant="icon"
                label="Date Input Icon"
                className="my-2 align-self-start"
                mode="datetime"
                placeholder="Date Input Pill"
                onChange={(v) => {
                    setDate(v);
                }}
                value={date}
            />
            <InputText
                variant="outline"
                className="my-2"
                label="Input Outline"
                placeholder="Input Outline"
                onPressIcon={() => {}}
                error=""
                useKeyboardAvoidingView
            />
            <InputText
                variant="pill"
                iconName="visibility"
                className="my-2"
                label="Input Pill"
                placeholder="Input Pill"
                onPressIcon={() => {}}
                useKeyboardAvoidingView
                // error="123"
            />
            {/* <DatePicker
        modal
        date={new Date()}
        onConfirm={() => setOpenDateModal(false)}
        open={openDateModal}
        onCancel={() => {
          setOpenDateModal(false);
        }}
        mode="datetime"
        androidVariant="nativeAndroid"
      /> */}
        </ScrollView>
    );
};

export default TestInput;
