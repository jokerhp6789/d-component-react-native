/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import ClassNames from "classnames";
import _ from "lodash";
import moment from "moment";
import React, { useMemo } from "react";
import { FlatList, ViewStyle } from "react-native";
import InputDate, { IInputDateProps } from "../input/InputDate";
import InputDateRange from "../input/InputDateRange";
import InputText, { IInputTextProps } from "../input/InputText";
import Select, { ISelectProps } from "../select/Select";
import View from "../view/View";

export type IFormItemType =
    | "checkbox"
    | "inputText"
    | "select"
    | "multi-select"
    | "date"
    | "time"
    | "date-time"
    | "time-range"
    | "date-range"
    | "textarea"
    | "radio";

export interface IFormItemDataRender<T> {
    value?: any;
    // eslint-disable-next-line no-use-before-define
    onChange?: IFormItemProps["onChange"];
    className?: string;
    key?: keyof T;
    error?: any;
    formValues?: any;
}

export interface IFormItemData<T> {
    rowsId?: string;
    label?: string;
    type?: IFormItemType;
    key: keyof T;
    render?:
        | React.ReactElement
        | ((props: IFormItemDataRender<T>) => React.ReactElement);
    onChangeValidate?: (props: { key: any; value: any }) => boolean;

    rows?: any;
    inputType?: IInputTextProps["keyboardType"];

    dataSource?: Array<any>;
    getLabel?: (item: any) => any;
    getValue?: (item: any) => any;

    className?: string;
    classNameRow?: string;

    getItemClass?: (props: {
        key?: keyof T;
        index?: any;
        value?: any;
        error?: any;
        rows?: Array<any>;
    }) => string;
    getElementClass?: (props: {
        key?: keyof T;
        index?: any;
        value?: any;
        error?: any;
        rows?: Array<any>;
    }) => string;
    elementClass?: string;

    inputProps?: IInputTextProps;
    selectProps?: ISelectProps;
    dateInputProps?: IInputDateProps;
}

export interface IFormItemProps {
    onChange: (key: any, value: any) => void;
    data: IFormItemData<any>;
    value: any;
    error?: any;
    Messages?: any;
    className?: string;
}

export interface IFormProps {
    Messages?: any;
    dataSource?: Array<IFormItemData<any>>;
    formik?: any;
    value?: any;
    error?: any;
    onChange?: (key: any, value: any) => any;
    getRowClass?: (index?: any) => string;
    className?: string;
    classNameRow?: string;
    scrollable?: boolean;
    style?: ViewStyle;
    styleFlatList?: ViewStyle;
}

export const getDefaultValue = (type?: IFormItemType) => {
    switch (type) {
        case "checkbox":
        case "radio":
        case "multi-select":
        case "select":
            return [];
        case "date":
        case "date-range":
        case "time":
        case "date-time":
            return null;
        case "inputText":
        case "textarea":
            return "";
        default:
            return undefined;
    }
};

export function FormItem({
    onChange,
    data,
    value,
    Messages,
    className,
    error,
}: IFormItemProps) {
    const {
        key,
        type,
        label,
        dataSource = [],
        getLabel,
        getValue,
        rows,
        inputType,
        inputProps,
        selectProps,
        dateInputProps,
    } = data;
    const itemLabel = Messages?.[label as any] || label;

    const transformDateValue = (v: any): any => {
        let transValue: any = null;
        if (v && typeof v === "string") {
            transValue = new Date(v);
        }
        return transValue || undefined;
    };

    if (type === "date-range" || type === "time-range") {
        let transValue: any = null;
        if (Array.isArray(value)) {
            transValue = value.map((item) =>
                item ? moment(item)?.toDate() : null
            );
        }
        if (type === "time-range") {
            return (
                <InputDateRange
                    value={transValue}
                    //@ts-ignore
                    onChange={(value) => {
                        onChange(key, value);
                    }}
                    label={Messages?.[label as any] || label}
                    className={className}
                    error={error}
                    {...dateInputProps}
                />
            );
        }
        return (
            <InputDate
                value={transValue}
                //@ts-ignore
                onChange={(value) => {
                    let clone = null;
                    if (Array.isArray(value)) {
                        clone = value.map((item) => {
                            const dateValue = transformDateValue(value);
                            return dateValue;
                        });
                    }
                    onChange(key, clone);
                }}
                label={Messages?.[label as any] || label}
                className={className}
                error={error}
                {...dateInputProps}
            />
        );
    }
    if (type === "date" || type === "date-time" || type === "time") {
        const dateValue = transformDateValue(value);
        return (
            <InputDate
                value={dateValue}
                //@ts-ignore
                onChange={(value) => {
                    return onChange(key, value) as any;
                }}
                label={itemLabel}
                className={className}
                error={error}
                mode={
                    type === "time"
                        ? "time"
                        : type === "date"
                        ? "date"
                        : "datetime"
                }
                {...dateInputProps}
            />
        );
    }
    //   if (type === "checkbox") {
    //     return (
    //       <CheckboxGroup
    //         dataSource={dataSource}
    //         value={value}
    //         onChange={(value) => onChange(key, value)}
    //         label={itemLabel}
    //         className={className}
    //         getLabel={(item) => (getLabel ? getLabel(item) : Messages[item?.label])}
    //         getValue={(item) => (getValue ? getValue(item) : item?.id)}
    //         {...checkBoxProps}
    //       />
    //     );
    //   }
    //   if (type === "radio") {
    //     return (
    //       <RadioGroup
    //         dataSource={dataSource}
    //         value={value}
    //         onChange={(value) => onChange(key, value)}
    //         label={itemLabel}
    //         className={className}
    //         getLabel={(item) => (getLabel ? getLabel(item) : Messages[item?.label])}
    //         getValue={(item) => (getValue ? getValue(item) : item?.id)}
    //         {...radiogroupProps}
    //       />
    //     );
    //   }
    if (type === "select" || type === "multi-select") {
        return (
            <Select
                dataSource={dataSource}
                value={value}
                onChange={(value) => onChange(key, value)}
                className={className}
                label={itemLabel}
                getLabel={(item) =>
                    getLabel ? getLabel(item) : Messages?.[item?.label]
                }
                getValue={(item) => (getValue ? getValue(item) : item?.id)}
                error={error}
                multiple={type === "multi-select"}
                {...selectProps}
            />
        );
    }
    if (type === "textarea") {
        return (
            <InputText
                label={itemLabel}
                onChangeText={(v) => onChange(key, v)}
                value={value}
                className={className}
                error={error}
                numberOfLines={rows}
                multiline
                keyboardType={inputType}
                {...inputProps}
            />
        );
    }

    return (
        <InputText
            label={itemLabel}
            onChangeText={(v) => onChange(key, v)}
            value={value}
            className={className}
            error={error}
            keyboardType={inputType}
            {...inputProps}
        />
    );
}

const Form: React.FC<IFormProps> = ({
    dataSource,
    Messages,
    formik,
    value,
    className,
    error = {},
    onChange,
    classNameRow,
    getRowClass,
    scrollable,
    style,
    styleFlatList,
}) => {
    const transformData = useMemo(() => {
        const clone: Array<typeof dataSource> = [];
        const groupData = _.groupBy(dataSource, (item) => item?.rowsId);
        Object.keys(groupData).forEach((key) => {
            clone.push(groupData[key]);
        });
        return clone;
    }, [dataSource]);
    const formValue = useMemo(() => {
        if (formik) {
            return formik?.values ?? {};
        }
        return value;
    }, [value, formik?.values]);
    const formError = useMemo(() => {
        if (formik) {
            return formik?.errors ?? {};
        }
        return error;
    }, [formik]);

    const onChangeState = ({
        key,
        value,
        onValidate,
    }: {
        key: any;
        value: any;
        onValidate?: (props: any) => boolean;
    }) => {
        let validate = true;
        if (onValidate) {
            validate = onValidate({ key, value });
            if (!validate) {
                return;
            }
        }
        if (formik) {
            formik.setFieldValue(key, value);
        }
        // eslint-disable-next-line no-unused-expressions
        onChange && onChange(key, value);
    };
    const wrapperClass = ClassNames("w-100", className);
    const content = (
        <View className={wrapperClass} style={style}>
            {transformData &&
                transformData?.length > 0 &&
                transformData?.map((rows, i) => {
                    let hasError = false;
                    let rowView: any = <View />;
                    let setRowClass;
                    if (rows && rows?.length > 0) {
                        rowView = rows.map((item, index) => {
                            const {
                                render,
                                key,
                                type,
                                className,
                                getElementClass,
                                getItemClass,
                                elementClass,
                                classNameRow,
                                onChangeValidate,
                            } = item;
                            const valueItem =
                                formValue?.[key] || getDefaultValue(type);
                            const errorItem = formError?.[key] ?? null;
                            const errorLabel = errorItem
                                ? Messages?.[errorItem] ?? errorItem
                                : null;
                            if (errorLabel) {
                                hasError = true;
                            }
                            let itemClass = ClassNames(
                                "w-100",
                                {
                                    "mr-1": rows?.length > 1 && index === 0,
                                    "mx-1":
                                        rows?.length > 1 &&
                                        index > 0 &&
                                        index < rows?.length,
                                    "ml-1":
                                        rows?.length > 1 &&
                                        index === rows?.length - 1,
                                },
                                className
                            );

                            if (getItemClass) {
                                itemClass = getItemClass({
                                    value: valueItem,
                                    error: errorItem,
                                    key,
                                    index,
                                    rows,
                                });
                            }

                            let content = (
                                <FormItem
                                    data={item}
                                    onChange={(key, value) =>
                                        onChangeState({
                                            key,
                                            value,
                                            onValidate: onChangeValidate,
                                        })
                                    }
                                    value={valueItem}
                                    Messages={Messages}
                                    className={itemClass}
                                    error={errorLabel}
                                />
                            );
                            if (React.isValidElement(render)) {
                                content = React.cloneElement(render, {
                                    //@ts-ignore
                                    onChange: (value: any) =>
                                        onChangeState({
                                            key,
                                            value,
                                            onValidate: onChangeValidate,
                                        }),
                                    value: valueItem,
                                    className: itemClass,
                                    error: errorLabel,
                                });
                            }
                            if (typeof render === "function") {
                                content = render({
                                    value: valueItem,
                                    onChange: (key: any, value: any) =>
                                        onChangeState({
                                            key,
                                            value,
                                            onValidate: onChangeValidate,
                                        }),
                                    className: itemClass,
                                    key,
                                    error: errorLabel,
                                    formValues: formValue,
                                });
                            }

                            let itemWrapperClass = ClassNames(
                                "py-2 flex-1",
                                elementClass
                            );

                            if (getElementClass) {
                                itemWrapperClass = getElementClass({
                                    value: valueItem,
                                    error: errorItem,
                                    key,
                                    index,
                                    rows,
                                });
                            }

                            if (classNameRow) {
                                setRowClass = classNameRow;
                            }

                            return (
                                <View className={itemWrapperClass}>
                                    {content}
                                </View>
                            );
                        });
                    }

                    let rowClass = ClassNames(
                        "flex-center-y w-100 my-2",
                        {
                            "align-items-center": !hasError,
                            // "border-top": i !== 0,
                        },
                        classNameRow
                    );
                    if (setRowClass) {
                        rowClass = setRowClass;
                    }
                    return <View className={rowClass}>{rowView}</View>;
                })}
        </View>
    );
    if (scrollable) {
        return (
            <FlatList
                bounces={false}
                data={[1]}
                renderItem={({ item }) => content}
                style={styleFlatList}
            />
        );
    }
    return content;
};

export default Form;
