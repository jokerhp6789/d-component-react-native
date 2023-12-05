import React from 'react';
import Button from '../../../../component/button/Button';
import Layout from '../../../testLayout/Layout';
import KeyboardTrackingView from '../../components/keyboardView/KeyboardTracking/KeyboardTrackingView';

export interface ITestNativeKeyboardScreenProps {
    [key: string]: any;
}

const TestNativeKeyboardScreen: React.FC<ITestNativeKeyboardScreenProps> = ({
    id,
}) => {
    return (
        <Layout>
            <Button onPress={() => {}}>Test Keyboard Native</Button>
            <KeyboardTrackingView />
        </Layout>
    );
};

export default TestNativeKeyboardScreen;
