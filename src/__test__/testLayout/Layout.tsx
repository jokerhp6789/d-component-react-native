import React, {useMemo} from 'react';
import {
    Edge,
    NativeSafeAreaViewProps,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import View from '../../component/view/View';
import {ColorKeyType} from '../../style/constant/AppColors';
import {getColorValue} from '../../style/modifier';
import {IStyleTransformerProps, styleTransformer} from '../../style/style';
import {useDarkMode} from '../../hooks/useStyle';
import {ThemeProps} from '../../interface/iTheme';
import {StyleProp, ViewStyle} from 'react-native';
export interface ILayoutProps
    extends Partial<NativeSafeAreaViewProps>,
        ThemeProps {
    children: any;
    backgroundColor?: ColorKeyType;
    useSafeArea?: boolean;
    className?: IStyleTransformerProps;
}

type TPaddingEdgeMapping = {
    edge: Edge;
    padding: string;
};

const PADDING_EDGES_MAPPING: TPaddingEdgeMapping[] = [
    {
        edge: 'top',
        padding: 'paddingTop',
    },
    {
        edge: 'bottom',
        padding: 'paddingBottom',
    },
    {
        edge: 'left',
        padding: 'paddingLeft',
    },
    {
        edge: 'right',
        padding: 'paddingRight',
    },
];

const Layout: React.FC<ILayoutProps> = ({
    children,
    style,
    className,
    backgroundColor = 'white',
    colorDarkMode = 'dark',
    edges,
}) => {
    const isDarkMode = useDarkMode();
    const insets = useSafeAreaInsets();
    const paddingStyle: StyleProp<ViewStyle> = useMemo(() => {
        if (Array.isArray(edges) && edges.length) {
            return edges.map(edge => {
                const paddingKey = PADDING_EDGES_MAPPING.find(
                    item => item?.edge === edge,
                )?.padding;
                return {
                    [`${paddingKey}`]: (insets as any)?.[`${edge}`],
                };
            });
        }
        return {};
    }, [edges, insets]);
    return (
        <View
            style={[
                {
                    backgroundColor: isDarkMode
                        ? getColorValue(colorDarkMode)
                        : getColorValue(backgroundColor),
                    flex: 1,
                },
                paddingStyle,
                styleTransformer(className),
                style,
            ]}>
            {children}
        </View>
    );
};

export default Layout;
