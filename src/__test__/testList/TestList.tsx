import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {Divider, Image} from '../..';
import AwesomeList from '../../component/list/awesomeList/AwesomeList';
import AwesomeListMode from '../../component/list/awesomeList/AwesomeListMode';
import Text from '../../component/text/Text';
import View from '../../component/view/View';
import images from '../testImage/Images';

export interface ITestListProps {
    [key: string]: any;
}

export interface IListFooterComponentProps {
    className?: string;
}

const ListFooterComponent: React.FC<IListFooterComponentProps> = ({
    className,
}) => {
    return (
        <View
            className={`w-100 align-items-center justify-content-center py-5 ${className}`}>
            <Image
                source={images.birthdayCake}
                className="width-50 height-50"
            />
            <Text className="text-disabled text-center mt-3">
                You are Up to date!
            </Text>
        </View>
    );
};

const TestList: React.FC<ITestListProps> = ({id}) => {
    const renderItem = useCallback(({item, index}: any) => {
        return (
            <View className="py-3">
                <Text>123</Text>
            </View>
        );
    }, []);

    const renderList = () => {
        return (
            <AwesomeList
                useFlashList
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <Divider color="green" />}
                source={() => Promise.resolve(new Array(1000).fill(0))}
                transformer={res => res}
                renderFooterComponent={({loading, emptyMode}) => {
                    return <ListFooterComponent />;
                }}
                keyExtractor={(item, index) => `${index}`}
                hideFooterInEmptyErrorMode
                emptyViewStyle={{
                    paddingVertical: 100,
                    width: '100%',
                    height: '100%',
                    // position:"relative"
                }}
            />
        );
    };

    return <View style={{flex: 1, width: '100%'}}>{renderList()}</View>;
};

export default TestList;
