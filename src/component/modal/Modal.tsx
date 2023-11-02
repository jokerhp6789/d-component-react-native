import React from 'react';
import {ScrollView, ScrollViewProps, View} from 'react-native';
import RNModal, {ModalProps} from 'react-native-modal';
import {Configs, IStyleTransformerProps} from '../..';
import {ThemeProps} from '../../interface/iTheme';
import {getStyleProps, styleTransformer} from '../../style/style';
import Button, {IButtonProps} from '../button/Button';
import Header, {IHeaderProps} from '../header/Header';
import SafeAreaView from '../view/SafeAreaView';

export interface IModalProps
    extends Partial<ModalProps>,
        Omit<IHeaderProps, 'children' | 'size'>,
        ThemeProps {
    open: boolean;
    size?: 'fullscreen' | 'large' | 'medium' | 'small';
    position?: 'bottom' | 'center' | 'top';
    className?: IStyleTransformerProps;
    classNameModal?: IStyleTransformerProps;
    classNameContainer?: IStyleTransformerProps;
    classNameHeader?: IStyleTransformerProps;
    classNameFooter?: IStyleTransformerProps;
    cancelText?: string;
    saveText?: string;
    showHeader?: boolean;
    showFooter?: boolean;
    showCancelButton?: boolean;
    showSaveButton?: boolean;
    useScrollView?: boolean;
    disabledSave?: boolean;
    swipeable?: boolean;
    closable?: boolean;
    onClose?: (props?: any) => void;
    onSave?: (props?: any) => void;
    customHeader?: ((props?: any) => Element) | Element;
    customFooter?: ((props?: any) => Element) | Element;
    cancelButtonProps?: IButtonProps;
    saveButtonProps?: IButtonProps;
    scrollViewProps?: Partial<ScrollViewProps>;
    headerProps?: Partial<IHeaderProps>;
}

const Modal: React.FC<IModalProps> = ({
    children,
    open,
    onClose,
    onSave,
    size = 'fullscreen',
    position = 'center',
    showHeader,
    showFooter,
    showCancelButton = true,
    showSaveButton = true,
    swipeable = true,
    disabledSave,
    style,
    className,
    classNameModal,
    classNameContainer,
    classNameHeader,
    classNameFooter,
    title,
    cancelText = 'Cancel',
    saveText = 'Save',
    useScrollView,
    onLeftPress,
    onRightPress,
    customHeader,
    customFooter,
    customRight,
    customLeft,
    leftIcon,
    leftText,
    rightIcon,
    rightText,
    theme: themeProps,
    swipeDirection = 'down',
    useLightColor = true,
    colorDarkMode,
    closable = true,
    onBackdropPress,
    cancelButtonProps = {},
    saveButtonProps = {},
    scrollViewProps = {},
    headerProps = {},
    ...rest
}) => {
    const {modalConfig} = Configs || {};
    const {theme: themeConfig} = modalConfig || {};
    const theme = themeProps || themeConfig;

    const modalClass = styleTransformer(
        '',
        {
            'm-0': size === 'fullscreen',
            'mx-0': size === 'large',
            'mx-6': size === 'medium',
            'mx-10': size === 'small',
            'justify-content-end': position === 'bottom',
            'justify-content-start': position === 'top',
        },
        classNameModal,
    );
    const containerClass = styleTransformer(
        {'flex-1': size === 'fullscreen'},
        classNameContainer,
    );
    const contentClass = styleTransformer('px-3 py-2', className);
    const headerClass = styleTransformer('', classNameHeader);
    const footerClass = styleTransformer(
        'flex-center-y justify-content-between px-3 py-2',
        {
            'justify-content-end': !showCancelButton,
        },
        classNameFooter,
    );

    const renderHeader = () => {
        if (customHeader) {
            if (typeof customHeader === 'function') {
                return customHeader();
            }
            return customHeader;
        }
        return (
            <Header
                title={title}
                onLeftPress={() => {
                    if (onLeftPress) {
                        return onLeftPress();
                    }
                    onClose && onClose();
                }}
                onRightPress={onRightPress}
                className={headerClass}
                leftIcon={leftIcon}
                rightIcon={rightIcon}
                leftText={leftText}
                rightText={rightText}
                theme={theme}
                customRight={customRight}
                customLeft={customLeft}
                {...headerProps}
            />
        );
    };

    const renderMainView = () => {
        if (useScrollView) {
            return (
                <ScrollView bounces={false} {...scrollViewProps}>
                    <View style={contentClass}>{children}</View>
                </ScrollView>
            );
        }
        return <View style={contentClass}>{children}</View>;
    };

    const renderFooter = () => {
        if (customFooter) {
            if (typeof customFooter === 'function') {
                return customFooter();
            }
            return customFooter;
        }
        return (
            <View style={footerClass}>
                {showCancelButton && (
                    <Button
                        onPress={onClose}
                        color="grey"
                        {...cancelButtonProps}>
                        {cancelText}
                    </Button>
                )}
                {showSaveButton && (
                    <Button
                        disabled={disabledSave}
                        onPress={onSave}
                        {...saveButtonProps}>
                        {saveText}
                    </Button>
                )}
            </View>
        );
    };

    const handleBackDropPress = () => {
        if (closable) {
            return onClose && onClose();
        }
        return onBackdropPress;
    };

    return (
        <RNModal
            onSwipeMove={onClose}
            swipeDirection={
                // eslint-disable-next-line no-nested-ternary
                useScrollView
                    ? undefined
                    : swipeable
                    ? swipeDirection
                    : undefined
            }
            {...(rest as any)}
            style={[{marginBottom: 0}, modalClass, style]}
            isVisible={open}
            backdropTransitionInTiming={700}
            backdropTransitionOutTiming={300}
            onBackdropPress={handleBackDropPress}
            hideModalContentWhileAnimating>
            <SafeAreaView
                className={containerClass}
                useLightColor={useLightColor}
                colorDarkMode={colorDarkMode}>
                {showHeader && renderHeader()}
                {renderMainView()}
                {showFooter && renderFooter()}
            </SafeAreaView>
        </RNModal>
    );
};

export default Modal;

export interface IModalTransProps extends ModalProps {
    className?: string;
}

export const ModalTrans: React.FC<IModalTransProps> = ({
    children,
    style,
    ...rest
}) => {
    const transStyle = getStyleProps(rest);
    return (
        <RNModal style={[{marginBottom: 0}, transStyle, style]} {...rest}>
            {children}
        </RNModal>
    );
};
