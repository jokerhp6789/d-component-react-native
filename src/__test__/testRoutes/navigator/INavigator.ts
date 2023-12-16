import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {NavigatorScreenParams} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import type {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from '@react-navigation/native-stack';

//Root Stacks
export type TRootStacksParamList = {
    splashScreen: undefined;
    mainStacks: NavigatorScreenParams<TMainStacksParamList>;
    progress: undefined;
};
export type TRootStacksScreenProps<T extends keyof TRootStacksParamList> =
    NativeStackScreenProps<TRootStacksParamList, T>;

//Auth Stacks
export type TAuthStacksParamList = {
    loginScreen: undefined;
};
export type TAuthStacksScreenProps<T extends keyof TAuthStacksParamList> =
    NativeStackScreenProps<TAuthStacksParamList, T>;

//Main Stacks
export type TMainStacksParamList = {
    drawerStacks: NativeStackScreenProps<TDrawerStacksParamList>;
};
export type TMainStacksScreenProps = NativeStackScreenProps<
    TMainStacksParamList,
    keyof TMainStacksParamList
>;

// Drawer Stacks
export type TDrawerStacksParamList = {
    homeTab: DrawerScreenProps<TDrawerStacksParamList>;
} & TCommonStacksParamList;

// Tab Stacks
export type TTabStacksParamList = {
    homeTabStacks: BottomTabScreenProps<THomeTabStacksParamList>;
    nativeTabStacks: BottomTabScreenProps<TTestNativeTabStacksParamList>;
    animationTabStacks: BottomTabScreenProps<TTestNativeTabStacksParamList>;
    settingTabStacks: BottomTabScreenProps<TSettingTabStacksParamList>;
};
export type TTabStacksScreenProps<T extends keyof TTabStacksParamList> =
    NativeStackScreenProps<TTabStacksParamList, T>;

//Tab Stacks - Home Tab
export type THomeTabStacksParamList = {
    homeScreen: undefined;
} & TCommonStacksParamList;

//Tab Stacks - Test Native Tab
export type TTestNativeTabStacksParamList = {
    testNativeScreen: undefined;
} & TTestNativeStacksParamList;

//Tab Stacks - Test Animation Tab
export type TTestAnimationTabStacksParamList = {
    testAnimationScreen: undefined;
} & TTestAnimationStacksParamList;

//Tab Stacks - Setting Tab
export type TSettingTabStacksParamList = {
    settingScreen: undefined;
};

//Common Stacks
export type TCommonStacksParamList = {
    testStyleScreen: undefined;
    testTextScreen: undefined;
    testInputScreen: undefined;
    testSelectScreen: undefined;
    testButtonScreen: undefined;
    testBenchmarksScreen: undefined;
    testItemsScreen: undefined;
    testViewScreen: undefined;
    testImageScreen: undefined;
    testAvatarScreen: undefined;
    testHeaderScreen: undefined;
    testCalendarScreen: undefined;
    testListScreen: undefined;
    testProgressScreen: undefined;
    testTabBarScreen: undefined;
    testTabStepperScreen: undefined;
    testFormScreen: undefined;
    testBottomSheetScreen: undefined;
};

//Test Native Stacks
export type TTestNativeStacksParamList = {
    testNativeMap: undefined;
    testNativeKeyboard: undefined;
};

//Test Native Stacks
export type TTestAnimationStacksParamList = {
    testLayoutAnimationScreen: undefined;
};

export type TCommonStacksScreenProps<T extends keyof TCommonStacksParamList> =
    NativeStackScreenProps<TCommonStacksParamList, T>;

export interface IUseNavigation
    extends NativeStackNavigationProp<TRootStacksParamList> {}

export interface IRootScreenNavigationProps
    extends NativeStackScreenProps<TRootStacksParamList> {}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends TRootStacksParamList {}
    }
}
