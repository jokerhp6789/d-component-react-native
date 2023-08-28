/** @format */

import Colors from '../style/color/_color';
import Sizes from '../style/size/_size';
import Fonts from '../style/font/_font';
import Configs from '../style/config/_config';

Colors.loadColors({
    primary: 'red',
    inputColorFocus: 'green',
    inputColorDark: 'yellow',
});
//@ts-ignore
// Sizes.loadSizes({ buttonHeight: 20 });
Fonts.loadFonts({
    iosFont: 'Prompt-Regular',
    baseFontSize: 12,
    label: {
        fontWeight: '500',
    },
    locale: {
        en: 'Poppins-Regular',
        th: 'Prompt-Regular',
    } as any,
});

Configs.loadConfigs({
    inputConfig: {variant: 'rounded'},
    buttonConfig: {shape: 'rounded', variant: 'outline'},
    generalConfig: {autoSwitchColor: true},
});
