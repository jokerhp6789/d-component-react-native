import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
} from 'react-native-reanimated';
import {styleTransformer} from '../../style/style';
import Text from '../../component/text/Text';

export interface ITestGestureHandlerProps {
    [key: string]: any;
}

const TestGestureHandler: React.FC<ITestGestureHandlerProps> = ({id}) => {
    const isPressed = useSharedValue(false);
    const offset = useSharedValue({x: 0, y: 0});

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: offset.value.x},
                {translateY: offset.value.y},
                {scale: withSpring(isPressed.value ? 1.2 : 1)},
            ],
            backgroundColor: isPressed.value ? 'yellow' : 'blue',
        };
    });

    const start = useSharedValue({x: 0, y: 0});
    const gesture = Gesture.Pan()
        .onBegin(() => {
            isPressed.value = true;
        })
        .onUpdate(e => {
            offset.value = {
                x: e.translationX + start.value.x,
                y: e.translationY + start.value.y,
            };
        })
        .onEnd(() => {
            start.value = {
                x: offset.value.x,
                y: offset.value.y,
            };
        })
        .onFinalize(() => {
            isPressed.value = false;
        });

    return (
        <View>
            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.ball, animatedStyles]} />
            </GestureDetector>
            <Text>Static View</Text>
        </View>
    );
};

export default TestGestureHandler;

const styles = StyleSheet.create({
    ball: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: 'blue',
        alignSelf: 'center',
    },
});
