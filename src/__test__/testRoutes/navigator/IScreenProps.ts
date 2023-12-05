import {BottomTabScreenProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {
    TAuthStacksScreenProps,
    TCommonStacksParamList,
    TCommonStacksScreenProps,
    TDrawerStacksParamList,
    THomeTabStacksParamList,
    TRootStacksParamList,
    TRootStacksScreenProps,
    TTabStacksParamList,
    TTestNativeStacksParamList,
    TTestNativeTabStacksParamList,
} from './INavigator';

/***************************** SCREENS **********************************/

export type THomeScreenProps = CompositeScreenProps<
    BottomTabScreenProps<THomeTabStacksParamList, 'homeScreen'>,
    CompositeScreenProps<
        TRootStacksScreenProps<keyof TRootStacksParamList>,
        DrawerScreenProps<TDrawerStacksParamList>
    >
>;

export type TTestNativeScreenProps = CompositeScreenProps<
    BottomTabScreenProps<TTestNativeTabStacksParamList, 'testNativeScreen'>,
    CompositeScreenProps<
        TRootStacksScreenProps<keyof TRootStacksParamList>,
        TCommonStacksScreenProps<keyof TCommonStacksParamList>
    >
>;
