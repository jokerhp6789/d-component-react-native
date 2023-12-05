import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../../testScreens/home/HomeScreen';
import SettingScreen from '../../testScreens/setting/SettingScreen';
import TabBottom from '../components/TabBottom';
import {
    THomeTabStacksParamList,
    TSettingTabStacksParamList,
    TTabStacksParamList,
    TTestNativeTabStacksParamList,
} from '../navigator/INavigator';
import {commonStacksCreator, getDataItemTitle} from './CommonStacks';
import Icon from '../../../component/icon/Icon';
import TestNativeScreen from '../../testNative/TestNative';
import TestNativeMapScreen from '../../testNative/screens/testMap/TestNativeMapScreen';
import Text from '../../../component/text/Text';
import TestNativeKeyboardScreen from '../../testNative/screens/testKeyboard/TestNativeKeyboardScreen';
import ButtonIcon from '../../../component/button/ButtonIcon';
import {useNavigation} from '@react-navigation/native';

export interface IMainStacksProps {
    [key: string]: any;
}

export interface ITabStacksProps {
    [key: string]: any;
}

export const DEFAULT_HEADER: Partial<NativeStackNavigationOptions> = {
    headerBackTitleVisible: false,
    headerShown: false,
};

export const renderMenuIcon = ({navigation}: any) => {
    return (
        <Icon
            name="menu"
            onPress={() => {
                navigation.openDrawer();
            }}
        />
    );
};

const TabStack = createBottomTabNavigator<TTabStacksParamList>();
const TabStackScreen = TabStack.Screen;
const TabStacks: React.FC<ITabStacksProps> = React.memo(({id}) => {
    return (
        <TabStack.Navigator
            id="mainTab"
            key="mainTab"
            initialRouteName="homeTabStacks"
            tabBar={props => <TabBottom {...props} />}
            screenOptions={
                {
                    ...DEFAULT_HEADER,
                } as any
            }>
            <TabStackScreen name="homeTabStacks" component={HomeTabStacks} />
            <TabStackScreen
                name="nativeTabStacks"
                component={NativeTabStacks}
            />
            <TabStackScreen
                name="settingTabStacks"
                component={SettingTabStacks}
            />
        </TabStack.Navigator>
    );
});

export default TabStacks;

export const HomeTabStack =
    createNativeStackNavigator<THomeTabStacksParamList>();
const HomeTabStackScreen = HomeTabStack.Screen;
const HomeTabStacks: React.FC<IMainStacksProps> = React.memo(({navigation}) => {
    return (
        <HomeTabStack.Navigator screenOptions={{...DEFAULT_HEADER}}>
            <HomeTabStackScreen
                name="homeScreen"
                options={{
                    headerShown: true,
                    headerLeft: ({}) => {
                        return renderMenuIcon({navigation});
                    },
                }}
                component={HomeScreen}
            />
            {commonStacksCreator(HomeTabStack)}
        </HomeTabStack.Navigator>
    );
});

const SettingTabStack =
    createNativeStackNavigator<TSettingTabStacksParamList>();
const SettingTabStackScreen = SettingTabStack.Screen;
const SettingTabStacks: React.FC<IMainStacksProps> = React.memo(({id}) => {
    return (
        <SettingTabStack.Navigator screenOptions={{...DEFAULT_HEADER}}>
            <SettingTabStackScreen
                name="settingScreen"
                component={SettingScreen}
            />
        </SettingTabStack.Navigator>
    );
});

const NativeTabStack =
    createNativeStackNavigator<TTestNativeTabStacksParamList>();
const NativeTabStackScreen = NativeTabStack.Screen;
const NativeTabStacks: React.FC<IMainStacksProps> = React.memo(({id}) => {
    return (
        <NativeTabStack.Navigator screenOptions={{...DEFAULT_HEADER}}>
            <NativeTabStackScreen
                name="testNativeScreen"
                component={TestNativeScreen}
            />
        </NativeTabStack.Navigator>
    );
});

export function TestNativeStackCommon() {
    const navigation = useNavigation();
    return (
        <NativeTabStack.Group
            screenOptions={{
                ...DEFAULT_HEADER,
                headerShown: true,
                headerTitle: ({children}) => {
                    const result = getDataItemTitle(children);
                    return (
                        <Text className="h3 font-weight-bold text-primary">
                            {result}
                        </Text>
                    );
                },
                headerLeft: props => {
                    return (
                        <ButtonIcon
                            iconSize={30}
                            iconName="arrow-left"
                            onPress={() => {
                                navigation.goBack();
                            }}
                        />
                    );
                },
            }}>
            <NativeTabStackScreen
                name="testNativeMap"
                component={TestNativeMapScreen}
            />
            <NativeTabStackScreen
                name="testNativeKeyboard"
                component={TestNativeKeyboardScreen}
            />
        </NativeTabStack.Group>
    );
}
