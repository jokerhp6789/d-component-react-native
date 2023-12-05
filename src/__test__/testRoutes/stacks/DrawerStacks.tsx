import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {TDrawerStacksParamList} from '../navigator/INavigator';
import {commonStacksCreator} from './CommonStacks';
import TabStacks, {renderMenuIcon, testNativeStackCommon} from './TabStacks';
import Icon from '../../../component/icon/Icon';
import Header from '../../../component/header/Header';
import {View} from 'react-native';

export interface IDrawerStacksProps {
    [key: string]: any;
}

const DrawerStack = createDrawerNavigator<TDrawerStacksParamList>();
const DrawerScreen = DrawerStack.Screen;

const DrawerStacks: React.FC<IDrawerStacksProps> = ({navigation}) => {
    return (
        <DrawerStack.Navigator
            screenOptions={{
                headerStyle: {},
                headerShown: false,
                // headerStatusBarHeight: 0,
                // headerBackground: () => {
                //     return (
                //         <View style={{backgroundColor: 'green', height: 50}} />
                //     );
                // },
                // header: () => <Header />,
                drawerContentContainerStyle: {
                    paddingBottom: 100,
                    paddingTop: 75,
                },
            }}>
            <DrawerScreen name="homeTab" component={TabStacks} />
            {commonStacksCreator<any>(DrawerStack)}
            {testNativeStackCommon()}
        </DrawerStack.Navigator>
    );
};

export default DrawerStacks;
