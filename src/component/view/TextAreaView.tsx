import React, {useMemo, useState} from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import {ThemeProps} from '../../interface/iTheme';
import {IStyleTransformerProps, styleTransformer} from '../../style/style';
import Modal, {IModalProps} from '../modal/Modal';
import Text, {ITextProps} from '../text/Text';
import TouchableOpacity from './TouchableOpacity';
import View from './View';

export interface ITextAreaViewProps extends ThemeProps {
    children: string;
    style?: ViewStyle;
    styleContent?: TextStyle;
    styleShowMore?: TextStyle;
    styleShowLess?: TextStyle;
    showMoreText?: string;
    showLessText?: string;
    limitedLength?: number;
    className?: IStyleTransformerProps;
    classNameContent?: IStyleTransformerProps;
    classNameShowMore?: IStyleTransformerProps;
    classNameShowLess?: IStyleTransformerProps;
    textContentProps?: ITextProps;
    modalProps?: IModalProps;
    variant?: 'modal' | 'expand';
    pressToContract?: boolean;
}

const TextAreaView: React.FC<ITextAreaViewProps> = ({
    children,
    style,
    styleContent = {},
    styleShowLess,
    styleShowMore,
    className,
    classNameContent,
    classNameShowMore,
    classNameShowLess,
    limitedLength = 200,
    textContentProps = {},
    modalProps = {},
    showLessText = 'Show Less',
    showMoreText = 'Show More',
    variant = 'modal',
    pressToContract = true,
    colorDarkMode,
    useLightColor,
    ...rest
}) => {
    const textStyle = 'h4';

    const isOverFollow = useMemo(() => {
        return children && children?.length > limitedLength;
    }, [children, limitedLength]);
    const [showFullMessage, setShowFullMessage] = useState(false);

    const displayShowLess = useMemo(() => {
        return showFullMessage && variant === 'expand';
    }, [showFullMessage, variant]);

    const displayText = useMemo(() => {
        let content = children;
        if (showFullMessage && variant === 'expand') {
            return content;
        }
        if (isOverFollow) {
            content = children.substring(0, limitedLength);
        }
        return content;
    }, [children, isOverFollow, showFullMessage, limitedLength]);

    const getShowMoreText = () => {
        if (displayShowLess) {
            return showLessText;
        }
        return showMoreText;
    };

    const showDot = useMemo(() => {
        if (displayShowLess) {
            return false;
        }
        if (isOverFollow) {
            return true;
        }
        return false;
    }, [isOverFollow, showFullMessage]);

    if (typeof children !== 'string') {
        throw Error('children is not string!');
    }

    return (
        <React.Fragment>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    if (showFullMessage && variant === 'expand') {
                        setShowFullMessage(false);
                    }
                }}
                className={className}
                useLightColor={useLightColor}
                colorDarkMode={colorDarkMode}
                style={[style]}>
                <Text
                    className={`${textStyle} ${classNameContent}`}
                    style={{...styleContent}}
                    {...textContentProps}>
                    {displayText}{' '}
                    {showDot && <Text className={`${textStyle} h3`}>...</Text>}
                    {isOverFollow && (
                        <TouchableOpacity
                            onPress={() => {
                                if (variant === 'expand') {
                                    setShowFullMessage(!showFullMessage);
                                } else {
                                    setShowFullMessage(true);
                                }
                            }}
                            colorDarkMode="transparent">
                            <Text
                                className={`ml-2 text-secondary  py-0 h4 ${
                                    displayShowLess
                                        ? classNameShowLess
                                        : classNameShowMore
                                }`}
                                style={
                                    displayShowLess
                                        ? styleShowLess
                                        : styleShowMore
                                }>
                                {getShowMoreText()}
                            </Text>
                        </TouchableOpacity>
                    )}
                </Text>
            </TouchableOpacity>
            {showFullMessage && variant === 'modal' && (
                <Modal
                    onClose={() => setShowFullMessage(false)}
                    size="medium"
                    showFooter
                    useScrollView
                    showSaveButton={false}
                    className="px-3"
                    classNameFooter="justify-content-end"
                    {...modalProps}
                    open={showFullMessage}>
                    <Text className={`${textStyle} mt-2`} colorDarkMode="light">
                        {children}
                    </Text>
                </Modal>
            )}
        </React.Fragment>
    );
};

export default TextAreaView;
