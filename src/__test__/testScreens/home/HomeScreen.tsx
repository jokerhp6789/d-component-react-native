import React from 'react';
import {View} from 'react-native';
import Button from '../../../component/button/Button';
import Text from '../../../component/text/Text';
import {THomeScreenProps} from '../../testRoutes/navigator/IScreenProps';

export interface IHomeScreenProps extends THomeScreenProps {}

const HomeScreen: React.FC<IHomeScreenProps> = ({navigation, route}) => {
    return (
        <View>
            <Text>Home Screen</Text>
            <Button
                onPress={() => {
                    navigation.navigate('testInputScreen');
                }}>
                Go To Style Screen
            </Button>
        </View>
    );
};

export default HomeScreen;
