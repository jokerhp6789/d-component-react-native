import React from 'react';
import ScrollView from '../../component/view/ScrollView';
import View from '../../component/view/View';
import Text from '../../component/text/Text';
import {map} from 'lodash';

export interface ITestStyleProps {
    [key: string]: any;
}

const TestStyle: React.FC<ITestStyleProps> = ({id}) => {
    return (
        <ScrollView className="w-100">
            <View className="w-100 justify-content-center align-center">
                <View
                    className="width-50 height-50  border-dashed border-primary my-3"
                    colorDarkMode="red"
                />
                <Text className="h5 label font-weight-bold">
                    width-50 height-50 border-dashed border-primary my-3
                    width-50 height-50 border-dashed border-primary my-3
                    width-50 height-50 border-dashed border-primary my-3
                </Text>
            </View>
            <View style={{gap: 10}} className="bg-green flex-row my-3">
                {map(new Array(10).fill(0), item => (
                    <View
                        className="flex-1"
                        style={{backgroundColor: 'red', height: 10}}
                    />
                ))}
            </View>
        </ScrollView>
    );
};

export default TestStyle;
