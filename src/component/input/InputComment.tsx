/** @format */
import ClassNames from 'classnames';
import _ from 'lodash';
import React, {useMemo, useState} from 'react';
import {Platform} from 'react-native';
import useKeyboard, {IUseKeyboard} from '../../hooks/useKeyboard';
import Avatar, {IAvatarProps} from '../avatar/Avatar';
import {IUserBasic} from '../avatar/AvatarName';
import TouchableOpacity from '../view/TouchableOpacity';
import View from '../view/View';
import InputText, {IInputTextProps} from './InputText';

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
}

const InputComment: React.FC<IInputCommentProps> = ({
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
}) => {
    const [value, setValue] = useState<any>();
    const containerClass = ClassNames(
        'w-100 border-bottom shadow',
        {
            'position-absolute bottom-0': positon === 'bottom',
        },
        className,
    );
    const wrapperClass = ClassNames(
        'flex-1 flex-center-y p-2',
        classNameWrapper,
    );
    const useKeyboardState = useKeyboard(false);
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

    const onSubmitComment = () => {
        if (_.isEmpty(value)) {
            return null;
        }
        setValue('');
        if (onSubmit) {
            return onSubmit(value);
        }
    };

    return (
        <View className={containerClass} style={{paddingBottom: bottomPadding}}>
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
                />
            </View>
        </View>
    );
};

export default InputComment;
