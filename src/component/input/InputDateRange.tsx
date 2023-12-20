import React, {
    ElementRef,
    forwardRef,
    useCallback,
    useContext,
    useImperativeHandle,
    useMemo,
    useRef,
} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {IStyleTransformerProps} from '../..';
import StyleStateContext from '../../context/StyleContext';
import Configs from '../../style/config/_config';
import {ColorKeyType} from '../../style/constant/AppColors';
import {getThemeColor} from '../../style/modifier';
import {styleTransformer} from '../../style/style';
import TimeUtils from '../../utils/TimeUtils';
import Icon, {IIconProps} from '../icon/Icon';
import Text from '../text/Text';
import InputDate, {
    ICustomInputProps,
    IInputDateProps,
    getDateModalTypeFromMode,
} from './InputDate';
import {InputErrorView} from './InputText';

export interface IRangeDateCustomInputProps extends ICustomInputProps {
    side?: 'start' | 'end';
}

export interface IInputDateRangeProps
    extends Omit<IInputDateProps, 'value' | 'onChange'> {
    value?: any[];
    onChange?: (
        props: IInputDateRangeProps['value'],
        changeValue?: 'start' | 'end',
    ) => void | {skipAutoOpen?: boolean};
    startText?: string;
    endText?: string;
    classNameContent?: IStyleTransformerProps;
    styleContent?: StyleProp<ViewStyle>;
    colorDarkMode?: ColorKeyType;
    colorDarkModeContent?: ColorKeyType;
    middleIconProps?: Partial<IIconProps>;
    customInput?:
        | ((props: IRangeDateCustomInputProps) => React.ReactNode)
        | React.ReactNode;
    customMiddleIcon?:
        | ((props: {color: ColorKeyType}) => React.ReactNode)
        | React.ReactNode;
    startInputProps?: Partial<IInputDateProps>;
    endInputProps?: Partial<IInputDateProps>;
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
        variant: variantProps,
        label,
        value,
        onChange,
        startText = 'Start',
        endText = 'End',
        style,
        styleContent,
        colorDarkMode = 'transparent',
        colorDarkModeContent = 'transparent',
        customInput,
        customMiddleIcon,
        mode,
        middleIconProps = {},
        startInputProps = {},
        endInputProps = {},
        ...rest
    },
    ref,
) => {
    const {colorSchema} = useContext(StyleStateContext);
    const {inputConfig, generalConfig} = Configs;
    const {autoSwitchColor} = generalConfig || {};
    const {variant: variantConfig} = inputConfig || {};
    const variant = variantProps || variantConfig || 'outline';
    const hasBorder =
        variant === 'outline' || variant === 'pill' || variant === 'rounded';
    const wrapperCLass = styleTransformer(className);
    const labelClass = styleTransformer(
        `h4`,
        {'mb-1': hasBorder},
        classNameLabel,
    );
    const errorClass = styleTransformer(
        'mt-1',
        {
            'px-2': variant === 'pill',
        },
        classNameError,
    );

    const endRef = useRef<ElementRef<typeof InputDate>>(null);

    useImperativeHandle(ref, () => ({}));

    const renderIcon = useMemo(() => {
        const colorIcon =
            value?.length === 0
                ? 'gray'
                : getThemeColor({
                      colorScheme: colorSchema,
                      autoSwitchColor,
                  });
        if (customMiddleIcon) {
            return typeof customMiddleIcon === 'function'
                ? customMiddleIcon({color: colorIcon})
                : customMiddleIcon;
        }

        return (
            <Icon
                name="arrow-forward"
                className="mx-2"
                color={colorIcon}
                {...middleIconProps}
            />
        );
    }, [customMiddleIcon, value, colorSchema, autoSwitchColor]);

    const handleChangeStartTime = useCallback(
        (start: any) => {
            const clone: any = [...(value || [])];
            clone[0] = start;
            if (
                clone[1] &&
                TimeUtils.convertDateTimeToMili(start) >
                    TimeUtils.convertDateTimeToMili(clone[1])
            ) {
                clone[1] = undefined;
            }
            const res = onChange && onChange(clone, 'start');
            if (res?.skipAutoOpen) {
                return;
            }
            endRef.current &&
                endRef.current.open(getDateModalTypeFromMode(mode));
        },
        [onChange, mode, value, endRef],
    );

    const handleChangeEndTime = (end: any) => {
        const clone: any = [...(value || [])];
        clone[1] = end;
        onChange && onChange(clone, 'end');
    };

    return (
        <View style={[wrapperCLass, style]}>
            {label ? <Text className={labelClass}>{label}</Text> : null}
            <View
                style={[
                    styleTransformer('flex-center-y', classNameContent),
                    styleContent,
                ]}>
                <InputDate
                    variant={variant}
                    className="flex-1"
                    classNameText="text-center"
                    placeholder={startText}
                    mode={mode}
                    {...rest}
                    customInput={
                        typeof customInput === 'function'
                            ? props => {
                                  return customInput({
                                      ...props,
                                      side: 'start',
                                  });
                              }
                            : customInput
                    }
                    showIcon={false}
                    onChange={v => handleChangeStartTime(v)}
                    maximumDate={value?.[1]}
                    value={value?.[0]}
                    {...startInputProps}
                />
                {renderIcon}
                <InputDate
                    variant={variant}
                    className="flex-1"
                    classNameText="text-center"
                    placeholder={endText}
                    ref={endRef}
                    {...rest}
                    customInput={
                        typeof customInput === 'function'
                            ? props => {
                                  return customInput({...props, side: 'end'});
                              }
                            : customInput
                    }
                    showIcon={false}
                    onChange={v => handleChangeEndTime(v)}
                    value={value?.[1]}
                    mode={mode}
                    minimumDate={value?.[0]}
                    {...endInputProps}
                />
            </View>
            {error && <InputErrorView error={error} className={errorClass} />}
        </View>
    );
};

export default forwardRef(InputDateRange);
