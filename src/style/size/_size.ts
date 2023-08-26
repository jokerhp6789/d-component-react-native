/** @format */

import _ from "lodash";
import DefaultSize, { AppSizeKeyType } from "../constant/AppSizes";

type SizesRecord = Partial<Record<AppSizeKeyType, number>> & {
    loadSizes: (props: any) => any;
    [key: string]: any;
};

export class AppSizeClass {
    [key: string]: any;

    constructor() {
        Object.assign(this, DefaultSize);
    }

    /**
     * Load custom set of sizes
     * arguments:
     * sizes - map of keys and size values e.g {inputHeight: 50, buttonHeight: 30}
     */
    loadSizes(sizes: { [key in Partial<AppSizeKeyType>]: string | number }) {
        _.forEach(sizes, (value, key) => {
            this[key] = value;
        });
    }
}

const Sizes: SizesRecord = new AppSizeClass();
Sizes.loadSizes(DefaultSize);

export default Sizes;
