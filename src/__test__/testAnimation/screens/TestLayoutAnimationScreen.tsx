import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
    LayoutAnimationConfig,
    LayoutAnimation,
    LayoutAnimationFunction,
    PinwheelIn,
    PinwheelOut,
} from 'react-native-reanimated';
import Button from '../../../component/button/Button';

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

            <View style={styles.container}>
                <View style={styles.buttonColumn}>
                    <Button
                        onPress={() => {
                            setOuter(!outer);
                        }}
                        label={toggleString(outer) + ' outer'}
                    />
                    <Button
                        disabled={!outer}
                        onPress={() => {
                            setInner(!inner);
                        }}
                        label={toggleString(inner) + ' inner'}
                    />
                </View>
                <LayoutAnimationConfig skipEntering>
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
                </LayoutAnimationConfig>
            </View>
        </Layout>
    );
};

export default TestLayoutAnimationScreen;

function toggleString(value: any) {
    return value ? 'Hide' : 'Show';
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 220,
    },
    buttonColumn: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 90,
    },
    outerBox: {
        width: 150,
        height: 150,
        backgroundColor: '#b58df1',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        margin: 20,
    },
    box: {
        width: 80,
        height: 80,
        backgroundColor: '#782aeb',
    },
});
