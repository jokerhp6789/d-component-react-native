/**
 * /* eslint-disable import/prefer-default-export
 *
 * @format
 */

import _ from 'lodash';
import DefaultStyleConfig, {IDefaultStyleConfig} from '../constant/AppStyleConfig';

type ConfigRecordType = Partial<IDefaultStyleConfig> & {
    loadConfigs: (props: IDefaultStyleConfig) => any;
    [key: string]: any;
};

export class ConfigClass {
    [key: string]: any;

    constructor() {
        Object.assign(this, DefaultStyleConfig);
    }

    loadConfigs(configs: {[key: string]: string}) {
        _.forEach(configs, (value, key) => {
            this[key] = value;
        });
    }
}

//@ts-ignore
const Configs: ConfigRecordType = new ConfigClass();
Configs.loadConfigs(DefaultStyleConfig);

export default Configs;
