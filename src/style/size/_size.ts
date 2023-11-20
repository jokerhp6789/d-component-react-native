/** @format */

import _ from 'lodash';
import DefaultSize, {AppSizeKeyType} from '../constant/AppSizes';

type TLoadSizeProps = Partial<{[key in AppSizeKeyType]: any}> & {
    [key: string]: any;
};

type SizesRecord = Record<AppSizeKeyType, number> & {
    loadSizes: (props: TLoadSizeProps) => any;
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
    loadSizes(sizes: TLoadSizeProps) {
        _.forEach(sizes, (value, key) => {
            this[key] = value;
        });
    }
}

const Sizes: SizesRecord = new AppSizeClass() as any;
Sizes.loadSizes(DefaultSize);

export default Sizes;
