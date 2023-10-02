import React, {ElementRef, useImperativeHandle, useRef} from 'react';
import InputText, {IInputTextMethod, IInputTextProps} from './InputText';

export interface IInputSearchProps extends IInputTextProps {
    onPressSearch?: IInputTextProps['onPressIcon'];
}

export interface IInputSearchMethod extends IInputTextMethod {}

const InputSearch: React.ForwardRefRenderFunction<
    IInputSearchMethod,
    IInputSearchProps
> = (
    {variant = 'trans', placeholder = 'Search...', onPressSearch, ...rest},
    ref,
) => {
    const searchRef = useRef<ElementRef<typeof InputText>>();
    useImperativeHandle(ref, () => ({
        clear: () => searchRef.current && searchRef?.current.clear?.(),
        blur: () => searchRef.current && searchRef?.current.blur?.(),
        focus: () => searchRef.current && searchRef?.current.focus?.(),
    }));
    return (
        <InputText
            iconName="search"
            variant={variant}
            placeholder={placeholder}
            onPressIcon={onPressSearch}
            {...rest}
            ref={searchRef as any}
        />
    );
};

export default React.forwardRef(InputSearch);
