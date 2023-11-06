import _, {filter, isEmpty, some} from 'lodash';
import React, {
    ElementRef,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    Platform,
    StyleProp,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    ViewStyle,
} from 'react-native';
import Configs from '../../style/config/_config';
import Sizes from '../../style/size/_size';
import {IStyleTransformerProps, styleTransformer} from '../../style/style';
import Button, {IButtonProps} from '../button/Button';
import CheckBox, {ICheckBoxProps} from '../checkbox/CheckBox';
import Icon, {IIconProps} from '../icon/Icon';
import InputSearch, {IInputSearchProps} from '../input/InputSearch';
import {
    InputErrorView,
    InputLabelPositionType,
    InputVariantType,
} from '../input/InputText';
import Chip, {IChipProps} from '../items/Chip';
import AwesomeList, {
    IAwesomeListProps,
    IPaginationProps,
} from '../list/awesomeList/AwesomeList';
import Modal, {IModalProps} from '../modal/Modal';
import Text from '../text/Text';
import {ColorKeyType} from '../../style/constant/AppColors';
import Colors from '../../style/color/_color';

export interface ISelectSourceProps extends IPaginationProps {
    search?: string;
}

export interface ISelectProps
    extends Partial<
        Pick<
            IAwesomeListProps<any>,
            'transformer' | 'keyExtractor' | 'isPaging'
        >
    > {
    variant?: InputVariantType;
    label?: any;
    labelPosition?: InputLabelPositionType;
    placeholder?: string;
    selectText?: string;
    clearText?: string;

    color?: ColorKeyType;
    colorFocus?: ColorKeyType;
    colorDark?: ColorKeyType;
    error?: any;
    height?: number;
    buttonSelectHeight?: number;
    className?: IStyleTransformerProps;
    classNameLabel?: IStyleTransformerProps;
    classNameContent?: IStyleTransformerProps;
    classNameError?: IStyleTransformerProps;
    iconName?: string;
    style?: StyleProp<ViewStyle>;
    styleContent?: StyleProp<ViewStyle>;
    styleList?: StyleProp<ViewStyle>;
    // if valueType props === 'object' will be object for
    // single select and array of obj for multiple select
    // if valueType === string will be string for
    // single select and array of string for multiple select
    value?: any;
    source?: (props: ISelectSourceProps) => any;
    onPress?: () => void;
    onChange?: (props: any) => any;
    getLabel?: (props: any) => any;
    getValue?: (props: any) => any;
    getDisplayValue?: (props: any) => any;
    customSelectItem?: ({
        item,
        index,
        selected,
    }: {
        item: any;
        index: any;
        selected: boolean;
    }) => Element;

    multiple?: boolean;
    quickSelect?: boolean;
    quickRemove?: boolean;
    disabled?: boolean;
    showClearButton?: boolean;
    // input search props.
    showSearch?: boolean;
    searchOffline?: boolean;
    keySearchOffline?: Array<string>;

    dataSource?: Array<any>;
    valueType?: 'object' | 'string';

    inputSearchProps?: Partial<IInputSearchProps>;
    listProps?: Partial<IAwesomeListProps<any>>;
    chipProps?: Partial<IChipProps>;
    iconProps?: Partial<IIconProps>;
    buttonSelectProps?: Partial<IButtonProps>;
    modalProps?: Partial<IModalProps>;
    checkboxProps?: Partial<ICheckBoxProps>;
    containerProps?: Partial<TouchableOpacityProps>;
}

const Select: React.FC<ISelectProps> = ({
    variant: variantProps,
    buttonSelectHeight = Platform.OS === 'android' ? 110 : 85,
    height = Sizes.inputHeight,
    label,
    labelPosition: labelPositionProp,
    disabled,
    selectText = 'Select',
    clearText = 'Clear',
    placeholder,
    iconName = 'keyboard-arrow-right',
    className,
    classNameContent,
    classNameLabel,
    classNameError,
    color,
    colorDark,
    colorFocus = 'primary',
    style,
    styleContent,
    styleList,
    value,
    onChange,
    onPress,
    getLabel = item => item?.name,
    getValue = item => item?.id,
    getDisplayValue,
    source = paging => Promise.resolve(),
    transformer = res => res,
    keyExtractor = (item, index) => `${item?.id} ${index}`,
    customSelectItem,
    error,
    multiple,
    quickSelect,
    quickRemove,
    isPaging,
    showClearButton = true,
    showSearch,
    inputSearchProps = {},
    searchOffline = false,
    keySearchOffline = ['name'],
    listProps = {},
    chipProps = {},
    iconProps = {},
    modalProps = {},
    buttonSelectProps = {},
    checkboxProps = {},
    containerProps = {},
    dataSource = [],
    valueType = 'object',
}) => {
    const listRef = useRef<ElementRef<typeof AwesomeList>>(null);
    const {inputConfig, selectConfig} = Configs;
    const {variant: variantConfig, labelPosition: labelPositionConfig} =
        inputConfig || {};
    const {modalProps: modalPropsConfig, listProps: listPropsConfig} =
        selectConfig || {};
    const variant = variantProps || variantConfig || 'standard';
    const labelPosition: InputLabelPositionType =
        labelPositionProp || labelPositionConfig || 'outside';
    const isOutSideLabel = labelPosition === 'outside';
    const isInSideLabel = labelPosition === 'inside';
    const hasBorder =
        variant === 'outline' || variant === 'pill' || variant === 'rounded';
    const containerClass = styleTransformer(`w-100`, className);
    const labelClass = styleTransformer(
        `h4`,
        {
            'mb-1': hasBorder && !isInSideLabel,
            [`ml-2 mt-1 h5 text-${colorFocus}`]: isInSideLabel,
            'text-error': !!error,
            //   "font-weight-bold": focusing,
        },
        `${classNameLabel}`,
    );
    const hasValue = useMemo(() => {
        return !isEmpty(value);
    }, [value]);

    const contentClass = styleTransformer(
        '',
        {
            'border-bottom': variant === 'standard',
            'pl-1 py-1': !!multiple,
            border: hasBorder,
            'flex-center-y pr-1 pl-2': isOutSideLabel,
            'rounded-1': variant === 'rounded',
            [`border border-${colorFocus}`]: isInSideLabel && hasValue,
            'border-error': !!error,
        },
        classNameContent,
    );
    const errorClass = styleTransformer(
        'mt-1',
        {
            'px-2': variant === 'pill',
        },
        classNameError,
    );

    const inputHeight = useMemo(() => {
        if ((multiple && !_.isEmpty(value)) || isInSideLabel) {
            return undefined;
        }
        return height;
    }, [value, multiple, height, isInSideLabel]);

    const [openModal, setOpenModal] = useState(false);
    const [textSearch, setTextSearch] = useState<string>();
    const [selectingValue, setSelectingValue] = useState<any>(value);

    useEffect(() => {
        setSelectingValue(value);
    }, [openModal]);

    const refreshList = () => {
        return listRef.current && listRef.current.refresh();
    };

    const handleChangeTextSearch = _.debounce(text => {
        setTextSearch(text);
        refreshList();
    }, 300);

    const checkSelectedItem = (item: any): boolean => {
        let isSelected = false;
        if (!_.isEmpty(selectingValue)) {
            if (multiple && _.isArray(selectingValue)) {
                const arrIds =
                    valueType === 'object'
                        ? selectingValue.map(i => getValue(i))
                        : selectingValue;
                isSelected = arrIds.includes(getValue(item));
            } else {
                const v =
                    valueType === 'object'
                        ? getValue(selectingValue)
                        : selectingValue;
                isSelected = v === getValue(item);
            }
        }

        return isSelected;
    };

    const handleSelectItem = (item: any, selected: boolean) => {
        const updateValue = valueType === 'object' ? item : getValue(item);
        if (quickSelect && !multiple) {
            onChange && onChange(updateValue);
            return setOpenModal(false);
        }
        if (multiple) {
            let arrayClone = [...(selectingValue || [])];
            if (selected) {
                arrayClone = selectingValue.filter((i: any) =>
                    valueType === 'object'
                        ? getValue(i) !== getValue(item)
                        : i !== getValue(item),
                );
            } else {
                arrayClone.push(updateValue);
            }
            setSelectingValue(arrayClone);
        } else if (selected) {
            setSelectingValue(valueType === 'object' ? {} : undefined);
        } else {
            setSelectingValue(updateValue);
        }
    };

    const handlePressSelect = () => {
        onChange && onChange(selectingValue);
        setOpenModal(false);
    };

    const getLabelFromValue = (value: any) => {
        let label = getLabel(value);
        if (valueType === 'string' && dataSource?.length > 0) {
            const valueObj = dataSource.find(item => getValue(item) === value);
            if (valueObj) {
                label = getLabel(valueObj);
            }
        }
        return label;
    };

    const getResultFromSearch = (data?: Array<any>) => {
        if (!data || !Array.isArray(data)) {
            return [];
        }
        if (textSearch && searchOffline) {
            const textResult = textSearch.toLowerCase();
            const newData = filter(data, item => {
                if (
                    some(keySearchOffline, key => {
                        const value = `${item?.[key]}` ?? '';
                        return value.toLowerCase().indexOf(textResult) !== -1;
                    })
                ) {
                    return true;
                }
                return false;
            });
            return newData;
        }
        return data;
    };

    const renderSelectItem = useCallback(
        ({item, index}: any) => {
            const selected = checkSelectedItem(item);
            const selectItemClass = styleTransformer('flex-center-y py-3', {
                'border-top': index !== 0,
            });
            let content: any = (
                <View>
                    <Text>{getLabel(item)}</Text>
                </View>
            );
            if (customSelectItem) {
                content = customSelectItem({item, index, selected});
            }

            return (
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => handleSelectItem(item, selected)}
                    style={selectItemClass}>
                    <View style={styleTransformer('flex-1')}>{content}</View>
                    <CheckBox
                        checked={selected}
                        pressEnable={false}
                        {...(checkboxProps || {})}
                    />
                </TouchableOpacity>
            );
        },
        [
            handleSelectItem,
            checkSelectedItem,
            customSelectItem,
            checkboxProps,
            value,
        ],
    );

    const renderClearButton = useMemo(() => {
        if (multiple && !_.isEmpty(selectingValue) && showClearButton) {
            return (
                <Button
                    variant="trans"
                    classNameLabel="h5"
                    className="px-0 align-self-end"
                    iconName="refresh"
                    height={20}
                    onPress={() => setSelectingValue([])}>
                    {clearText}
                </Button>
            );
        }
        return <View style={styleTransformer('width-[30]')} />;
    }, [
        multiple,
        selectingValue,
        showClearButton,
        clearText,
        setSelectingValue,
    ]);

    const renderLabel = useMemo(() => {
        return <Text style={labelClass}>{label}</Text>;
    }, [label, labelClass]);

    const renderContent = useMemo(() => {
        if (_.isEmpty(value)) {
            if (placeholder) {
                return (
                    <Text className="text-grey flex-1 h4">{placeholder}</Text>
                );
            }
        }
        if (multiple && _.isArray(value)) {
            return (
                <View style={styleTransformer('flex-wrap flex-row flex-1')}>
                    {value.map(i => {
                        const iLabel = getLabelFromValue(i);
                        return (
                            <Chip
                                label={iLabel}
                                className="mx-1 my-1"
                                iconName={quickRemove ? 'close' : undefined}
                                onPressIcon={() => {
                                    const clone = (value || []).filter(
                                        v => getValue(v) !== getValue(i),
                                    );
                                    onChange && onChange(clone);
                                }}
                                size="small"
                                variant="rounded"
                                {...chipProps}
                            />
                        );
                    })}
                </View>
            );
        }
        const label = getDisplayValue
            ? getDisplayValue(value)
            : getLabelFromValue(value);
        return <Text className="flex-1 h4">{label}</Text>;
    }, [
        value,
        placeholder,
        multiple,
        chipProps,
        getDisplayValue,
        getLabelFromValue,
        onChange,
    ]);

    const renderIcon = useCallback(
        (otherProps?: Partial<IIconProps>) => {
            return (
                <Icon
                    name={iconName}
                    size={16}
                    color={!_.isEmpty(value) ? undefined : 'gray'}
                    {...iconProps}
                    {...(otherProps || {})}
                />
            );
        },
        [iconName, value, iconProps],
    );

    const contentIcons = useMemo(() => {
        if (isOutSideLabel) {
            return null;
        }
        return (
            <View
                style={styleTransformer('flex-center-y px-2', {
                    height: multiple ? undefined : height,
                    minHeight: multiple ? height : undefined,
                })}>
                {renderContent}
                {hasValue ? null : renderIcon()}
            </View>
        );
    }, [labelPosition, isOutSideLabel, renderContent, renderIcon]);

    const renderInput = useMemo(() => {
        return (
            <TouchableOpacity
                style={[{height: inputHeight}, contentClass, styleContent]}
                onPress={() => setOpenModal(true)}
                disabled={disabled}
                activeOpacity={0.5}>
                {label && isInSideLabel && hasValue ? renderLabel : null}
                {isOutSideLabel ? renderContent : null}
                {isOutSideLabel ? renderIcon() : null}
                {isInSideLabel && hasValue
                    ? renderIcon({
                          color: !!error ? (Colors.error as any) : colorFocus,
                          classNameWrapper: [
                              'absolute right-0 top-5 bottom-5 justify-center ',
                              {},
                          ],
                          onPress: () => {},
                      })
                    : null}
                {contentIcons}
            </TouchableOpacity>
        );
    }, [
        inputHeight,
        contentClass,
        renderContent,
        styleContent,
        iconName,
        value,
    ]);

    const renderList = useMemo(() => {
        const awesomeListProps: Partial<IAwesomeListProps<any>> = {
            isPaging,
            renderItem: renderSelectItem,
            keyExtractor,
            showsVerticalScrollIndicator: false,
            ListFooterComponent: <View style={{height: 200}} />,
            ...(listPropsConfig || {}),
            ...(listProps || {}),
        };
        if (dataSource && dataSource?.length > 0) {
            return (
                <AwesomeList
                    {...awesomeListProps}
                    ref={listRef}
                    source={() => Promise.resolve()}
                    transformer={res => getResultFromSearch(dataSource)}
                />
            );
        }
        return (
            <AwesomeList
                {...awesomeListProps}
                ref={listRef}
                source={paging => {
                    const payload: ISelectSourceProps = {...paging};
                    if (textSearch) {
                        payload.search = textSearch;
                    }
                    return source && source(payload);
                }}
                transformer={res => {
                    const data = transformer && transformer(res);
                    return getResultFromSearch(data);
                }}
            />
        );
    }, [
        dataSource,
        listProps,
        listPropsConfig,
        renderSelectItem,
        keyExtractor,
        value,
    ]);

    const renderModal = useMemo(() => {
        return (
            <Modal
                open={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setTextSearch('');
                }}
                showHeader
                title={label}
                leftIcon="close"
                customRight={renderClearButton}
                classNameHeader="border-bottom"
                className="px-0"
                swipeable={false}
                animationIn="slideInRight"
                {...modalPropsConfig}
                {...modalProps}>
                <View
                    style={styleTransformer(
                        'h-100 position-relative px-3 pt-2',
                    )}>
                    {showSearch && (
                        <InputSearch
                            useLightColor
                            className="w-100 my-2"
                            {...inputSearchProps}
                            onChangeText={handleChangeTextSearch}
                        />
                    )}
                    {renderList}
                </View>
                {!(quickSelect && !multiple) && (
                    <Button
                        shape="square"
                        color="primary"
                        variant="standard"
                        className="position-absolute bottom-0 w-100 left-0 right-0"
                        style={{zIndex: 10}}
                        height={buttonSelectHeight}
                        onPress={handlePressSelect}
                        styleLabel={
                            Platform.OS === 'android'
                                ? {
                                      height: 110,
                                      paddingVertical: 20,
                                  }
                                : {
                                      height: 80,
                                      paddingVertical: 25,
                                  }
                        }
                        {...buttonSelectProps}>
                        {selectText}
                    </Button>
                )}
            </Modal>
        );
    }, [
        openModal,
        modalPropsConfig,
        modalProps,
        showSearch,
        quickSelect,
        multiple,
        buttonSelectProps,
        inputSearchProps,
        buttonSelectHeight,
        handlePressSelect,
    ]);

    const WrapperElement: typeof TouchableOpacity = onPress
        ? TouchableOpacity
        : (View as any);

    return (
        <WrapperElement
            activeOpacity={0.9}
            {...containerProps}
            style={[
                containerClass,
                {
                    pointerEvents: onPress ? 'box-only' : undefined,
                },
                style,
            ]}
            onPress={onPress}>
            {label && isOutSideLabel ? renderLabel : null}
            {renderInput}
            {error && <InputErrorView error={error} className={errorClass} />}
            {openModal ? renderModal : null}
        </WrapperElement>
    );
};

export default Select;
