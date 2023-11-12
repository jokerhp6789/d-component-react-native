import React from 'react';
import {View} from 'react-native';
import Text from '../../../component/text/Text';

export interface ISettingScreenProps {
    [key: string]: any;
}

const SettingScreen: React.FC<ISettingScreenProps> = ({id}) => {
    return (
        <View>
            <Text>Home Screen</Text>
        </View>
    );
};

export default SettingScreen;
