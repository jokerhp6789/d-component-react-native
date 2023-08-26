import ClassNames from "classnames";
import React, {
    ElementRef,
    forwardRef,
    useImperativeHandle,
    useRef,
} from "react";
import { useColorScheme, ViewStyle } from "react-native";
import { ColorKeyType } from "../../style/constant/AppColors";
import { getThemeColor } from "../../style/modifier";
import TimeUtils from "../../utils/TimeUtils";
import Icon from "../icon/Icon";
import Text from "../text/Text";
import View from "../view/View";
import InputDate, {
    getDateModalTypeFromMode,
    ICustomInputProps,
    IInputDateProps,
} from "./InputDate";
import { InputErrorView } from "./InputText";

export interface IRangeDateCustomInputProps extends ICustomInputProps {
    side?: "start" | "end";
}

export interface IInputDateRangeProps
    extends Omit<IInputDateProps, "value" | "onChange"> {
    value?: any[];
    onChange?: (props: IInputDateRangeProps["value"]) => any;
    startText?: string;
    endText?: string;
    classNameContent?: string;
    styleContent?: ViewStyle;
    colorDarkMode?: ColorKeyType;
    colorDarkModeContent?: ColorKeyType;
    customInput?: ((props: IRangeDateCustomInputProps) => Element) | Element;
}

export interface IInputDateRangeMethod {}

const InputDateRange: React.ForwardRefRenderFunction<
    IInputDateRangeMethod,
    IInputDateRangeProps
> = (
    {
        className,
        classNameLabel,
        classNameError,
        classNameContent,
        error,
        variant = "outline",
        label,
        value,
        onChange,
        startText = "Start",
        endText = "End",
        style,
        styleContent,
        colorDarkMode = "transparent",
        colorDarkModeContent = "transparent",
        customInput,
        mode,
        ...rest
    },
    ref
) => {
    const colorScheme = useColorScheme();
    const hasBorder =
        variant === "outline" || variant === "pill" || variant === "rounded";
    const labelClass = ClassNames(
        `h4`,
        { "mb-1": hasBorder },
        `${classNameLabel}`
    );

    const errorClass = ClassNames(
        "mt-1",
        {
            "px-2": variant === "pill",
        },
        classNameError
    );

    const endRef = useRef<ElementRef<typeof InputDate>>(null);

    useImperativeHandle(ref, () => ({}));

    const handleChangeStartTime = (start: any) => {
        const clone: any = [...(value || [])];
        clone[0] = start;
        if (
            clone[1] &&
            TimeUtils.convertDateTimeToMili(start) >
                TimeUtils.convertDateTimeToMili(clone[1])
        ) {
            clone[1] = undefined;
        }
        onChange && onChange(clone);
        endRef.current && endRef.current.open(getDateModalTypeFromMode(mode));
    };

    const handleChangeEndTime = (end: any) => {
        const clone: any = [...(value || [])];
        clone[1] = end;
        onChange && onChange(clone);
    };

    return (
        <View className={className} style={style} colorDarkMode={colorDarkMode}>
            {label && <Text className={labelClass}>{label}</Text>}
            <View
                className={`flex-center-y ${classNameContent}`}
                style={styleContent}
                colorDarkMode={colorDarkModeContent}
            >
                <InputDate
                    variant={variant}
                    className="flex-1"
                    classNameText="text-center"
                    placeholder={startText}
                    mode={mode}
                    {...rest}
                    customInput={
                        typeof customInput === "function"
                            ? (props) => {
                                  return customInput({
                                      ...props,
                                      side: "start",
                                  });
                              }
                            : customInput
                    }
                    showIcon={false}
                    onChange={(v) => handleChangeStartTime(v)}
                    maximumDate={value?.[1]}
                    value={value?.[0]}
                />
                <Icon
                    name="arrow-forward"
                    className="mx-2"
                    color={
                        value?.length === 0
                            ? "gray"
                            : getThemeColor({ colorScheme })
                    }
                />
                <InputDate
                    variant={variant}
                    className="flex-1"
                    classNameText="text-center"
                    placeholder={endText}
                    ref={endRef}
                    {...rest}
                    customInput={
                        typeof customInput === "function"
                            ? (props) => {
                                  return customInput({ ...props, side: "end" });
                              }
                            : customInput
                    }
                    showIcon={false}
                    onChange={(v) => handleChangeEndTime(v)}
                    value={value?.[1]}
                    mode={mode}
                    minimumDate={value?.[0]}
                />
            </View>
            {error && <InputErrorView error={error} className={errorClass} />}
        </View>
    );
};

export default forwardRef(InputDateRange);
