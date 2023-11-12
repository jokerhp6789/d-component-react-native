/** @format */

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {TRootStacksParamList} from './navigator/INavigator';
import MainStacks from './stacks/MainStacks';
import PublicStacks from './stacks/PublicStacks';
import DrawerStacks from './stacks/DrawerStacks';

export const RootStack = createNativeStackNavigator<TRootStacksParamList>();
export const RootStackScreen = RootStack.Screen;

/* Routes ==================================================================== */

const Routes = () => {
    return (
        <RootStack.Navigator
            screenOptions={{headerShown: false, orientation: 'portrait'}}
            initialRouteName="splashScreen">
            <RootStackScreen
                name="mainStacks"
                options={{headerShown: false}}
                component={DrawerStacks}
            />
            {PublicStacks}
        </RootStack.Navigator>
    );
};

export default Routes;
