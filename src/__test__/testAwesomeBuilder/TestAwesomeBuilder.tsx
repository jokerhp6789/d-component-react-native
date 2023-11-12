import React from 'react';
import {View} from 'react-native';
import {styleTransformer} from '../../style/style';
import FAB from './fab/FAB';
import Paper from './paper/Paper';
import ResizableContainer from './container/ResizableContainer';

export interface ITestAwesomeBuilderProps {
    [key: string]: any;
}

const TestAwesomeBuilder: React.FC<ITestAwesomeBuilderProps> = ({id}) => {
    return (
        <View style={styleTransformer('flex-1 w-100')}>
            <Paper>
                <ResizableContainer></ResizableContainer>
            </Paper>
        </View>
    );
};

export default TestAwesomeBuilder;
