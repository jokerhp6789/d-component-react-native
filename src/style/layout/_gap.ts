import {StyleSheet} from 'react-native';
import {generateStyleValue} from '../modifier';
import {MARGIN_PADDING_VALUES} from './_padding-margin';

export const GAP_VARIATIONS = {
    g: 'gap',
    gap: 'gap',
    gy: 'rowGap',
    ['gap-y']: 'rowGap',
    ['gap-row']: 'rowGap',
    gx: 'columnGap',
    ['gap-x']: 'columnGap',
    ['gap-col']: 'columnGap',
};

const gapClass = generateStyleValue(GAP_VARIATIONS, MARGIN_PADDING_VALUES);

const gapStyle = StyleSheet.create({
    ...gapClass,
});

export default gapStyle;
