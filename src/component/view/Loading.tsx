/* eslint-disable class-methods-use-this */
import React, {useMemo} from 'react';
import {
    ActivityIndicator,
    ActivityIndicatorProps,
    StyleProp,
    StyleSheet,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import AppSizes from '../../style/size/_size';
import Text from '../text/Text';

export interface ILoadingProps {
    style?: StyleProp<ViewStyle>;
    styleContainer?: StyleProp<ViewStyle>;
    styleText?: StyleProp<TextStyle>;
    showContainer?: boolean;
    loadingText?: string;
    activityProps?: Partial<ActivityIndicatorProps>;
    customActivityView?: (() => React.ReactNode) | React.ReactNode;
}

const Loading: React.FC<ILoadingProps> = ({
    style,
    styleText,
    styleContainer,
    showContainer,
    loadingText,
    activityProps = {},
    customActivityView,
}) => {
    const activityView = useMemo(() => {
        if (customActivityView) {
            return typeof customActivityView === 'function'
                ? customActivityView()
                : customActivityView;
        }
        return <ActivityIndicator {...activityProps} />;
    }, [activityProps]);

    const loadingView = useMemo(() => {
        return (
            <View style={[styles.loadingContainer, style]}>
                {activityView}
                {loadingText && (
                    <Text
                        className="h5"
                        style={[
                            styles.textLoading,
                            {color: 'white'},
                            styleText,
                        ]}>
                        {loadingText}
                    </Text>
                )}
            </View>
        );
    }, [activityView, style, styleText, loadingText]);

    if (showContainer) {
        return (
            <View style={[styles.container, styleContainer]}>
                {loadingView}
            </View>
        );
    }
    return loadingView;
};

export default Loading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },

    loadingContainer: {
        backgroundColor: 'transparent',
        padding: AppSizes.paddingXXSml,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
    },

    textLoading: {
        paddingLeft: AppSizes.paddingMedium,
        paddingTop: AppSizes.padding,
        paddingBottom: AppSizes.padding,
        fontSize: AppSizes.fontXXMedium,
        textAlign: 'center',
        justifyContent: 'center',
    },
});
