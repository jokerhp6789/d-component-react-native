import {IButtonProps} from '../../component/button/Button';
import {IInputTextProps} from '../../component/input/InputText';
import {IAwesomeListProps} from '../../component/list/awesomeList/AwesomeList';
import {IModalProps} from '../../component/modal/Modal';
import {ISelectProps} from '../../component/select/Select';
import {ITextProps} from '../../component/text/Text';
import {ThemeProps} from '../../interface/iTheme';

export interface IGeneralStyleConfig extends ThemeProps {}

export interface IDefaultStyleConfig {
    textConfig?: Pick<ITextProps, 'color' | 'colorDarkMode'>;
    inputConfig?: Pick<IInputTextProps, 'variant' | 'labelPosition'>;
    selectConfig?: Pick<ISelectProps, 'modalProps' | 'listProps'>;
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
    awesomeListConfig?: Pick<IAwesomeListProps<any>, 'useFlashList'>;
    generalConfig?: IGeneralStyleConfig;
}

const DefaultStyleConfig: IDefaultStyleConfig = {};
export default DefaultStyleConfig;
