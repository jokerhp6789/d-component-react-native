// @ts-nocheck
import ClassNames from "classnames";
import _, { filter, some } from "lodash";
import React, { ElementRef, useEffect, useMemo, useRef, useState } from "react";
import { Platform, ViewStyle } from "react-native";
import Sizes from "../../style/size/_size";
import Button from "../button/Button";
import CheckBox from "../checkbox/CheckBox";
import Icon from "../icon/Icon";
import InputSearch, { IInputSearchProps } from "../input/InputSearch";
import { InputErrorView } from "../input/InputText";
import Chip, { IChipProps } from "../items/Chip";
import AwesomeList, {
  IAwesomeListProps,
  IPaginationProps,
} from "../list/awesomeList/AwesomeList";
import Modal from "../modal/Modal";
import Text from "../text/Text";
import TouchableOpacity from "../view/TouchableOpacity";
import View from "../view/View";

export interface ISelectSourceProps extends IPaginationProps {
  search?: string;
}

export interface ISelectProps
  extends Partial<
    Pick<IAwesomeListProps<any>, "transformer" | "keyExtractor" | "isPaging">
  > {
  variant?: "standard" | "outline" | "rounded" | "pill" | "trans";
  label?: any;
  placeholder?: string;
  selectText?: string;
  clearText?: string;
  error?: any;
  height?: number;
  buttonSelectHeight?: number;
  className?: string;
  classNameLabel?: string;
  classNameContent?: string;
  classNameError?: string;
  iconName?: string;
  style?: ViewStyle;
  styleContent?: ViewStyle;
  styleList?: ViewStyle;
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
  // input search props.
  showSearch?: boolean;
  inputSearchProps?: IInputSearchProps;
  searchOffline?: boolean;
  keySearchOffline?: Array<string>;

  listProps?: IAwesomeListProps<any>;
  chipProps?: IChipProps;

  dataSource?: Array<any>;

  valueType?: "object" | "string";
}

const Select: React.FC<ISelectProps> = ({
  variant = "standard",
  buttonSelectHeight = Platform.OS === "android" ? 100 : 75,
  height = Sizes.inputHeight,
  label,
  disabled,
  selectText = "Select",
  clearText = "Clear",
  placeholder,
  iconName = "keyboard-arrow-right",
  className,
  classNameLabel,
  classNameError,
  style,
  styleContent,
  styleList,
  value,
  onChange,
  getLabel = (item) => item?.name,
  getValue = (item) => item?.id,
  getDisplayValue,
  source = (paging) => Promise.resolve(),
  transformer = (res) => res,
  keyExtractor = (item, index) => `${item?.id} ${index}`,
  customSelectItem,
  error,
  multiple,
  quickSelect,
  quickRemove,
  isPaging,
  showSearch,
  inputSearchProps = {},
  searchOffline = false,
  keySearchOffline = ["name"],
  listProps = {},
  chipProps = {},
  dataSource = [],
  valueType = "object",
}) => {
  const listRef = useRef<ElementRef<typeof AwesomeList>>(null);

  const hasBorder =
    variant === "outline" || variant === "pill" || variant === "rounded";
  const containerClass = ClassNames(`w-100`, className);
  const labelClass = ClassNames(
    `h4`,
    {
      "mb-1": hasBorder,
      //   "font-weight-bold": focusing,
    },
    `${classNameLabel}`
  );
  const contentClass = ClassNames("flex-center-y pr-1", {
    "border-bottom": variant === "standard",
    "pl-1 py-1": multiple,
    "pl-2": variant !== "standard",
    border: variant === "outline",
  });
  const errorClass = ClassNames(
    "mt-1",
    {
      "px-2": variant === "pill",
    },
    classNameError
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

  const handleChangeTextSearch = _.debounce((text) => {
    setTextSearch(text);
    refreshList();
  }, 300);

  const checkSelectedItem = (item: any): boolean => {
    let isSelected = false;
    if (!_.isEmpty(selectingValue)) {
      if (multiple && _.isArray(selectingValue)) {
        const arrIds =
          valueType === "object"
            ? selectingValue.map((i) => getValue(i))
            : selectingValue;
        isSelected = arrIds.includes(getValue(item));
      } else {
        const v =
          valueType === "object" ? getValue(selectingValue) : selectingValue;
        isSelected = v === getValue(item);
      }
    }

    return isSelected;
  };

  const handleSelectItem = (item: any, selected: boolean) => {
    const updateValue = valueType === "object" ? item : getValue(item);
    if (quickSelect && !multiple) {
      onChange && onChange(updateValue);
      return setOpenModal(false);
    }
    if (multiple) {
      let arrayClone = [...(selectingValue || [])];
      if (selected) {
        arrayClone = selectingValue.filter((i: any) =>
          valueType === "object"
            ? getValue(i) !== getValue(item)
            : i !== getValue(item)
        );
      } else {
        arrayClone.push(updateValue);
      }
      setSelectingValue(arrayClone);
    } else if (selected) {
      setSelectingValue(valueType === "object" ? {} : undefined);
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
    if (valueType === "string" && dataSource?.length > 0) {
      const valueObj = dataSource.find((item) => getValue(item) === value);
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
      const newData = filter(data, (item) => {
        if (
          some(keySearchOffline, (key) => {
            const value = `${item?.[key]}` ?? "";
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

  const renderContent = () => {
    if (_.isEmpty(value)) {
      if (placeholder) {
        return <Text className="text-grey flex-1 h4">{placeholder}</Text>;
      }
    }
    if (multiple && _.isArray(value)) {
      return (
        <View className="flex-wrap flex-row flex-1">
          {value.map((i) => {
            const iLabel = getLabelFromValue(i);
            return (
              <Chip
                label={iLabel}
                className="mx-1 my-1"
                iconName={quickRemove ? "close" : undefined}
                onPressIcon={() => {
                  const clone = (value || []).filter(
                    (v) => getValue(v) !== getValue(i)
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
  };

  const renderSelectItem = ({ item, index }: any) => {
    const selected = checkSelectedItem(item);
    const selectItemClass = ClassNames("flex-center-y py-3", {
      "border-top": index !== 0,
    });
    let content: any = (
      <View>
        <Text>{getLabel(item)}</Text>
      </View>
    );
    if (customSelectItem) {
      content = customSelectItem({ item, index, selected });
    }

    return (
      <TouchableOpacity
        onPress={() => handleSelectItem(item, selected)}
        className={selectItemClass}
      >
        <View className="flex-1">{content}</View>
        <CheckBox checked={selected} pressEnable={false} />
      </TouchableOpacity>
    );
  };

  const renderClearButton = () => {
    if (multiple && !_.isEmpty(selectingValue)) {
      return (
        <View>
          <Button
            variant="trans"
            classNameLabel="h5"
            className="px-0 align-self-end"
            iconName="refresh"
            height={20}
            onPress={() => setSelectingValue([])}
          >
            {clearText}
          </Button>
        </View>
      );
    }
    return <View className="width-30" />;
  };

  const renderList = () => {
    if (dataSource && dataSource?.length > 0) {
      return (
        <AwesomeList
          ref={listRef}
          isPaging={isPaging}
          source={() => Promise.resolve()}
          transformer={(res) => getResultFromSearch(dataSource)}
          renderItem={renderSelectItem}
          keyExtractor={keyExtractor}
          className="px-3"
          ListFooterComponent={<View style={{ height: 200 }} />}
          showsVerticalScrollIndicator={false}
          {...listProps}
        />
      );
    }
    return (
      <AwesomeList
        ref={listRef}
        isPaging={isPaging}
        source={(paging) => {
          const payload: ISelectSourceProps = { ...paging };
          if (textSearch) {
            payload.search = textSearch;
          }
          return source && source(payload);
        }}
        transformer={(res) => {
          const data = transformer && transformer(res);
          return getResultFromSearch(data);
        }}
        renderItem={renderSelectItem}
        keyExtractor={keyExtractor}
        className="px-3"
        ListFooterComponent={<View style={{ height: 200 }} />}
        showsVerticalScrollIndicator={false}
        {...listProps}
      />
    );
  };

  return (
    <View className={containerClass} style={style}>
      {label && <Text className={labelClass}>{label}</Text>}
      <TouchableOpacity
        style={[{ height: inputHeight }, styleContent]}
        className={contentClass}
        onPress={() => setOpenModal(true)}
        disabled={disabled}
      >
        {renderContent()}
        <Icon
          name={iconName}
          size={16}
          color={!_.isEmpty(value) ? undefined : "gray"}
        />
      </TouchableOpacity>
      {error && <InputErrorView error={error} className={errorClass} />}
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setTextSearch("");
        }}
        showHeader
        title={label}
        leftIcon="close"
        customRight={renderClearButton() as any}
        classNameHeader="border-bottom"
        className="px-0"
        swipeable={false}
      >
        <View className="h-100 position-relative">
          {!(quickSelect && !multiple) && (
            <Button
              className="position-absolute bottom-0 w-100 left-0 right-0"
              style={{ zIndex: 10 }}
              height={buttonSelectHeight}
              onPress={() => handlePressSelect()}
              styleLabel={
                Platform.OS === "android"
                  ? {
                      height: 100,
                      paddingVertical: 20,
                    }
                  : undefined
              }
            >
              {selectText}
            </Button>
          )}
          {showSearch && (
            <InputSearch
              useLightColor
              className="w-100 mt-2 px-3"
              variant="outline"
              {...inputSearchProps}
              onChangeText={handleChangeTextSearch}
            />
          )}
          {renderList()}
        </View>
      </Modal>
    </View>
  );
};

export default Select;
