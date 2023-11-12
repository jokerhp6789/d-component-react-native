import React, {useEffect} from 'react';
import {
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    ViewStyle,
} from 'react-native';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import {styleTransformer} from '../../../style/style';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

export type HandlerPositionType = 'top' | 'left' | 'right' | 'bottom';

export interface IResizableContainerProps {
    children?: any;
}

export interface IHandlerProps extends Partial<TouchableOpacityProps> {
    position?: HandlerPositionType;
}

const ResizableContainer: React.FC<IResizableContainerProps> = ({children}) => {
    const width = useSharedValue(100);

    useEffect(() => {
        setTimeout(() => {
            // width.value = withTiming(300, {duration: 200});
        }, 3000);
    }, []);

    const isPressed = useSharedValue(false);
    const offset = useSharedValue({x: 0, y: 0});

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: offset.value.x},
                {translateY: offset.value.y},
                {scale: withSpring(isPressed.value ? 1.2 : 1)},
            ],
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
        <GestureDetector gesture={gesture}>
            <Animated.View
                style={[
                    styleTransformer('bg-red border-2 border-black', {
                        height: 100,
                        width,
                        overflow: 'visible',
                    }),
                    animatedStyles,
                ]}>
                <Handler />
                {children}
            </Animated.View>
        </GestureDetector>
    );
};

export default ResizableContainer;

const Handler: React.FC<IHandlerProps> = ({position = 'right', ...rest}) => {
    const width = ['right', 'left'].includes(position) ? 15 : 25;
    const height = ['right', 'left'].includes(position) ? 25 : 15;

    const rightStyle: ViewStyle = {
        right: -width / 2,
        top: '50%',
        transform: [{translateY: -(height / 2)}],
    };

    return (
        <TouchableOpacity
            activeOpacity={0.95}
            style={styleTransformer('bg-dark absolute right-0 rounded-2', {
                width,
                height,
                ...rightStyle,
            })}
            {...rest}>
            <View />
        </TouchableOpacity>
    );
};
