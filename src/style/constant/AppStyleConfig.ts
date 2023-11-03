import {IButtonProps, IModalProps, ITextProps} from '../..';
import {IInputTextProps} from '../../component/input/InputText';
import {ThemeProps} from '../../interface/iTheme';

export interface IGeneralStyleConfig extends ThemeProps {}

export interface IDefaultStyleConfig {
    textConfig?: Pick<ITextProps, 'color' | 'colorDarkMode'>;
    inputConfig?: Pick<IInputTextProps, 'variant' | 'labelPosition'>;
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
    modalConfig?: Pick<IModalProps, 'theme'>;
    generalConfig?: IGeneralStyleConfig;
}

const DefaultStyleConfig: IDefaultStyleConfig = {};
export default DefaultStyleConfig;
