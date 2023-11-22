/** @format */

import Colors from '../style/color/_color';
import Sizes from '../style/size/_size';
import Fonts from '../style/font/_font';
import Configs from '../style/config/_config';
import {Platform} from 'react-native';

Colors.loadColors({
    primary: '#E95504' as any,
    inputColorDark: 'yellow',
});
Sizes.loadSizes({buttonHeight: 40, inputHeight: 40});
Fonts.loadFonts({
    ios: {
        normal: 'Poppins-Regular',
        bold: 'Poppins-Bold',
    },
    android: {
        normal: 'Poppins-Regular',
        bold: 'Poppins-Bold',
    },
    baseFontSize: 12,
    label: {
        fontWeight: '500',
    },
    locale: {
        en: {
            ios: {
                normal: 'Poppins-Regular',
                bold: 'Poppins-Bold',
            },
            android: {
                normal: 'Poppins-Regular',
                bold: 'Poppins-Bold',
            },
            // default value
            normal: 'Poppins-Regular',
            bold: 'Poppins-Bold',
        },
        th: {
            ios: {
                normal: 'Prompt-Regular',
                bold: 'Prompt-Bold',
            },
            android: {
                normal: 'Prompt-Regular',
                bold: 'Prompt-Bold',
            },
            // default value
            normal: 'Prompt-Regular',
            bold: 'Prompt-Bold',
        },
    } as any,
});

Configs.loadConfigs({
    inputConfig: {variant: 'rounded'},
    buttonConfig: {shape: 'rounded', variant: 'outline'},
    generalConfig: {autoSwitchColor: true},
    awesomeListConfig: {useFlashList: true, pageSize: 50},
    selectConfig: {listProps: {useFlashList: false}},
});
