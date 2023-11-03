import _, {filter, some} from 'lodash';
import React, {ElementRef, useEffect, useMemo, useRef, useState} from 'react';
import {
    Platform,
    StyleProp,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import Configs from '../../style/config/_config';
import Sizes from '../../style/size/_size';
import {IStyleTransformerProps, styleTransformer} from '../../style/style';
import Button, {IButtonProps} from '../button/Button';
import CheckBox, {ICheckBoxProps} from '../checkbox/CheckBox';
import Icon from '../icon/Icon';
import InputSearch, {IInputSearchProps} from '../input/InputSearch';
import {InputErrorView, InputVariantType} from '../input/InputText';
import Chip, {IChipProps} from '../items/Chip';
import AwesomeList, {
    IAwesomeListProps,
    IPaginationProps,
} from '../list/awesomeList/AwesomeList';
import Modal, {IModalProps} from '../modal/Modal';
import Text from '../text/Text';

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
    placeholder?: string;
    selectText?: string;
    clearText?: string;
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
    buttonSelectProps?: Partial<IButtonProps>;
    modalProps?: Partial<IModalProps>;
    checkboxProps?: Partial<ICheckBoxProps>;
}

const Select: React.FC<ISelectProps> = ({
    variant: variantProps,
    buttonSelectHeight = Platform.OS === 'android' ? 110 : 85,
    height = Sizes.inputHeight,
    label,
    disabled,
    selectText = 'Select',
    clearText = 'Clear',
    placeholder,
    iconName = 'keyboard-arrow-right',
    className,
    classNameLabel,
    classNameError,
    style,
    styleContent,
    styleList,
    value,
    onChange,
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
    modalProps = {},
    buttonSelectProps = {},
    checkboxProps = {},
    dataSource = [],
    valueType = 'object',
}) => {
    const listRef = useRef<ElementRef<typeof AwesomeList>>(null);
    const {inputConfig} = Configs;
    const {variant: variantConfig} = inputConfig || {};
    const variant = variantProps || variantConfig || 'standard';

    const hasBorder =
        variant === 'outline' || variant === 'pill' || variant === 'rounded';
    const containerClass = styleTransformer(`w-100`, className);
    const labelClass = styleTransformer(
        `h4`,
        {
            'mb-1': hasBorder,
            //   "font-weight-bold": focusing,
        },
        `${classNameLabel}`,
    );
    const contentClass = styleTransformer('flex-center-y pr-1 pl-2', {
        'border-bottom': variant === 'standard',
        'pl-1 py-1': !!multiple,
        border: hasBorder,
        'rounded-1': variant === 'rounded',
    });
    const errorClass = styleTransformer(
        'mt-1',
        {
            'px-2': variant === 'pill',
        },
        classNameError,
    );

    const inputHeight = useMemo(() => {
        if (multiple && !_.isEmpty(value)) {
            return undefined;
        }
        return height;
    }, [value, multiple, height]);

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

    const renderSelectItem = ({item, index}: any) => {
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
    };

    const renderClearButton = () => {
        if (multiple && !_.isEmpty(selectingValue) && showClearButton) {
            return (
                <View>
                    <Button
                        variant="trans"
                        classNameLabel="h5"
                        className="px-0 align-self-end"
                        iconName="refresh"
                        height={20}
                        onPress={() => setSelectingValue([])}>
                        {clearText}
                    </Button>
                </View>
            );
        }
        return <View style={styleTransformer('width-[30]')} />;
    };

    const renderList = useMemo(() => {
        if (dataSource && dataSource?.length > 0) {
            return (
                <AwesomeList
                    ref={listRef}
                    isPaging={isPaging}
                    source={() => Promise.resolve()}
                    transformer={res => getResultFromSearch(dataSource)}
                    renderItem={renderSelectItem}
                    keyExtractor={keyExtractor}
                    ListFooterComponent={<View style={{height: 200}} />}
                    showsVerticalScrollIndicator={false}
                    {...listProps}
                />
            );
        }
        return (
            <AwesomeList
                ref={listRef}
                isPaging={isPaging}
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
                renderItem={renderSelectItem}
                keyExtractor={keyExtractor}
                ListFooterComponent={<View style={{height: 200}} />}
                showsVerticalScrollIndicator={false}
                {...listProps}
            />
        );
    }, [dataSource, listProps, renderSelectItem, keyExtractor]);

    return (
        <View style={[containerClass, style]}>
            {label && <Text style={labelClass}>{label}</Text>}
            <TouchableOpacity
                style={[{height: inputHeight}, contentClass, styleContent]}
                onPress={() => setOpenModal(true)}
                disabled={disabled}
                activeOpacity={0.5}>
                {renderContent}
                <Icon
                    name={iconName}
                    size={16}
                    color={!_.isEmpty(value) ? undefined : 'gray'}
                />
            </TouchableOpacity>
            {error && <InputErrorView error={error} className={errorClass} />}
            <Modal
                open={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setTextSearch('');
                }}
                showHeader
                title={label}
                leftIcon="close"
                customRight={renderClearButton() as any}
                classNameHeader="border-bottom"
                className="px-0"
                swipeable={false}
                {...modalProps}>
                <View style={styleTransformer('h-100 position-relative px-3')}>
                    {showSearch && (
                        <InputSearch
                            useLightColor
                            className="w-100 my-2"
                            variant="outline"
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
                        onPress={() => handlePressSelect()}
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
        </View>
    );
};

export default Select;
