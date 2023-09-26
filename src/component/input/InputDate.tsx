import ClassNames from 'classnames';
import React, {useImperativeHandle, useMemo, useState} from 'react';
import {useColorScheme, ViewStyle} from 'react-native';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';
import {ColorKeyType} from '../../style/constant/AppColors';
import {getThemeColor} from '../../style/modifier';
import Sizes from '../../style/size/_size';
import TimeUtils from '../../utils/TimeUtils';
import MonthYearModal, {
    IMonthYearModalProps,
} from '../date-time/MonthYearModal';
import Icon from '../icon/Icon';
import Text from '../text/Text';
import TouchableOpacity from '../view/TouchableOpacity';
import View from '../view/View';
import {InputErrorView, InputVariantType} from './InputText';
import Configs from '../../style/config/_config';

export type TDateFormat =
    | 'DD/MM/YYYY HH:mm'
    | 'DD/MM/YYYY'
    | 'MM/YYYY'
    | 'YYYY'
    | 'HH:mm'
    | 'HH:mm:';

export interface ICustomInputProps {
    value: any;
    displayValue: any;
}

export type DateModalType = 'dateTime' | 'monthYear';

export type InputDateModeType = 'date' | 'time' | 'datetime' | 'month';

export interface IInputDateProps
    extends Omit<DatePickerProps, 'date' | 'onDateChange' | 'mode'> {
    value?: DatePickerProps['date'];
    format?: TDateFormat;
    label?: string;
    classNameLabel?: string;
    classNameText?: string;
    className?: string;
    classNameError?: string;
    cancelText?: string;
    confirmText?: string;
    variant?: InputVariantType | 'icon';
    placeholder?: string;
    error?: any;
    height?: number;
    showIcon?: boolean;
    iconName?: string;
    onChange?: DatePickerProps['onDateChange'];
    customIcon?: ((value: any) => Element) | Element;
    customInput?: ((props: ICustomInputProps) => Element) | Element;
    getValue?:
        | ((props: {
              value?: any;
              mode?: IInputDateProps['mode'];
              format?: IInputDateProps['format'];
          }) => Element | String)
        | Element;
    disabled?: boolean;
    disabledColor?: ColorKeyType | null;
    styleDatePicker?: ViewStyle;
    mode?: InputDateModeType;
    monthYearModalProps?: Partial<IMonthYearModalProps>;
}

export const getDateModalTypeFromMode = (
    mode?: InputDateModeType,
): DateModalType => {
    switch (mode) {
        case 'month':
            return 'monthYear';
        default:
            return 'dateTime';
    }
};

export interface IInputDateMethod {
    open: (type: DateModalType) => any;
    close: () => any;
}

const InputDate: React.ForwardRefRenderFunction<
    IInputDateMethod,
    IInputDateProps
> = (
    {
        value,
        onChange,
        className,
        classNameLabel,
        classNameText,
        classNameError,
        label,
        height = Sizes.inputHeight,
        cancelText = 'Cancel',
        confirmText = 'Confirm',
        variant: variantProps,
        format,
        style,
        styleDatePicker,
        placeholder,
        error,
        showIcon = true,
        iconName = 'today',
        mode,
        disabled,
        disabledColor = 'muted',
        customInput,
        customIcon,
        getValue,
        minimumDate,
        maximumDate,
        locale = 'en',
        monthYearModalProps = {},
        ...rest
    },
    ref,
) => {
    const {inputConfig} = Configs;
    const {variant: variantConfig} = inputConfig || {};
    const variant = variantProps || variantConfig || 'standard';

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const hasBorder =
        variant === 'outline' || variant === 'pill' || variant === 'rounded';
    const wrapperClass = ClassNames(
        // { "width-40": variant === "icon" },
        `${className}`,
    );
    const labelClass = ClassNames(
        `h4`,
        {'mb-1': hasBorder},
        `${classNameLabel}`,
    );
    const textClass = ClassNames(
        'h4 flex-1',
        {
            'text-gray': !value || disabled,
        },
        classNameText,
    );
    const contentClass = ClassNames('flex-center-y px-2', {
        border: hasBorder,
        'border-bottom-1': variant === 'standard',
        'rounded-pill': variant === 'pill',
        'rounded-1': variant === 'rounded',
        'border-error': !!error,
        [`bg-${disabledColor}`]: disabled && disabledColor,
        [`border-${getThemeColor({colorScheme})}`]: !!value,
    });

    const errorClass = ClassNames(
        'mt-1',
        {
            'px-2': variant === 'pill',
        },
        classNameError,
    );

    const [openDateModal, setOpenDateModal] = useState<{
        open: boolean;
        type?: DateModalType;
        timeStamp?: any;
    }>({open: false});

    const displayValue = useMemo(() => {
        if (!value && !getValue) {
            if (placeholder) {
                return placeholder;
            }
            return undefined;
        }
        let res;
        switch (mode) {
            case 'datetime':
                res = TimeUtils.convertMiliToDateTime(value);
                break;
            case 'time':
                res = TimeUtils.convertMiliToTime(value);
                break;
            default:
                res = TimeUtils.convertMiliToDate(value);
                break;
        }
        if (format) {
            res = TimeUtils.convertMiliToDateWithFormat(value, format);
        }
        if (getValue && typeof getValue === 'function') {
            res = getValue({value, mode, format});
        }
        return res;
    }, [value, onChange, mode, format, getValue]);

    useImperativeHandle(ref, () => ({
        open: (type: DateModalType) => setOpenDateModal({open: true, type}),
        close: () => setOpenDateModal({open: false}),
    }));

    const renderIcon = () => {
        if (customIcon) {
            if (typeof customIcon === 'function') {
                return customIcon(value);
            }
            return customIcon;
        }
        return (
            <Icon
                name={iconName}
                color={!value ? 'gray' : undefined}
                size={20}
            />
        );
    };

    const renderContent = () => {
        if (customInput) {
            if (typeof customInput === 'function') {
                return customInput({value, displayValue});
            }
            return customInput;
        }
        if (variant === 'icon') {
            return renderIcon();
        }
        return (
            <View className={contentClass} style={{height}}>
                {typeof displayValue === 'string' ? (
                    <Text className={textClass}>{displayValue}</Text>
                ) : (
                    displayValue
                )}
                {(showIcon || customIcon) && renderIcon()}
            </View>
        );
    };

    return (
        <View
            className={wrapperClass}
            colorDarkMode="transparent"
            style={style}>
            {label && <Text className={labelClass}>{label}</Text>}
            <TouchableOpacity
                onPress={() => {
                    const type = getDateModalTypeFromMode(mode);
                    setOpenDateModal({
                        open: true,
                        type,
                        timeStamp: new Date().valueOf(),
                    });
                }}
                disabled={disabled}
                colorDarkMode="transparent">
                {renderContent()}
            </TouchableOpacity>
            {error && <InputErrorView error={error} className={errorClass} />}
            {openDateModal.open && openDateModal?.type === 'dateTime' && (
                <DatePicker
                    modal
                    open={openDateModal.open}
                    onConfirm={date => {
                        setOpenDateModal({open: false});
                        onChange && onChange(date);
                    }}
                    onCancel={() => setOpenDateModal({open: false})}
                    date={value || new Date()}
                    onDateChange={onChange as any}
                    cancelText={cancelText}
                    confirmText={confirmText}
                    style={styleDatePicker}
                    focusable
                    {...rest}
                    androidVariant="nativeAndroid"
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                    mode={mode as any}
                    timeZoneOffsetInMinutes={420}
                    textColor={isDarkMode ? 'white' : 'black'}
                    locale={locale}
                />
            )}
            {openDateModal.open && openDateModal?.type === 'monthYear' && (
                <MonthYearModal
                    open={openDateModal.open}
                    key={`${openDateModal.open}_${openDateModal.type}_${openDateModal.timeStamp}`}
                    onClose={() => setOpenDateModal({open: false})}
                    {...monthYearModalProps}
                    value={value}
                    onChange={v => onChange && onChange(v)}
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                    locale={locale}
                />
            )}
        </View>
    );
};

export default React.forwardRef(InputDate);
