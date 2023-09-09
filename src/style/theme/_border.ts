/* eslint-disable import/prefer-default-export */
import {StyleSheet, Platform} from 'react-native';
import Colors from '../color/_color';
import Sizes from '../size/_size';
import {generateStyleValue} from '../modifier';

const {
    borderTiny,
    borderMedium,
    borderSmall,
    borderLarge,
    borderXLarge,
    borderRadiusTiny,
    borderRadiusSmall,
    borderRadiusMedium,
    borderRadiusLarge,
    borderRadiusXLarge,
} = Sizes;

const {greyColor} = Colors;

export const BORDER_WIDTH_VARIATIONS = {
    border: 'borderWidth',
    'border-top': 'borderTopWidth',
    'border-bottom': 'borderBottomWidth',
    'border-left': 'borderLeftWidth',
    'border-right': 'borderRightWidth',
    'border-start': 'borderLeftWidth',
    'border-end': 'borderRightWidth',
};

export const BORDER_RADIUS_VARIATIONS = {
    rounded: 'borderRadius',
    'rounded-top-left': 'borderTopLeftRadius',
    'rounded-top-right': 'borderTopRightRadius',
    'rounded-bottom-left': 'borderBottomLeftRadius',
    'rounded-bottom-right': 'borderBottomRightRadius',
    'rounded-top': ['borderTopLeftRadius', 'borderTopRightRadius'],
    'rounded-bottom': ['borderBottomLeftRadius', 'borderBottomRightRadius'],
    'rounded-left': ['borderTopLeftRadius', 'borderBottomLeftRadius'],
    'rounded-right': ['borderTopRightRadius', 'borderBottomRightRadius'],
    'rounded-start': ['borderTopLeftRadius', 'borderBottomLeftRadius'],
    'rounded-end': ['borderTopRightRadius', 'borderBottomRightRadius'],
};

export const BORDER_WIDTH_VALUES = {
    '': borderTiny,
    0: 0,
    1: borderSmall,
    2: borderMedium,
    3: borderLarge,
    4: borderXLarge,
    5: (borderXLarge || 0) + 1,
    6: (borderXLarge || 0) + 2,
    7: (borderXLarge || 0) + 3,
    8: (borderXLarge || 0) + 4,
    9: (borderXLarge || 0) + 5,
    10: (borderXLarge || 0) + 6,
};

export const BORDER_RADIUS_VALUES = {
    '': borderRadiusTiny,
    0: 0,
    1: borderRadiusSmall,
    2: borderRadiusMedium,
    3: borderRadiusLarge,
    4: borderRadiusXLarge,
    pilled: 999,
    full: 999,
};

const borderColorClass = generateStyleValue({border: 'borderColor'}, Colors);

const borderWidthClass = generateStyleValue(
    BORDER_WIDTH_VARIATIONS,
    BORDER_WIDTH_VALUES,
    {borderColor: greyColor},
);

const borderRadiusClass = generateStyleValue(
    BORDER_RADIUS_VARIATIONS,
    BORDER_RADIUS_VALUES,
    {borderColor: greyColor},
);

const borderStyle = StyleSheet.create({
    'border-dashed': {
        borderWidth: borderSmall,
        borderColor: greyColor,
        borderStyle: 'dashed',
        borderRadius: Platform.OS === 'android' ? 1 : undefined,
    },
    'rounded-pill': {
        borderRadius: 999,
    },
    'rounded-full': {
        borderRadius: 999,
    },
    ...borderWidthClass,
    ...borderRadiusClass,
    ...borderColorClass,
});

export default borderStyle;
