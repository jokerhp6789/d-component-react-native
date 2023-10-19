import {StyleSheet} from 'react-native';
import {generateStyleValue} from '../modifier';
import {MARGIN_PADDING_VALUES} from './_padding-margin';

export const GAP_VARIATIONS = {
    g: 'gap',
    gap: 'gap',

    gy: 'columnGap',
    ['gap-y']: 'columnGap',
    ['gap-col']: 'columnGap',
    ['g-col']: 'columnGap',

    gx: 'rowGap',
    ['gap-row']: 'rowGap',
    ['g-row']: 'rowGap',
    ['gap-x']: 'rowGap',
};

const gapClass = generateStyleValue(GAP_VARIATIONS, MARGIN_PADDING_VALUES);

const gapStyle = StyleSheet.create({
    ...gapClass,
});

export default gapStyle;
