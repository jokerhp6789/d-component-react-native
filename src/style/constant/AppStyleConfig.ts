import {IButtonProps} from '../..';
import {IInputTextProps} from '../../component/input/InputText';
import {ThemeProps} from '../../interface/iTheme';

export interface IGeneralStyleConfig extends ThemeProps {}

export interface IDefaultStyleConfig {
    inputConfig?: Pick<IInputTextProps, 'variant'>;
    buttonConfig?: Pick<
        IButtonProps,
        | 'variant'
        | 'shape'
        | 'size'
        | 'roundedRadius'
        | 'disableColor'
        | 'disableColorDarkMode'
        | 'colorBorderDisable'
        | 'colorBorderDisableDarkMode'
        | 'color'
    >;
    generalConfig?: IGeneralStyleConfig;
}

const DefaultStyleConfig: IDefaultStyleConfig = {};
export default DefaultStyleConfig;