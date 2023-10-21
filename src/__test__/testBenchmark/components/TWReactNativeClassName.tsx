import React from 'react';
import {View} from 'react-native';
import tw from 'twrnc';

export interface ITWReactNativeClassNameProps {
    [key: string]: any;
}

const TWReactNativeClassName: React.FC<ITWReactNativeClassNameProps> = ({
    id,
}) => {
    return (
        <View style={tw.style('flex-row align-items-center')}>
            {new Array(1000).fill(0).map((_, i) => (
                <View key={i} style={tw.style('p-2 border border-red-500')} />
            ))}
        </View>
    );
};

export default TWReactNativeClassName;
