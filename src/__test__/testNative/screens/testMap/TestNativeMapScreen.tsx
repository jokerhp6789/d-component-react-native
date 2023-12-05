import React from 'react';
import Button from '../../../../component/button/Button';
import Text from '../../../../component/text/Text';
import Layout from '../../../testLayout/Layout';
import NativeMapView from '../../components/mapView/NativeMapView';

export interface ITestNativeMapScreenProps {
    [key: string]: any;
}

const TestNativeMapScreen: React.FC<ITestNativeMapScreenProps> = ({id}) => {
    const region = {
        latitude: 37.48,
        longitude: -122.16,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    };
    return (
        <Layout>
            <NativeMapView
                style={{flex: 1}}
                zoomEnabled={false}
                region={region}
                onRegionChange={event => {
                    console.log(
                        '🚀 >>>>>> file: TestNative.tsx:26 >>>>>> event nativeEvent:',
                        event?.nativeEvent,
                    );
                }}
            />
            <Button
                onPress={() => {
                    // const node = findNodeHandle(TestNative as any);
                    // console.log(
                    //     '🚀 >>>>>> file: TestNative.tsx:37 >>>>>> node:',
                    //     node,
                    // );
                }}>
                Dispatch Native Method
            </Button>
        </Layout>
    );
};

export default TestNativeMapScreen;
