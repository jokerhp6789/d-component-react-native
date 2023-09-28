/**
 * /* eslint-disable import/prefer-default-export
 *
 * @format
 */

import _ from 'lodash';
import tinycolor from 'tinycolor2';
import DefaultColors, {ColorKeyType} from '../constant/AppColors';
import {getColorValue} from '../modifier';

type ColorsRecord = Partial<Record<ColorKeyType, string>> & {
    loadColors: (
        props: {
            [key in ColorKeyType]?: ColorKeyType;
        } & {[key: string]: ColorKeyType | string},
    ) => any;
    [key: string]: any;
};

export class ColorsClass {
    [key: string]: any;

    constructor() {
        Object.assign(this, DefaultColors);
    }

    /**
     * Load custom set of colors
     * arguments:
     * colors - map of keys and colors values e.g {grey10: '#20303C', grey20: '#43515C'}
     */
    loadColors(colors: {[key: string]: string}) {
        _.forEach(colors, (value, key) => {
            this[key] = getColorValue(value);
        });
    }
}

export const isDark = (color: string) => {
    const lum = tinycolor(color).getLuminance();
    return lum < 0.55;
};
//@ts-ignore
const Colors: ColorsRecord = new ColorsClass();
Colors.loadColors(DefaultColors as any);
export default Colors;
