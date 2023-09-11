/* eslint-disable no-plusplus */
import {StyleSheet} from 'react-native';
import Sizes from '../size/_size';
import {generateStyleValue} from '../modifier';

const widthClass: any = {};
const heightClass: any = {};
for (let i = 0; i <= 500; i += 1) {
    widthClass[`width-${i}`] = {
        width: i,
    };
    heightClass[`height-${i}`] = {
        height: i,
    };
}

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

const maxWidthPercentageClass = generateStyleValue(
    {['max-w']: 'maxWidth'},
    WIDTH_HEIGHT_PERCENTAGE_VALUE,
);
const widthPercentageClass = generateStyleValue(
    {w: 'width'},
    WIDTH_HEIGHT_PERCENTAGE_VALUE,
);

const maxHeightPercentageClass = generateStyleValue(
    {['max-h']: 'maxHeight'},
    WIDTH_HEIGHT_PERCENTAGE_VALUE,
);
const heightPercentageClass = generateStyleValue(
    {h: 'height'},
    WIDTH_HEIGHT_PERCENTAGE_VALUE,
);

const widthHeightStyle = StyleSheet.create({
    'h-full': {
        height: Sizes.screenHeight,
    },
    'height-full': {
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
    'w-auto': {
        width: 'auto',
    },
    'width-auto': {
        width: 'auto',
    },
    ...widthClass,
    ...heightClass,
    ...widthPercentageClass,
    ...heightPercentageClass,
    ...maxWidthPercentageClass,
    ...maxHeightPercentageClass,
});

export default widthHeightStyle;
