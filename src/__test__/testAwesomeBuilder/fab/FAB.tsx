import React, {useEffect, useState} from 'react';
import {
    DeviceEventEmitter,
    StyleSheet,
    useWindowDimensions,
} from 'react-native';
import {
    HandlerStateChangeEvent,
    PanGestureHandler,
    State,
    TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import Icon from '../../../component/icon/Icon';
import Colors from '../../../style/color/_color';

/**
 * @name Constants
 *
 * @description
 * Constant values that are used with the FAB and SubButton
 */

/**
 * The starting position of the FAB. We keep it at 0
 * to because that is the relative position it starts
 * at once it is mounted.
 */
export const FAB_STARTING_POSITION = 0;

/**
 * FAB styling:
 * These will create a circle for us and
 * place it 30 points away from the edge of the screen.
 * Try changing the width value!
 */
export const FAB_WIDTH = 45;
export const FAB_HEIGHT = FAB_WIDTH;
export const FAB_BORDER_RADIUS = FAB_WIDTH / 2;
export const FAB_BACKGROUND_COLOR = Colors.primary;
export const FAB_PLUS_ICON_SIZE = 30;
export const FAB_MARGIN_RIGHT = 10;
export const FAB_MARGIN_BOTTOM = 75;

/**
 * FAB Animation Properties
 */
export const FAB_ROTATION_OPEN = 225;
export const FAB_CHILDREN_OPACITY_OPEN = 1;
export const FAB_CHILDREN_POSITION_Y_OPEN = 0;
export const FAB_PLUS_TRANSLATE_Y_OPEN = -3;

/**
 * FAB Children Container Animation Properties
 */
export const FAB_CHILDREN_OPACITY_CLOSE = 0;
export const FAB_CHILDREN_POSITION_Y_CLOSE = 30;
export const FAB_ROTATION_CLOSE = 0;
export const FAB_PLUS_TRANSLATE_Y_CLOSE = -2;

/**
 * SubButton Styling
 */
export const SUBBTN_WIDTH = FAB_WIDTH;
export const SUBBTN_HEIGHT = SUBBTN_WIDTH;
export const SUBBTN_BORDER_RADIUS = SUBBTN_WIDTH / 2;
export const SUBBTN_BACKGROUND_COLOR = Colors.primary;

/**
 * SubButton Press Event Listener Key
 */
export const TOUCH_BUTTON_EVENT = 'TOUCH_BUTTON_EVENT';

export interface IFABProps {
    [key: string]: any;
}

const FAB: React.FC<IFABProps> = ({children}) => {
    const [opened, setOpened] = useState(false);

    /**
     * Get the width of the screen. This hook dynamically updates
     * when the user rotates the screen too!
     */
    const {width} = useWindowDimensions();

    /**
     * (X,Y) position of the FAB. We use these
     * for keeping track of the button when dragging it.
     *
     * We also rotate the button to change the + to a x
     * when the children view is visible. The plus text is
     * also offset to accomodate for the anchor point of the
     * rotation not being in the center of the +
     */
    const fabPositionX = useSharedValue(0);
    const fabPositionY = useSharedValue(0);
    const fabRotation = useSharedValue(FAB_ROTATION_CLOSE);
    const fabPlusTranslateY = useSharedValue(FAB_PLUS_TRANSLATE_Y_CLOSE);

    /**
     * The opacity and Y position of the children container for the
     * SubButton(s). We use this to show a sliding fade in/out animation when
     * the user taps the FAB button
     */
    const childrenYPosition = useSharedValue(FAB_CHILDREN_POSITION_Y_CLOSE);
    const childrenOpacity = useSharedValue(FAB_CHILDREN_OPACITY_CLOSE);

    {
        /* // ****************** ANIMATED VALUES ********************* */
    }

    /**
     * The animated styles hook that is used in the
     * style prop for the root of the JSX below which holds
     * the FAB and SubButton(s). These values update depending
     * on the state of the fabPosition shared values.
     *
     * More info on the useAnimatedStyle hook here:
     * https://docs.swmansion.com/react-native-reanimated/docs/api/useAnimatedStyle
     */
    const animatedRootStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: fabPositionX.value},
                {translateY: fabPositionY.value},
            ],
        };
    });

    /**
     * The shared value of the button opacity. We change
     * the opacity when the button is being held down.
     */
    const buttonOpacity = useSharedValue(1);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            opacity: buttonOpacity.value,
        };
    }, [buttonOpacity.value]);

    useEffect(() => {
        let listener = DeviceEventEmitter.addListener(
            TOUCH_BUTTON_EVENT,
            () => {
                reduceButtonOpacity();
            },
        );
        return () => listener.remove();
    }, []);

    const reduceButtonOpacity = () => {
        setTimeout(() => {
            buttonOpacity.value = withTiming(0.5, {duration: 300});
        }, 5000);
    };

    const onTapHandlerStateChange = ({
        nativeEvent,
    }: HandlerStateChangeEvent<any>) => {
        switch (nativeEvent.state) {
            case State.BEGAN: {
                buttonOpacity.value = 0.5;
                break;
            }
            case State.END: {
                DeviceEventEmitter.emit(TOUCH_BUTTON_EVENT);
                buttonOpacity.value = 1.0;
                setOpened(true);
                break;
            }
            case State.CANCELLED: {
                buttonOpacity.value = 1.0;
                break;
            }
            case State.FAILED: {
                DeviceEventEmitter.emit(TOUCH_BUTTON_EVENT);
                buttonOpacity.value = 1.0;
                break;
            }
            case State.UNDETERMINED: {
                buttonOpacity.value = 1.0;
                break;
            }
        }
    };

    const onPanHandlerStateChange = useAnimatedGestureHandler<any, any>({
        onStart: (event, ctx) => {
            ctx.startX = fabPositionX.value;
            ctx.startY = fabPositionY.value;
        },
        onActive: (event, ctx) => {
            fabPositionX.value = ctx.startX + event.translationX;
            fabPositionY.value = ctx.startY + event.translationY;
        },
        onEnd: (event, ctx) => {
            if (fabPositionX.value > -width / 2) {
                fabPositionX.value = withSpring(FAB_STARTING_POSITION);
                fabPositionY.value = withSpring(
                    ctx.startY + event.translationY,
                );
            } else {
                fabPositionX.value = withSpring(
                    -width + FAB_WIDTH + FAB_MARGIN_BOTTOM * 2,
                );
                fabPositionY.value = withSpring(
                    ctx.startY + event.translationY,
                );
            }
        },
    });

    return (
        <PanGestureHandler onHandlerStateChange={onPanHandlerStateChange}>
            <Animated.View style={[styles.rootStyles, animatedRootStyles]}>
                <TapGestureHandler
                    onHandlerStateChange={onTapHandlerStateChange}>
                    <Animated.View
                        style={[styles.fabButtonStyles, animatedStyles]}>
                        <Animated.View>
                            <Icon name="chat" />
                        </Animated.View>
                    </Animated.View>
                </TapGestureHandler>
            </Animated.View>
        </PanGestureHandler>
    );
};

export default FAB;

export const styles = StyleSheet.create({
    rootStyles: {
        borderRadius: FAB_BORDER_RADIUS,
        position: 'absolute',
        bottom: FAB_MARGIN_BOTTOM,
        right: FAB_MARGIN_RIGHT,
    },
    fabButtonStyles: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: FAB_BACKGROUND_COLOR,
        width: FAB_WIDTH,
        height: FAB_HEIGHT,
        borderRadius: FAB_BORDER_RADIUS,
    },
    childrenStyles: {
        width: FAB_WIDTH,
        alignItems: 'center',
        marginBottom: 20,
    },
    // plus: {
    //     fontSize: FAB_PLUS_ICON_SIZE,
    //     color: "#EFFBFA",
    // },
});
