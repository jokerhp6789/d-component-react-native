import React from 'react';
import Text from '../../component/text/Text';
import Layout from '../testLayout/Layout';
import NativeMapView from './nativeComponent/NativeMapView';

export interface ITestNativeProps {
    [key: string]: any;
}

const TestNative: React.FC<ITestNativeProps> = ({id}) => {
    const region = {
        latitude: 37.48,
        longitude: -122.16,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    };
    return (
        <Layout>
            <Text>Test Native</Text>
            <NativeMapView
                style={{flex: 1}}
                zoomEnabled={false}
                region={region}
            />
        </Layout>
    );
};

export default TestNative;
