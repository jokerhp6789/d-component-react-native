import React from 'react';
import {View} from 'react-native';
import Animated from 'react-native-reanimated';
import Button from '../../../component/button/Button';
import {styleTransformer} from '../../../style/style';
import Layout from '../../testLayout/Layout';
import {
    TTestShareTransactionDetailScreenProps,
    TTestShareTransactionScreenProps,
} from '../../testRoutes/navigator/IScreenProps';

export interface ITestShareTransactionScreenProps
    extends TTestShareTransactionScreenProps {}

export interface ITestShareTransactionDetailScreenProps
    extends TTestShareTransactionDetailScreenProps {}

const TestShareTransactionScreen: React.FC<
    ITestShareTransactionScreenProps
> = ({navigation}) => {
    return (
        <Layout
            edges={['bottom', 'top']}
            style={styleTransformer('flex-1 items-center pt-[200]')}>
            <Button
                className="mb-3"
                label="Go to Details"
                onPress={() =>
                    navigation.navigate('testShareTransactionDetailScreen')
                }
            />
            <Animated.Image
                source={{uri: 'https://picsum.photos/id/39/200'}}
                style={{width: 300, height: 300}}
                sharedTransitionTag="sharedTransitionTag"
            />
        </Layout>
    );
};

export const TestShareTransactionDetailScreen: React.FC<
    ITestShareTransactionDetailScreenProps
> = ({navigation}) => {
    return (
        <Layout
            edges={['bottom', 'top']}
            style={styleTransformer('flex-1 items-center pt-[200]')}>
            <Button
                className="mb-3"
                label="Go back"
                onPress={() => navigation.goBack()}
            />
            <Animated.Image
                source={{uri: 'https://picsum.photos/id/39/200'}}
                style={{width: 500, height: 500}}
                sharedTransitionTag="sharedTransitionTag"
            />
        </Layout>
    );
};

export default TestShareTransactionScreen;
