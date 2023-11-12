import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';
import {TMainStacksParamList} from '../navigator/INavigator';
import DrawerStacks from './DrawerStacks';

export interface IMainStacksProps {
    [key: string]: any;
}

export interface ITabStacksProps {
    [key: string]: any;
}

export const DEFAULT_HEADER: Partial<NativeStackNavigationOptions> = {
    headerBackTitleVisible: false,
    headerShown: true,
};

export const MainStack = createNativeStackNavigator<TMainStacksParamList>();
export const MainStackScreen = MainStack.Screen;
export const MainStackGroup = MainStack.Group;

const MainStacks: React.FC<IMainStacksProps> = React.memo(({id}) => {
    return (
        <MainStack.Navigator screenOptions={{headerShown: false}}>
            <MainStackScreen
                name="drawerStacks"
                options={{headerShown: false}}
                component={DrawerStacks}
            />
        </MainStack.Navigator>
    );
});

export default MainStacks;
