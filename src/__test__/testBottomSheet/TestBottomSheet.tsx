import React, {ElementRef, useCallback, useMemo, useRef} from 'react';
import GBottomSheet, {
    BottomSheetModal,
    BottomSheetBackdrop,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import DBottomSheet, {BottomSheetMethods} from '@devvie/bottom-sheet';
import Button from '../../component/button/Button';
import ProgressController from '../../component/progress/ProgressController';
import View from '../../component/view/View';
import {styleTransformer} from '../../style/style';
import {Text} from 'react-native';
import { SafeAreaView } from '../../../dist';

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
        <SafeAreaView className="w-100 flex-1">
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
            <DBottomSheet ref={sheetRef}  closeOnDragDown>
                <Text>
                    The smart 😎, tiny 📦, and flexible 🎗 bottom sheet your app
                    craves 🚀
                </Text>
            </DBottomSheet>
        </SafeAreaView>
    );
};

export default TestBottomSheet;
