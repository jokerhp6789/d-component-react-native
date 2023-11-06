/** @format */

import React, {ElementRef, useRef, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import Button from '../../component/button/Button';
import InputComment from '../../component/input/InputComment';
import InputDate from '../../component/input/InputDate';
import InputDateRange from '../../component/input/InputDateRange';
import InputSearch from '../../component/input/InputSearch';
import InputText from '../../component/input/InputText';
import ScrollView from '../../component/view/ScrollView';
import useKeyboard from '../../hooks/useKeyboard';

export interface ITestInputProps {
    [key: string]: any;
}

const TestInput: React.FC<ITestInputProps> = ({id}) => {
    const dateRef = useRef<ElementRef<typeof DatePicker>>(null);
    const [openDateModal, setOpenDateModal] = useState(false);
    const [inputTextValue, setInputTextValue] = useState('');
    const [date, setDate] = useState<any>();
    const [dateRange, setDateRange] = useState<any[]>([]);
    const inputDefault = useRef<ElementRef<typeof InputText>>(null);
    const keyboardInfo = useKeyboard(false);

    return (
        <ScrollView
            className="w-100  bg-muted"
            colorDarkMode="dark"
            showsVerticalScrollIndicator={false}>
            <Button
                onPress={() => {
                    // inputDefault.current?.blur();
                }}>
                Blurring Input
            </Button>
            <InputText
                ref={inputDefault}
                onPress={() => {}}
                className="my-2"
                label="Input Default"
                color="red"
                colorDark="yellow"
                onPressIcon={() => {}}
                placeholder="Input Standard"
                // error="Error Test Input"
            />

            <InputText
                variant="standard"
                className="my-2"
                label="Input Standard"
                color="red"
                colorDark="yellow"
                onPressIcon={() => {}}
                placeholder="Input Standard"
                error="Error Test Input"
            />

            <InputText
                variant="rounded"
                className="my-2"
                label="Input Rounded"
                color="red"
                placeholder="Input Rounded"
                onPressIcon={() => {}}
            />

            <InputText
                variant="trans"
                className="my-2"
                label="Input Trans"
                color="red"
                placeholder="Input Trans"
                onPressIcon={() => {}}
            />

            <InputText
                variant="pill"
                className="my-2"
                label="Input Pill"
                placeholder="Input Pill"
                onPressIcon={() => {}}
            />

            <InputText
                variant="rounded"
                labelPosition="inside"
                className="my-2"
                label="Input Label Inside"
                placeholder="Input Label Inside"
                color="red"
                onPressIcon={() => {}}
                value={inputTextValue}
                onChangeText={setInputTextValue}
                prefixIcon="search"
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
            <InputSearch
                className="border-bottom px-3"
                height={50}
                iconName=""
                prefixIcon="search"
            />
            <InputDate
                label="Date Input Default"
                className="my-2"
                mode="month"
                format="MM/YYYY"
                placeholder="Date Input Select Month Year"
                onChange={v => {
                    setDate(v);
                }}
                value={date}
            />
            <InputDate
                label="Date Input Select Month Year"
                variant="outline"
                className="my-2"
                mode="month"
                format="MM/YYYY"
                placeholder="Date Input Select Month Year"
                onChange={v => {
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
                onChange={v => {
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
                onChange={v => {
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
                onChange={v => {
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
                onChange={v => {
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
                onChange={v => {
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
            <InputText
                labelPosition="inside"
                variant="pill"
                iconName="visibility"
                className="my-2"
                label="Input Pill"
                placeholder="Input Pill"
                onPressIcon={() => {}}
                value={inputTextValue}
                onChangeText={setInputTextValue}
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
            {/* <InputComment user={{avatar: '', name: 'Test'}} useAnimation /> */}
        </ScrollView>
    );
};

export default TestInput;
