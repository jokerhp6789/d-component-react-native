import {FlashList} from '@shopify/flash-list';
import React, {ElementRef, useCallback, useMemo, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import Button from '../../../../component/button/Button';
import ButtonIcon from '../../../../component/button/ButtonIcon';
import InputText from '../../../../component/input/InputText';
import Divider from '../../../../component/items/Divider';
import Text from '../../../../component/text/Text';
import {styleTransformer} from '../../../../style/style';
import ColorUtils from '../../../../utils/ColorUtils';
import Layout from '../../../testLayout/Layout';
import KeyboardAccessoryView from '../../components/keyboardView/KeyboardInput/KeyboardAccessoryView';
import KeyboardRegistry from '../../components/keyboardView/KeyboardInput/KeyboardRegistry';
import KeyboardTrackingView from '../../components/keyboardView/KeyboardTracking/KeyboardTrackingView';
import './sub/EmojiKeyboard';

export interface ITestNativeKeyboardScreenProps {
    [key: string]: any;
}

export enum CustomKeyboardType {
    EMOJI_KEYBOARD = 'EmojiKeyboard',
}

const CUSTOM_KEYBOARD_COLOR = '#ffffff';
const TestNativeKeyboardScreen: React.FC<ITestNativeKeyboardScreenProps> = ({
    id,
}) => {
    const [customKeyboard, setCustomKeyboard] = useState<{
        component?: CustomKeyboardType;
        initialProps?: any;
    }>({});
    const keyboardRef = useRef<ElementRef<typeof KeyboardAccessoryView>>(null);
    const kbInputRef = useRef<ElementRef<typeof InputText>>(null);

    const onRequestShowKeyboard = (componentID: CustomKeyboardType) => {
        setCustomKeyboard({
            component: componentID,
            initialProps: {},
        });
    };

    const renderContent = useCallback(() => {
        return (
            <View
                style={styleTransformer(
                    'p-3 flex-center-y gap-3 bg-white border-top',
                )}>
                <TextInput
                    ref={component => ((kbInputRef.current as any) = component)}
                    style={styleTransformer('flex-1 border rounded h-[50]')}
                    returnKeyType="default"
                    keyboardType="default"
                />
                <ButtonIcon
                    iconName="emoji-happy"
                    iconProps={{type: 'entypo'}}
                    onPress={() => {
                        setCustomKeyboard({
                            component: CustomKeyboardType.EMOJI_KEYBOARD,
                            initialProps: {},
                        });
                    }}
                />
            </View>
        );
    }, [setCustomKeyboard, kbInputRef]);

    const renderItem = useCallback(({item, index}: any) => {
        return (
            <View
                style={styleTransformer('p-3', {
                    backgroundColor: ColorUtils.getRandomColor(),
                })}>
                <Text>{index}</Text>
            </View>
        );
    }, []);

    return (
        <Layout>
            <FlashList
                inverted
                style={{flex: 1}}
                data={new Array(200).fill(0)}
                renderItem={renderItem}
                keyExtractor={(item, index) => {
                    return `${item}_${index}`;
                }}
                ItemSeparatorComponent={Divider}
                automaticallyAdjustKeyboardInsets
                // automaticallyAdjustContentInsets
                keyboardDismissMode='interactive'
            />
            <KeyboardAccessoryView
                renderContent={renderContent}
                addBottomView
                useSafeArea
                //@ts-ignore
                trackInteractive
                requiresSameParentToManageScrollView
                revealKeyboardInteractive
                bottomViewColor={CUSTOM_KEYBOARD_COLOR}
                ref={(ref: any) => ((keyboardRef.current as any) = ref)}
                kbInputRef={kbInputRef.current}
                kbComponent={customKeyboard?.component}
                kbInitialProps={customKeyboard?.initialProps}
                // onKeyboardResigned={onKeyboardResigned}
                // onItemSelected={onKeyboardItemSelected as any}
                onRequestShowKeyboard={onRequestShowKeyboard as any}
                scrollBehavior={KeyboardTrackingView.scrollBehaviors.NONE}
            />
        </Layout>
    );
};

export default TestNativeKeyboardScreen;
