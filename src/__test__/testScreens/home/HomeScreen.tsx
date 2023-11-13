import React from 'react';
import {ScrollView, View} from 'react-native';
import Button from '../../../component/button/Button';
import Text from '../../../component/text/Text';
import {THomeScreenProps} from '../../testRoutes/navigator/IScreenProps';
import Layout from '../../testLayout/Layout';
import DATA_SOURCE from '../../Source';
import {TouchableOpacity} from 'react-native';
import {getDataItemTitle} from '../../testRoutes/stacks/CommonStacks';
import Sizes from '../../../style/size/_size';
import {styleTransformer} from '../../../style/style';

export interface IHomeScreenProps extends THomeScreenProps {}

const HomeScreen: React.FC<IHomeScreenProps> = ({navigation, route}) => {
    return (
        <Layout className="">
            <ScrollView>
                <View style={styleTransformer('px-4 flex-wrap flex-row gap-3 mt-4')}>
                    {DATA_SOURCE.map(dataItem => {
                        const labelItem = getDataItemTitle(dataItem?.label);
                        return (
                            <Button
                                onPress={() =>
                                    navigation.navigate(dataItem?.action)
                                }
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

export default HomeScreen;
