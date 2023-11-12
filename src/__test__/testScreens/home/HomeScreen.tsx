import React from 'react';
import {View} from 'react-native';
import Button from '../../../component/button/Button';
import Text from '../../../component/text/Text';
import {THomeScreenProps} from '../../testRoutes/navigator/IScreenProps';
import Layout from '../../testLayout/Layout';

export interface IHomeScreenProps extends THomeScreenProps {}

const HomeScreen: React.FC<IHomeScreenProps> = ({navigation, route}) => {
    return (
        <Layout className="px-4">
            <Text>Home Screen</Text>
            <Button
                onPress={() => {
                    navigation.navigate('testInputScreen');
                }}>
                Go To Style Screen
            </Button>
        </Layout>
    );
};

export default HomeScreen;
