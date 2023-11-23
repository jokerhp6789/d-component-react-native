import React, {useCallback, useRef, ElementRef} from 'react';
import Button from '../../component/button/Button';
import Image from '../../component/image/Image';
import Divider from '../../component/items/Divider';
import AwesomeList from '../../component/list/awesomeList/AwesomeList';
import AwesomeListMode from '../../component/list/awesomeList/AwesomeListMode';
import Text from '../../component/text/Text';
import View from '../../component/view/View';
import StringUtils from '../../utils/StringUtils';
import images from '../testImage/Images';
import Layout from '../testLayout/Layout';

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
    const listRef = useRef<ElementRef<typeof AwesomeList>>(null);

    const renderItem = useCallback(
        ({item, index}: any) => {
            return (
                <View className="py-3 flex-center-y">
                    <Text className="flex-1">{item?.label}</Text>
                    <Button
                        onPress={() => {
                            listRef.current &&
                                listRef.current.moveItemToTop(item?.id, {
                                    updateBeforeMove: true,
                                    getValue: item => ({
                                        ...item,
                                        label: `Item Updated ${new Date()}`,
                                    }),
                                });
                            console.log(
                                'AWESOME LIST STATE :',
                                listRef.current?.state,
                            );
                        }}>
                        Move to top
                    </Button>
                </View>
            );
        },
        [listRef],
    );

    const renderList = () => {
        return (
            <AwesomeList
                useFlashList
                ref={listRef}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <Divider color="green" />}
                source={async () => {
                    const data = await Promise.resolve(new Array(10).fill(0));
                    return data.map(() => ({
                        id: StringUtils.getUniqueID(),
                        label: StringUtils.generateDummyText(undefined, 5),
                    }));
                }}
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
                flashListProps={{estimatedItemSize: 50}}
                onUpdateSate={state => {
                    console.log(
                        '🚀 >>>>>> file: TestList.tsx:95 >>>>>> renderList >>>>>> state:',
                        state,
                    );
                }}
            />
        );
    };

    return (
        <Layout className="px-4">
            <Button
                onPress={() => {
                    listRef.current &&
                        listRef.current.pushData(
                            [
                                {
                                    id: StringUtils.getUniqueID(),
                                    label: `Item Added ${new Date()}`,
                                },
                            ],
                            'start',
                        );
                }}>
                Add Item
            </Button>
            {renderList()}
        </Layout>
    );
};

export default TestList;
