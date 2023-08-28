import {StyleSheet} from 'react-native';
import Sizes from '../size/_size';
import {generateStyleValue} from '../modifier';

const {
    paddingTiny,
    paddingXTiny,
    paddingXXSml,
    paddingXSml,
    paddingXXMedium,
    paddingMedium,
    paddingLarge,
    paddingXLarge,
    paddingXXLarge,
    paddingXXXLarge = 26,
} = Sizes;

export const PADDING_KEY_PATTERN = new RegExp(`p[ltrbxy]?-([0-9]*)`);

export const PADDING_VARIATIONS = {
    p: 'padding',
    pl: 'paddingLeft',
    pt: 'paddingTop',
    pr: 'paddingRight',
    pb: 'paddingBottom',
    px: 'paddingHorizontal',
    py: 'paddingVertical',
};

const MARGIN_VARIATIONS = {
    m: 'margin',
    ml: 'marginLeft',
    mt: 'marginTop',
    mr: 'marginRight',
    mb: 'marginBottom',
    mx: 'marginHorizontal',
    my: 'marginVertical',
} as const;

export const MARGIN_PADDING_VALUES = {
    0: 0,
    ['0.5']: paddingXTiny,
    1: paddingTiny,
    ['1.5']: paddingXXSml,
    2: paddingXSml,
    ['2.5']: paddingXXMedium,
    3: paddingMedium,
    ['3.5']: paddingLarge,
    4: paddingXLarge,
    ['4.5']: paddingXXLarge,
    5: paddingXXXLarge,
    6: paddingXXXLarge + 4,
    7: paddingXXXLarge + 8,
    8: paddingXXXLarge + 12,
    9: paddingXXXLarge + 16,
    10: paddingXXXLarge + 20,
};

export type PaddingLiterals = keyof typeof PADDING_VARIATIONS;
export type NativePaddingKeyType = (typeof PADDING_VARIATIONS)[PaddingLiterals];
export type ValueLiterals = keyof typeof MARGIN_PADDING_VALUES;

const paddingClass = generateStyleValue(
    PADDING_VARIATIONS,
    MARGIN_PADDING_VALUES,
);

const marginClass = generateStyleValue(
    MARGIN_VARIATIONS,
    MARGIN_PADDING_VALUES,
);

const marginPadding = StyleSheet.create({
    ...paddingClass,
    ...marginClass,
});

export default marginPadding;
