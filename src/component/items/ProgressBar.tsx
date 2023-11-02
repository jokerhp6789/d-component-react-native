import React, {useContext, useMemo} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import StyleStateContext, {
    IStyleStateContext,
} from '../../context/StyleContext';
import {ColorKeyType} from '../../style/constant/AppColors';
import {getColorValue} from '../../style/modifier';
import {IStyleTransformerProps, styleTransformer} from '../../style/style';

export interface IProgressBarProps {
    variant?: 'line' | 'circel' | 'dashboard';
    size?: 'medium' | 'large' | 'small' | 'x-large' | 'x-small';
    strokeColor?: ColorKeyType;
    strokeColorDarkMode?: ColorKeyType;
    trailColor?: ColorKeyType;
    trailColorDarkMode?: ColorKeyType;
    className?: IStyleTransformerProps;
    classNameStroke?: IStyleTransformerProps;
    style?: ViewStyle;
    percent?: number;
    showInfo?: boolean;
    height?: number;
    rounded?: boolean;
}

const ProgressBar: React.FC<IProgressBarProps> = ({
    variant = 'line',
    size,
    strokeColor = 'primary',
    strokeColorDarkMode,
    trailColor = 'grayLight',
    trailColorDarkMode,
    className,
    classNameStroke,
    style,
    percent = 0,
    showInfo,
    height = 10,
    rounded = true,
}) => {
    const {colorSchema} =
        useContext<IStyleStateContext>(StyleStateContext) || {};
    const isDarkMode = colorSchema === 'dark';
    const bgColor = isDarkMode
        ? getColorValue(trailColorDarkMode) || getColorValue(trailColor as any)
        : getColorValue(trailColor as any);
    const lineColor = isDarkMode
        ? getColorValue(strokeColorDarkMode) ||
          getColorValue(strokeColor as any)
        : getColorValue(strokeColor as any);
    const wrapperClass = styleTransformer(
        `flex-center-y`,
        {
            'rounded-2': rounded,
        },
        className,
    );

    const strokeClass = styleTransformer(
        ``,
        {
            'rounded-2': rounded,
        },
        classNameStroke,
    );

    const trailWidth = useMemo(() => {
        switch (size) {
            case 'x-large':
                return 150;
            case 'large':
                return 125;
            case 'medium':
                return 100;
            case 'small':
                return 75;

            default:
                return 50;
        }
    }, [size]);
    const strokeWidth = useMemo(() => {
        return percent * trailWidth;
    }, [percent, trailWidth]);

    const wrapperStyle: StyleProp<ViewStyle> = [
        {backgroundColor: bgColor, width: trailWidth, height},
        style || {},
    ];
    const strokeStyle: StyleProp<ViewStyle> = [
        {width: strokeWidth, backgroundColor: lineColor, height},
    ];

    return (
        <View style={[wrapperClass, wrapperStyle]}>
            <View style={[strokeClass, strokeStyle]} />
        </View>
    );
};

export default ProgressBar;
