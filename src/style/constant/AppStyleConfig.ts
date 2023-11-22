import {IButtonProps} from '../../component/button/Button';
import {IInputTextProps} from '../../component/input/InputText';
import {IAwesomeListProps} from '../../component/list/awesomeList/AwesomeList';
import {IModalProps} from '../../component/modal/Modal';
import {ISelectProps} from '../../component/select/Select';
import {ITextProps} from '../../component/text/Text';
import {ThemeProps} from '../../interface/iTheme';

export interface IGeneralStyleConfig extends ThemeProps {}
export interface IAwesomeListConfig
    extends Pick<IAwesomeListProps<any>, 'useFlashList' | 'getPagingData'> {
    pageSize?: number;
}

export interface IDefaultStyleConfig {
    textConfig?: Pick<ITextProps, 'color' | 'colorDarkMode'>;
    inputConfig?: Pick<IInputTextProps, 'variant' | 'labelPosition'>;
    selectConfig?: Pick<
        ISelectProps,
        'modalProps' | 'listProps' | 'popupHeaderProps' | 'popupVariant'
    >;
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
    awesomeListConfig?: IAwesomeListConfig;
    generalConfig?: IGeneralStyleConfig;
}

const DefaultStyleConfig: IDefaultStyleConfig = {};
export default DefaultStyleConfig;
