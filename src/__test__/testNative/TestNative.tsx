import React from 'react';
import {ScrollView, View} from 'react-native';
import Button from '../../component/button/Button';
import InputText from '../../component/input/InputText';
import Text from '../../component/text/Text';
import Sizes from '../../style/size/_size';
import {styleTransformer} from '../../style/style';
import Layout from '../testLayout/Layout';
import {TTestNativeScreenProps} from '../testRoutes/navigator/IScreenProps';
import {getDataItemTitle} from '../testRoutes/stacks/CommonStacks';
import DATA_SOURCE_NATIVE from './SourceNative';

export interface ITestNativeScreenProps extends TTestNativeScreenProps {}

const TestNativeScreen: React.FC<ITestNativeScreenProps> = ({navigation}) => {
    return (
        <Layout className="" edges={['bottom', 'top']}>
            <ScrollView>
                <InputText />
                <View
                    style={styleTransformer(
                        'px-4 flex-wrap flex-row gap-3 mt-4',
                    )}>
                    {DATA_SOURCE_NATIVE.map(dataItem => {
                        const labelItem = getDataItemTitle(dataItem?.label);
                        return (
                            <Button
                                onPress={() => {
                                    navigation.navigate(
                                        dataItem?.action as any,
                                    );
                                }}
                                className=""
                                height={100}
                                style={{
                                    width:
                                        (Sizes.screenWidth -
                                            2 * Sizes.paddingXLarge -
                                            Sizes.paddingMedium) /
                                        2,
                                }}>
                                <Text>{labelItem}</Text>
                            </Button>
                        );
                    })}
                </View>
                <View style={{height: 300}} />
            </ScrollView>
        </Layout>
    );
};

export default TestNativeScreen;
