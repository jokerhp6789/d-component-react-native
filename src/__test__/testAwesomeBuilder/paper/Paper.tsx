import React from 'react';
import {View} from 'react-native';
import {styleTransformer} from '../../../style/style';

export interface IPaperProps {
    children?: any;
}

const Paper: React.FC<IPaperProps> = ({children}) => {
    return (
        <View style={styleTransformer('flex-1 bg-white p-3', {})}>
            {children}
        </View>
    );
};

export default Paper;
