import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ProgressComponent from '../../../component/progress/ProgressComponent';

export interface IPublicStacksProps {
    [key: string]: any;
}

const PublicStack = createNativeStackNavigator<any>();
const PublicStackScreen = PublicStack.Screen;
const PublicStackGroup = PublicStack.Group;

export default (
    <PublicStackGroup screenOptions={{headerShown: false}}>
        <PublicStackScreen name="progress" component={ProgressComponent} />
    </PublicStackGroup>
);
