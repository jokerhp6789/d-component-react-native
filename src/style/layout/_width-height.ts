/* eslint-disable no-plusplus */
import {StyleSheet} from 'react-native';
import Sizes from '../size/_size';
import {generateStyleValue} from '../modifier';

const WIDTH_HEIGHT_PERCENTAGE_VALUE = {
    0: '0%',
    5: '5%',
    10: '10%',
    15: '15%',
    20: '20%',
    25: '25%',
    30: '30%',
    35: '35%',
    40: '40%',
    45: '45%',
    50: '50%',
    55: '55%',
    60: '60%',
    65: '65%',
    70: '70%',
    75: '75%',
    80: '80%',
    85: '85%',
    90: '90%',
    95: '95%',
    100: '100%',
};

const maxWPercentageClass = generateStyleValue(
    {['max-w']: 'maxWidth'},
    WIDTH_HEIGHT_PERCENTAGE_VALUE,
);

const maxWidthPercentageClass = generateStyleValue(
    {['max-width']: 'maxWidth'},
    WIDTH_HEIGHT_PERCENTAGE_VALUE,
);

const widthPercentageClass = generateStyleValue(
    {width: 'width'},
    WIDTH_HEIGHT_PERCENTAGE_VALUE,
);

const wPercentageClass = generateStyleValue(
    {w: 'width'},
    WIDTH_HEIGHT_PERCENTAGE_VALUE,
);

const maxHPercentageClass = generateStyleValue(
    {['max-h']: 'maxHeight'},
    WIDTH_HEIGHT_PERCENTAGE_VALUE,
);

const maxHeightPercentageClass = generateStyleValue(
    {['max-height']: 'maxHeight'},
    WIDTH_HEIGHT_PERCENTAGE_VALUE,
);

const hPercentageClass = generateStyleValue(
    {h: 'height'},
    WIDTH_HEIGHT_PERCENTAGE_VALUE,
);

const heightPercentageClass = generateStyleValue(
    {height: 'height'},
    WIDTH_HEIGHT_PERCENTAGE_VALUE,
);

const widthHeightStyle = StyleSheet.create({
    'h-full': {
        height: Sizes.screenHeight,
    },
    'height-full': {
        height: Sizes.screenHeight,
    },
    'min-h-full': {
        height: Sizes.screenHeight,
    },
    'min-height-full': {
        height: Sizes.screenHeight,
    },
    'max-h-full': {
        height: Sizes.screenHeight,
    },
    'max-height-full': {
        height: Sizes.screenHeight,
    },
    'h-auto': {
        height: 'auto',
    },
    'height-auto': {
        height: 'auto',
    },
    'w-full': {
        width: Sizes.screenWidth,
    },
    'width-full': {
        width: Sizes.screenWidth,
    },
    'min-w-full': {
        width: Sizes.screenWidth,
    },
    'min-width-full': {
        width: Sizes.screenWidth,
    },
    'max-w-full': {
        width: Sizes.screenWidth,
    },
    'max-width-full': {
        width: Sizes.screenWidth,
    },
    'w-auto': {
        width: 'auto',
    },
    'width-auto': {
        width: 'auto',
    },
    ...widthPercentageClass,
    ...wPercentageClass,
    ...hPercentageClass,
    ...heightPercentageClass,
    ...maxWPercentageClass,
    ...maxWidthPercentageClass,
    ...maxHPercentageClass,
    ...maxHeightPercentageClass,
});

export default widthHeightStyle;
