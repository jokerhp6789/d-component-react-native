import React from 'react';
import {
    NativeSafeAreaViewProps,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import View from '../../component/view/View';
import {ColorKeyType} from '../../style/constant/AppColors';
import {getColorValue} from '../../style/modifier';
import {IStyleTransformerProps, styleTransformer} from '../../style/style';
import {useDarkMode} from '../../hooks/useStyle';
import {ThemeProps} from '../../interface/iTheme';

export interface ILayoutProps
    extends Partial<NativeSafeAreaViewProps>,
        ThemeProps {
    children: any;
    backgroundColor?: ColorKeyType;
    className?: IStyleTransformerProps;
}

const Layout: React.FC<ILayoutProps> = ({
    children,
    style,
    className,
    backgroundColor = 'white',
    colorDarkMode = 'dark',
}) => {
    const isDarkMode = useDarkMode();
    const insets = useSafeAreaInsets();
    return (
        <View
            style={[
                {
                    backgroundColor: isDarkMode
                        ? getColorValue(colorDarkMode)
                        : getColorValue(backgroundColor),
                    flex: 1,
                },
                styleTransformer(className),
                style,
            ]}>
            {children}
        </View>
    );
};

export default Layout;
