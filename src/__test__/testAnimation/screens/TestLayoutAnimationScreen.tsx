import React from 'react';
import {View} from 'react-native';
import Animated, {
    LayoutAnimationAndConfig,
    LayoutAnimation,
    LayoutAnimationFunction,
    PinwheelIn,
    PinwheelOut,
} from 'react-native-reanimated';

import Text from '../../../component/text/Text';
import Layout from '../../testLayout/Layout';

export interface ITestLayoutAnimationScreenProps {
    [key: string]: any;
}

const TestLayoutAnimationScreen: React.FC<ITestLayoutAnimationScreenProps> = ({
    id,
}) => {
    const [show, setShow] = React.useState(true);
    const [outer, setOuter] = React.useState(true);
    const [inner, setInner] = React.useState(true);

    return (
        <Layout>
            {/* <Text>TestLayoutAnimationScreen</Text>
            <View>
                {show && (
                    <Animated.View
                        entering={PinwheelIn}
                        exiting={PinwheelOut}
                    />
                )}
            </View> */}

            {/* <View style={styles.container}>
                <View style={styles.buttonColumn}>
                    <Button
                        onPress={() => {
                            setOuter(!outer);
                        }}
                        title={toggleString(outer) + ' outer'}
                    />
                    <Button
                        disabled={!outer}
                        onPress={() => {
                            setInner(!inner);
                        }}
                        title={toggleString(inner) + ' inner'}
                    />
                </View>
                <LayoutAnimationFunction skipEntering>
                    {outer && (
                        <Animated.View
                            entering={PinwheelIn}
                            exiting={PinwheelOut}
                            style={styles.outerBox}>
                            <LayoutAnimationConfig skipEntering skipExiting>
                                {inner && (
                                    <Animated.View
                                        style={styles.box}
                                        entering={PinwheelIn}
                                        exiting={PinwheelOut}
                                    />
                                )}
                            </LayoutAnimationConfig>
                        </Animated.View>
                    )}
                </LayoutAnimationFunction>
            </View> */}
        </Layout>
    );
};

export default TestLayoutAnimationScreen;
