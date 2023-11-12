/** @format */
import _ from 'lodash';
import React, {
    ElementRef,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    Animated,
    Keyboard,
    Platform,
    KeyboardEvent,
    StyleProp,
    ViewStyle,
    View,
} from 'react-native';
import useKeyboard, {IUseKeyboard} from '../../hooks/useKeyboard';
import {IStyleTransformerProps, styleTransformer} from '../../style/style';
import Avatar, {IAvatarProps} from '../avatar/Avatar';
import {IUserBasic} from '../avatar/AvatarName';
import TouchableOpacity from '../view/TouchableOpacity';
import InputText, {IInputTextMethod, IInputTextProps} from './InputText';
import {ThemeProps} from '../../interface/iTheme';

export interface IInputCommentProps extends ThemeProps {
    user?: IUserBasic;
    className?: IStyleTransformerProps;
    classNameInputWrapper?: IStyleTransformerProps;
    classNameInput?: IStyleTransformerProps;
    style?: StyleProp<ViewStyle>;
    styleContentWrapper?: StyleProp<ViewStyle>;
    positon?: 'bottom' | 'top' | 'free';
    placeholder?: IStyleTransformerProps;
    onSubmit?: (value: any) => any;
    onPressUser?: (props?: any) => any;
    getPaddingBottom?: (props?: IUseKeyboard) => number;
    getKeyboardOffset?: (props?: KeyboardEvent) => number;
    inputProps?: Partial<IInputTextProps>;
    avatarProps?: Partial<IAvatarProps>;
    useAnimation?: boolean;
    dismissKeyboardAfterSubmit?: boolean;
}

export interface IInputCommentMethods extends IInputTextMethod {}

const InputComment: React.ForwardRefRenderFunction<
    IInputCommentMethods,
    IInputCommentProps
> = (
    {
        className,
        classNameInput,
        classNameInputWrapper: classNameWrapper,
        user,
        onSubmit,
        onPressUser,
        getPaddingBottom,
        getKeyboardOffset,
        placeholder,
        positon = 'bottom',
        inputProps = {},
        avatarProps = {},
        useAnimation,
        dismissKeyboardAfterSubmit = true,
        style,
        styleContentWrapper: styleInputWrapper,
    },
    ref,
) => {
    const wrapperClass = styleTransformer(
        'flex-1 flex-center-y p-2',
        classNameWrapper,
    );
    const containerClass = styleTransformer(
        'w-100 border-bottom shadow bg-white',
        {
            'absolute bottom-0': positon === 'bottom',
        },
        className,
    );
    const useKeyboardState = useKeyboard(
        false,
        useAnimation
            ? {
                  keyboardWillShowHandler: e => {
                      if (getKeyboardOffset) {
                          const value = getKeyboardOffset(e);
                          return startAnimation(value);
                      }
                      return startAnimation(-e.endCoordinates?.height);
                  },
                  keyboardWillHideHandler: e => startAnimation(0),
              }
            : undefined,
    );
    const inputRef = useRef<ElementRef<typeof InputText>>();
    const keyboardOffset = useRef(new Animated.Value(0)).current;
    const [value, setValue] = useState<any>();

    const {isKeyboardShow, heightKeyboard} = useKeyboardState || {};
    const bottomPadding = useMemo(() => {
        if (!isKeyboardShow) {
            return 0;
        }
        if (getPaddingBottom && typeof getPaddingBottom === 'function') {
            return getPaddingBottom(useKeyboardState);
        }
        if (Platform.OS === 'android') {
            return 0;
        }
        return heightKeyboard;
    }, [heightKeyboard, isKeyboardShow]);

    useImperativeHandle(ref, () => ({
        clear: () => inputRef.current && inputRef?.current.clear?.(),
        blur: () => inputRef.current && inputRef?.current.blur?.(),
        focus: () => inputRef.current && inputRef?.current.focus?.(),
    }));

    const startAnimation = (toValue: number) =>
        Animated.timing(keyboardOffset, {
            toValue,
            duration: 100,
            useNativeDriver: true,
        }).start();

    const onSubmitComment = () => {
        if (_.isEmpty(value)) {
            return null;
        }
        setValue('');
        if (onSubmit) {
            onSubmit(value);
        }
        if (dismissKeyboardAfterSubmit) {
            Keyboard.dismiss();
        }
    };

    const content = (
        <View style={[wrapperClass, styleInputWrapper]}>
            {user && (
                <TouchableOpacity
                    colorDarkMode="transparent"
                    onPress={() => onPressUser && onPressUser()}>
                    <Avatar
                        avatar={user?.avatar}
                        text={user?.name || user?.fullName || undefined}
                        size="x-small"
                        className="mr-2"
                        {...avatarProps}
                    />
                </TouchableOpacity>
            )}
            <InputText
                value={value}
                height={45}
                onChangeText={v => setValue(v)}
                variant="trans"
                className={`flex-1 rounded-full ${classNameInput}`}
                iconName="send"
                iconProps={{style: {transform: [{rotate: '-45deg'}]}}}
                placeholder={placeholder}
                onPressIcon={() => onSubmitComment()}
                {...inputProps}
                ref={inputRef as any}
            />
        </View>
    );

    if (useAnimation) {
        return (
            <Animated.View
                style={[
                    style,
                    {...(containerClass || {})},
                    {transform: [{translateY: keyboardOffset}]},
                ]}>
                {content}
            </Animated.View>
        );
    }

    return (
        <View style={[style, containerClass, {paddingBottom: bottomPadding}]}>
            {content}
        </View>
    );
};

export default React.forwardRef(InputComment);
