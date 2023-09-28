import React, {useState, useEffect, memo} from 'react';
import {Keyboard, KeyboardEvent} from 'react-native';

export interface IUseKeyboard extends Partial<KeyboardEvent> {
    isKeyboardShow: boolean;
    heightKeyboard: number;
}

const useKeyBoard = (initialValue = false): IUseKeyboard => {
    const [keyboardInfo, setKeyboardInfo] = useState<IUseKeyboard>({
        isKeyboardShow: initialValue,
        heightKeyboard: 0,
    });
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            e => keyboardDidShow(e),
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => keyboardDidHide(),
        );
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const keyboardDidShow = (e: KeyboardEvent) => {
        const {
            duration,
            easing,
            endCoordinates,
            isEventFromThisApp,
            startCoordinates,
        } = e || {};
        const {isKeyboardShow, heightKeyboard} = keyboardInfo;
        if (!isKeyboardShow || heightKeyboard === 0) {
            setKeyboardInfo({
                isKeyboardShow: true,
                heightKeyboard: e.endCoordinates.height,
                ...(e || {}),
            });
        } else {
            setKeyboardInfo(prev => ({
                ...(prev || {}),
                ...(e || {}),
            }));
        }
    };

    const keyboardDidHide = () => {
        setKeyboardInfo({
            isKeyboardShow: false,
            heightKeyboard: 0,
        });
    };

    return keyboardInfo;
};
export default useKeyBoard;
