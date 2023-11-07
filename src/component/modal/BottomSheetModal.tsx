import React, {useCallback} from 'react';
import {
    BottomSheetBackdrop,
    BottomSheetModal as RnBottomSheetModal,
    BottomSheetModalProps,
} from '@gorhom/bottom-sheet';

export interface IBottomSheetModalProps extends BottomSheetModalProps {
    bottomSheetRef?: any;
}

const BottomSheetModal: React.FC<IBottomSheetModalProps> = ({
    children,
    bottomSheetRef,
    snapPoints = ['80%'],
    ...rest
}) => {
    const renderBackdrop = useCallback((props: any) => {
        return (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.5}
                pressBehavior="close"
            />
        );
    }, []);

    return (
        <RnBottomSheetModal
            ref={bottomSheetRef}
            backdropComponent={renderBackdrop}
            snapPoints={snapPoints}
            enablePanDownToClose
            {...rest}>
            {children}
        </RnBottomSheetModal>
    );
};

export default BottomSheetModal;
