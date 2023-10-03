import React, {useState, useEffect, memo} from 'react';
import {Keyboard, KeyboardEvent} from 'react-native';

export interface IUseKeyboardOptions {
    keyboardDidShowHandler?: (e: KeyboardEvent) => any;
    keyboardDidHideHandler?: (e: KeyboardEvent) => any;
    keyboardWillShowHandler?: (e: KeyboardEvent) => any;
    keyboardWillHideHandler?: (e: KeyboardEvent) => any;
}

export interface IUseKeyboard extends Partial<KeyboardEvent> {
    isKeyboardShow: boolean;
    heightKeyboard: number;
}

const useKeyBoard = (
    initialValue = false,
    handlerOptions?: IUseKeyboardOptions,
): IUseKeyboard => {
    const {
        keyboardDidHideHandler,
        keyboardDidShowHandler,
        keyboardWillHideHandler,
        keyboardWillShowHandler,
    } = handlerOptions || {};
    const [keyboardInfo, setKeyboardInfo] = useState<IUseKeyboard>({
        isKeyboardShow: initialValue,
        heightKeyboard: 0,
    });
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            e => {
                keyboardDidShow(e);
                keyboardDidShowHandler && keyboardDidShowHandler(e);
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            e => {
                keyboardDidHide();
                keyboardDidHideHandler && keyboardDidHideHandler(e);
            },
        );
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [keyboardDidShowHandler,keyboardDidHideHandler]);

    useEffect(() => {
        if (keyboardWillShowHandler) {
            const keyboardDidShowListener = Keyboard.addListener(
                'keyboardWillShow',
                e => {
                    keyboardWillShowHandler && keyboardWillShowHandler(e);
                },
            );
        }
        if (keyboardWillHideHandler) {
            const keyboardDidHideListener = Keyboard.addListener(
                'keyboardWillHide',
                e => {
                    keyboardWillHideHandler && keyboardWillHideHandler(e);
                },
            );
        }

        return () => {
            Keyboard.removeAllListeners('keyboardWillShow');
            Keyboard.removeAllListeners('keyboardWillHide');
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
