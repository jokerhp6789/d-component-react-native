/* ----------------------------------------
// Input
// ---------------------------------------- */

export type {
    IInputTextProps,
    IInputTextMethod,
    IInputErrorViewProps,
} from './component/input/InputText';
export {
    default as InputText,
    InputErrorView,
} from './component/input/InputText';

export type {
    IInputSearchMethod,
    IInputSearchProps,
} from './component/input/InputSearch';
export {default as InputSearch} from './component/input/InputSearch';

export type {
    IInputDateProps,
    IInputDateMethod,
    TDateFormat,
    ICustomInputProps,
} from './component/input/InputDate';
export {default as InputDate} from './component/input/InputDate';

export type {
    IInputDateRangeMethod,
    IInputDateRangeProps,
} from './component/input/InputDateRange';
export {default as InputDateRange} from './component/input/InputDateRange';

export type {
    IInputCommentProps,
    IInputCommentMethods,
} from './component/input/InputComment';
export {default as InputComment} from './component/input/InputComment';

/* ----------------------------------------
// View
// ---------------------------------------- */

export type {IViewProps} from './component/view/View';
export {default as View} from './component/view/View';

export type {
    IScrollViewProps,
    IScrollViewMethod,
} from './component/view/ScrollView';
export {default as ScrollView} from './component/view/ScrollView';

export type {ISafeAreaViewProps} from './component/view/SafeAreaView';
export {default as SafeAreaView} from './component/view/SafeAreaView';

export type {
    ITouchableOpacityProps,
    ITouchableOpacityMethod,
} from './component/view/TouchableOpacity';
export {default as TouchableOpacity} from './component/view/TouchableOpacity';

export type {ITextAreaViewProps as IViewTextAreaProps} from './component/view/TextAreaView';
export type {ITextAreaViewProps} from './component/view/TextAreaView';
export {default as ViewTextArea} from './component/view/TextAreaView';
export {default as TextAreaView} from './component/view/TextAreaView';

export type {ILoadingProps} from './component/view/Loading';
export {default as Loading} from './component/view/Loading';

/* ----------------------------------------
// List
// ---------------------------------------- */

export type {
    IAwesomeListProps,
    IPaginationProps,
} from './component/list/awesomeList/AwesomeList';
export {default as AwesomeList} from './component/list/awesomeList/AwesomeList';
export type {default as AwesomeListModeType} from './component/list/awesomeList/AwesomeListMode';
export {default as AwesomeListMode} from './component/list/awesomeList/AwesomeListMode';
export type {IEmptyViewProps} from './component/list/awesomeList/EmptyView';
export {default as EmptyView} from './component/list/awesomeList/EmptyView';
export type {ISectionItem} from './component/list/awesomeList/AwesomeListUtils';
export {
    mapListToSectionData,
    isArray,
    isObject,
    isString,
} from './component/list/awesomeList/AwesomeListUtils';

/* ----------------------------------------
// Header
// ---------------------------------------- */

export type {IHeaderProps} from './component/header/Header';
export {default as Header} from './component/header/Header';

/* ----------------------------------------
// Modal
// ---------------------------------------- */

export type {IModalProps} from './component/modal/Modal';
export {default as Modal} from './component/modal/Modal';

/* ----------------------------------------
// Text
// ---------------------------------------- */

export type {ITextProps} from './component/text/Text';
export {default as Text} from './component/text/Text';

/* ----------------------------------------
// Button
// ---------------------------------------- */

export type {IButtonProps} from './component/button/Button';
export {default as Button} from './component/button/Button';

export type {IButtonIconProps} from './component/button/ButtonIcon';
export {default as ButtonIcon} from './component/button/ButtonIcon';

/* ----------------------------------------
// Select
// ---------------------------------------- */

export type {ISelectProps} from './component/select/Select';
export {default as Select} from './component/select/Select';

/* ----------------------------------------
// Image
// ---------------------------------------- */

export type {IImageProps} from './component/image/Image';
export {default as Image} from './component/image/Image';

export type {IAvatarProps} from './component/avatar/Avatar';
export {default as Avatar} from './component/avatar/Avatar';

export type {IAvatarNameProps, IUserBasic} from './component/avatar/AvatarName';
export {default as AvatarName} from './component/avatar/AvatarName';

export type {IImageViewerModalProps} from './component/image/ImageViewerModal';
export {default as ImageViewerModal} from './component/image/ImageViewerModal';

export type {IImagePreviewProps} from './component/image/ImagePreview';
export {default as ImagePreview} from './component/image/ImagePreview';

export type {IImageListProps} from './component/image/ImageList';
export {default as ImageList} from './component/image/ImageList';

export type {
    IImageCarouselProps,
    IImageCarouselMethod,
} from './component/image/ImageCarousel';
export {default as ImageCarousel} from './component/image/ImageCarousel';

/* ----------------------------------------
// Checkbox
// ---------------------------------------- */

export type {ICheckBoxProps} from './component/checkbox/CheckBox';
export {default as CheckBox} from './component/checkbox/CheckBox';

/* ----------------------------------------
// Calendar
// ---------------------------------------- */

export type {ICalendarProps, LocaleConfig} from './component/calendar/Calendar';
export {default as Calendar} from './component/calendar/Calendar';

export type {IModalCalendarProps} from './component/calendar/ModalCalendar';
export {default as ModalCalendar} from './component/calendar/ModalCalendar';

/* ----------------------------------------
// Tab View
// ---------------------------------------- */

export type {ITabBarComponentProps} from './component/tab/TabBarComponent';
export {default as TabBarComponent} from './component/tab/TabBarComponent';

export type {
    IRenderTabViewProps,
    ITabViewMethod,
    ITabViewProps,
    ITabViewRoute,
} from './component/tab/TabView';
export {default as TabView} from './component/tab/TabView';

export type {
    ITabStepperItemData,
    ITabStepperItemProps,
    ITabStepperProps,
} from './component/tab/TabStepper';
export {
    default as TabStepper,
    TabStepperItem,
} from './component/tab/TabStepper';

/* ----------------------------------------
// Tab Bar
// ---------------------------------------- */

export type {ITabItem, ITabBarProps} from './component/tab/TabBar';
export {default as TabBar} from './component/tab/TabBar';

/* ----------------------------------------
// Style
// ---------------------------------------- */

export {default as Sizes} from './style/size/_size';
export {default as Colors} from './style/color/_color';
export {default as Scheme} from './style/color/_scheme';
export {default as Fonts} from './style/font/_font';
export {default as Configs} from './style/config/_config';
export {default as AppSizes} from './style/constant/AppSizes';
export {default as AppColors} from './style/constant/AppColors';
export {default as AppFonts} from './style/constant/AppFonts';
export type {ColorKeyType} from './style/constant/AppColors';
export {isDark} from './style/color/_color';

/* ----------------------------------------
// Utils
// ---------------------------------------- */

export {default as StringUtils} from './utils/StringUtils';
export {default as TreeDataUtils} from './utils/TreeDataUtils';
export {default as TimeUtils} from './utils/TimeUtils';
export {default as ObjectUtils} from './utils/ObjectUtils';
export {default as MapUtils} from './utils/MapUtils';
export {default as ImageUtils} from './utils/ImageUtils';

/* ----------------------------------------
// Utils
// ---------------------------------------- */

export type {IUseKeyboard} from './hooks/useKeyboard';

export {default as useDidUpdate} from './hooks/useDidUpdate';
export {default as useFirstTime} from './hooks/useFirstTime';
export {default as useForceUpdate} from './hooks/useForceUpdate';
export {useForceUpdateConstraint} from './hooks/useForceUpdate';
export {default as usePrevious} from './hooks/usePrevious';
export {default as useKeyboard} from './hooks/useKeyboard';
export {default as useDeepEffect} from './hooks/useDeepEffect';

/* ----------------------------------------
// Items
// ---------------------------------------- */

export type {IIconProps} from './component/icon/Icon';
export {default as Icon} from './component/icon/Icon';

export type {IChipProps} from './component/items/Chip';
export {default as Chip} from './component/items/Chip';

export type {IBadgeProps} from './component/items/Badge';
export {default as Badge} from './component/items/Badge';

export type {IProgressBarProps} from './component/items/ProgressBar';
export {default as ProgressBar} from './component/items/ProgressBar';

export type {IDividerProps} from './component/items/Divider';
export {default as Divider} from './component/items/Divider';

/* ----------------------------------------
// Form
// ---------------------------------------- */

export type {
    IFormItemData,
    IFormItemDataRender,
    IFormItemProps,
    IFormItemType,
    IFormProps,
} from './component/form/Form';
export {default as Form} from './component/form/Form';

/* ----------------------------------------
// Context
// ---------------------------------------- */

export type {IStyleStateContext} from './context/StyleContext';
export {default as StyleContext} from './context/StyleContext';

/* ----------------------------------------
// Style Modifier
// ---------------------------------------- */

export type {IGetThemeColorProps} from './style/modifier';
export type {IStyleTransformerProps} from './style/style';
export {getColorValue} from './style/modifier';
export {styleTransformer as styles} from './style/style';

/* ----------------------------------------
// Progress
// ---------------------------------------- */

export type {
    IProgressComponentProps,
    IProgressTaskProps,
    IProgressComponentState,
    IResponseAPI,
    IProgressFunctionProps,
} from './component/progress/ProgressComponent';
export {default as ProgressComponent} from './component/progress/ProgressComponent';
export {default as Progress} from './component/progress/ProgressController';
