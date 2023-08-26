import React, { useImperativeHandle, useRef } from "react";
import InputText, { IInputTextMethod, IInputTextProps } from "./InputText";

export interface IInputSearchProps extends IInputTextProps {
  onPressSearch?: IInputTextProps["onPressIcon"];
}

export interface IInputSearchMethod extends IInputTextMethod {}

const InputSearch: React.ForwardRefRenderFunction<
  IInputSearchMethod,
  IInputSearchProps
> = (
  { variant = "trans", placeholder = "Search...", onPressSearch, ...rest },
  ref
) => {
  const searchRef = useRef();
  useImperativeHandle(ref, () => ({}));
  return (
    <InputText
      iconName="search"
      variant={variant}
      placeholder={placeholder}
      onPressIcon={onPressSearch}
      {...rest}
    />
  );
};

export default React.forwardRef(InputSearch);
