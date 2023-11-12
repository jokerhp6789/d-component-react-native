import React, {useContext, useMemo} from 'react';
import IconFeature from 'react-native-vector-icons/Feather';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import FontAwesome6Pro from 'react-native-vector-icons/FontAwesome6Pro';
import IconFoundation from 'react-native-vector-icons/Foundation';
import {IconProps} from 'react-native-vector-icons/Icon';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconZocial from 'react-native-vector-icons/Zocial';
import StyleStateContext, {
    IStyleStateContext,
} from '../../context/StyleContext';
import {ThemeProps} from '../../interface/iTheme';
import {ColorKeyType} from '../../style/constant/AppColors';
import {getColorValue} from '../../style/modifier';
import Sizes from '../../style/size/_size';
import {
    IStyleTransformerProps,
    getStyleProps,
    styleTransformer,
} from '../../style/style';
import TouchableOpacity from '../view/TouchableOpacity';

export declare type IconType =
    | 'material'
    | 'material-community'
    | 'simple-line-icon'
    | 'zocial'
    | 'font-awesome'
    | 'feather'
    | 'octicon'
    | 'ionicon'
    | 'foundation'
    | 'evilicon'
    | 'entypo'
    | 'antdesign'
    | 'font-awesome-5'
    | 'font-awesome-5-pro'
    | 'font-awesome-6'
    | 'font-awesome-6-pro';

export interface IIconProps
    extends Omit<IconProps, 'color'>,
        Omit<ThemeProps, 'useLightColor'> {
    color?: ColorKeyType;
    className?: string;
    type?: IconType;
    /**
     * className for the TouchableOpacity component wrap outside of the icon,
     * only available when the onPress props has truthy value.
     */
    classNameWrapper?: IStyleTransformerProps;
}

const Icon: React.FC<IIconProps> = ({
    name,
    type,
    style,
    color,
    colorDarkMode,
    size = Sizes.iconSize,
    classNameWrapper,
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    ...rest
}) => {
    const transStyle = getStyleProps(rest);
    const {colorSchema} =
        useContext<IStyleStateContext>(StyleStateContext) || {};
    const isDarkMode = colorSchema === 'dark';
    const colorIcon = useMemo(() => {
        if (isDarkMode && colorDarkMode) {
            return getColorValue(colorDarkMode);
        }
        return getColorValue(color as any);
    }, [color, isDarkMode]);
    const props: IIconProps = {
        style: [transStyle as any, style],
        name,
        type,
        color: colorIcon,
        size,
        ...rest,
    };
    let icon = <IconMaterialIcons {...props} />;
    switch (type) {
        case 'material-community':
            icon = <IconMaterialCommunityIcons {...props} />;
            break;
        case 'simple-line-icon':
            icon = <IconSimpleLineIcons {...props} />;
            break;
        case 'zocial':
            icon = <IconZocial {...props} />;
            break;
        case 'font-awesome':
            icon = <IconFontAwesome {...props} />;
            break;
        case 'octicon':
            icon = <IconOcticons {...props} />;
            break;
        case 'ionicon':
            icon = <IconIonicons {...props} />;
            break;
        case 'foundation':
            icon = <IconFoundation {...props} />;
            break;
        case 'feather':
            icon = <IconFeature {...props} />;
            break;
        case 'evilicon':
            icon = <IconEvilIcons {...props} />;
            break;
        case 'entypo':
            icon = <IconEntypo {...props} />;
            break;
        case 'antdesign':
            icon = <IconAntDesign {...props} />;
            break;
        case 'font-awesome-5':
            icon = <FontAwesome5 {...props} />;
            break;
        case 'font-awesome-5-pro':
            icon = <FontAwesome5Pro {...props} />;
            break;
        // case 'font-awesome-6':
        //     icon = <FontAwesome6 {...props} />;
        // break;
        // case 'font-awesome-6-pro':
        //     icon = <FontAwesome6Pro {...props} />;
        //     break;
        default:
            icon = <IconMaterialIcons {...props} />;
            break;
    }
    if (onPress) {
        return (
            <TouchableOpacity
                onPress={onPress as any}
                onPressIn={onPressIn as any}
                onPressOut={onPressOut as any}
                onLongPress={onPressIn as any}
                colorDarkMode="transparent"
                style={styleTransformer(
                    `p-1 rounded-pill ${classNameWrapper}`,
                )}>
                {icon}
            </TouchableOpacity>
        );
    }

    return icon;
};

export default Icon;
