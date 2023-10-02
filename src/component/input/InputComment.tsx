/** @format */
import ClassNames from 'classnames';
import _ from 'lodash';
import React, {
    ElementRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import {Animated, Keyboard, Platform} from 'react-native';
import useKeyboard, {IUseKeyboard} from '../../hooks/useKeyboard';
import {styleTransformer} from '../../style/style';
import Avatar, {IAvatarProps} from '../avatar/Avatar';
import {IUserBasic} from '../avatar/AvatarName';
import TouchableOpacity from '../view/TouchableOpacity';
import View from '../view/View';
import InputText, {IInputTextMethod, IInputTextProps} from './InputText';

export interface IInputCommentProps {
    className?: string;
    user?: IUserBasic;
    classNameWrapper?: string;
    positon?: 'bottom' | 'top' | 'free';
    placeholder?: string;
    onSubmit?: (value: any) => any;
    onPressUser?: (props?: any) => any;
    getPaddingBottom?: (props?: IUseKeyboard) => number;
    inputProps?: Partial<IInputTextProps>;
    avatarProps?: Partial<IAvatarProps>;
    useAnimation?: boolean;
}

export interface IInputCommentMethods extends IInputTextMethod {}

const InputComment: React.ForwardRefRenderFunction<
    IInputCommentMethods,
    IInputCommentProps
> = (
    {
        className,
        classNameWrapper,
        user,
        onSubmit,
        onPressUser,
        getPaddingBottom,
        placeholder,
        positon = 'bottom',
        inputProps = {},
        avatarProps = {},
        useAnimation,
    },
    ref,
) => {
    const wrapperClass = ClassNames(
        'flex-1 flex-center-y p-2',
        classNameWrapper,
    );
    const containerClass = ClassNames(
        'w-100 border-bottom shadow',
        {
            'position-absolute bottom-0': positon === 'bottom',
        },
        className,
    );

    const useKeyboardState = useKeyboard(false);
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

    useEffect(() => {
        // start the animation when the keyboard appears
        Keyboard.addListener('keyboardWillShow', e => {
            // use the height of the keyboard (negative because the translateY moves upward)
            startAnimation(-e.endCoordinates?.height);
        });
        // perform the reverse animation back to keyboardOffset initial value: 0
        Keyboard.addListener('keyboardWillHide', () => {
            startAnimation(0);
        });
        return () => {
            // remove listeners to avoid memory leak
            Keyboard.removeAllListeners('keyboardWillShow');
            Keyboard.removeAllListeners('keyboardWillHide');
        };
    }, []);

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
            return onSubmit(value);
        }
    };

    const content = (
        <View className={wrapperClass} useLightColor colorDarkMode="dark">
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
                className="flex-1 rounded-full"
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
        const transformedStyles = styleTransformer(containerClass);

        console.log(
            '🚀 >>>>>> file: InputComment.tsx:133 >>>>>> transformedStyles:',
            transformedStyles,
        );
        return (
            <Animated.View
                style={[
                    ...(transformedStyles || []),
                    {transform: [{translateY: keyboardOffset}]},
                ]}>
                {content}
            </Animated.View>
        );
    }

    return (
        <View className={containerClass} style={{paddingBottom: bottomPadding}}>
            {content}
        </View>
    );
};

export default React.forwardRef(InputComment);
