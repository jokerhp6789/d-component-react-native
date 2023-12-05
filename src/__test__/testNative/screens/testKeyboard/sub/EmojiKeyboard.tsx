import {FlashList} from '@shopify/flash-list';
import React, {ElementRef, useCallback, useMemo, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import Text from '../../../../../component/text/Text';
import {styleTransformer} from '../../../../../style/style';
import KeyboardRegistry from '../../../components/keyboardView/KeyboardInput/KeyboardRegistry';

const EmojiKeyboard = ({appEmojis, onItemSelected}: any) => {
    const onItemClicked = (eventType: any, emoji?: any) => {
        KeyboardRegistry.onItemSelected('EmojiKeyboard', {eventType, emoji});
    };

    const onSelectEmoji = () => {};

    return (
        <View
            style={styleTransformer('flex-1 bg-red h-[300]')}
            testID="messagebox-keyboard-emoji">
            <View>
                <Text>EmojiKeyboard</Text>
            </View>
        </View>
    );
};

KeyboardRegistry.registerKeyboard('EmojiKeyboard', () => EmojiKeyboard);
