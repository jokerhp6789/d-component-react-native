import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import Button from '../../component/button/Button';
import Text from '../../component/text/Text';
import {styleTransformer} from '../../style/style';
import Layout from '../testLayout/Layout';
import {TTestAnimationScreenProps} from '../testRoutes/navigator/IScreenProps';
import {getDataItemTitle} from '../testRoutes/stacks/CommonStacks';
import DATA_SOURCE_ANIMATION from './SourceAnimation';

export interface ITestAnimationScreenProps extends TTestAnimationScreenProps {}

const TestAnimationScreen: React.FC<ITestAnimationScreenProps> = ({
    navigation,
    route,
}) => {
    const renderItem = useCallback(({item, index}: any) => {
        const labelItem = getDataItemTitle(item?.label);
        return (
            <Button
                onPress={() => {
                    navigation.navigate(item?.action as any);
                }}
                className=""
                height={100}
                style={styleTransformer('flex-1 m-2')}>
                <Text>{labelItem}</Text>
            </Button>
        );
    }, []);

    return (
        <Layout className="" edges={['top']}>
            <FlatList
                data={DATA_SOURCE_ANIMATION}
                renderItem={renderItem}
                numColumns={2}
                automaticallyAdjustContentInsets
            />
        </Layout>
    );
};

export default TestAnimationScreen;
