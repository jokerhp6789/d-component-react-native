import DBottomSheet, {BottomSheetMethods} from '@devvie/bottom-sheet';
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetModal,
} from '@gorhom/bottom-sheet';
import React, {ElementRef, useCallback, useMemo, useRef} from 'react';
import {Text} from 'react-native';
import Button from '../../component/button/Button';
import View from '../../component/view/View';
import {styleTransformer} from '../../style/style';
import Layout from '../testLayout/Layout';

export interface ITestBottomSheetProps {
    [key: string]: any;
}

const TestBottomSheet: React.FC<ITestBottomSheetProps> = ({id}) => {
    const sheetRef = useRef<BottomSheetMethods>(null);
    const bottomSheetRef = useRef<ElementRef<typeof BottomSheetModal>>(null);

    const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <Layout className="w-100 flex-1">
            <Button
                className="mt-3"
                onPress={() => {
                    bottomSheetRef.current?.present();
                }}>
                Open Gorhom Bottom Sheet
            </Button>
            <Button
                className="mt-3"
                onPress={() => {
                    sheetRef.current && sheetRef.current.open();
                }}>
                Open Devvie Bottom Sheet
            </Button>
            <BottomSheetModal
                backdropComponent={BottomSheetBackdrop}
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose
                onChange={handleSheetChanges}>
                <View style={styleTransformer('')}>
                    <Text>Awesome 🎉</Text>
                </View>
            </BottomSheetModal>
            <DBottomSheet ref={sheetRef} closeOnDragDown>
                <Text>
                    The smart 😎, tiny 📦, and flexible 🎗 bottom sheet your app
                    craves 🚀
                </Text>
            </DBottomSheet>
        </Layout>
    );
};

export default TestBottomSheet;
