/* eslint-disable no-nested-ternary */
import imageStyle from '../image/_image';
import flexStyle from '../layout/_flex';
import gapStyle from '../layout/_gap';
import marginPadding from '../layout/_padding-margin';
import positionStyle from '../layout/_position';
import widthHeightStyle from '../layout/_width-height';
import textStyle from '../text/_text';
import backgroundStyle from '../theme/_background';
import borderStyle from '../theme/_border';
import shadowStyle from '../theme/_shadow';

const style = {
    ...flexStyle,
    ...marginPadding,
    ...borderStyle,
    ...gapStyle,
    ...backgroundStyle,
    ...widthHeightStyle,
    ...textStyle,
    ...positionStyle,
    ...imageStyle,
    ...shadowStyle,
};

export const StyleMap = new Map(Object.entries(style));

export default style;
