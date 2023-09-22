import React, {useState} from 'react';
import {ImageProps} from 'react-native';
import ClassNames from 'classnames';
import ScrollView, {IScrollViewProps} from '../view/ScrollView';
import ImagePreview, {IImagePreviewProps} from './ImagePreview';
import ImageViewerModal, {IImageViewerModalProps} from './ImageViewerModal';

export interface IImageListProps extends IScrollViewProps {
    dataSource: Array<any>;
    getSource?: ({
        item,
        index,
    }: {
        item: any;
        index: number;
    }) => ImageProps['source'] | string;
    variant?: 'horizontal' | 'vertical';
    showsHorizontalScrollIndicator?: boolean;
    className?: string;
    classNameItem?: string;
    imageItemProps?: Partial<IImagePreviewProps>;
    imageViewerProps?: Partial<IImageViewerModalProps>;
}

const ImageList: React.FC<IImageListProps> = ({
    dataSource,
    getSource = ({item}) => ({uri: item}),
    variant = 'horizontal',
    showsHorizontalScrollIndicator = false,
    className,
    classNameItem,
    imageItemProps = {},
    imageViewerProps = {},
    ...rest
}) => {
    const [openLightBox, setOpenLightBox] = useState<{
        open: boolean;
        index: null | number;
    }>({open: false, index: null});
    return (
        <ScrollView
            bounces={false}
            horizontal={variant === 'horizontal'}
            showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
            className={className}
            {...rest}>
            {dataSource?.length > 0 &&
                dataSource.map((item, index) => {
                    const source = getSource({item, index});
                    const itemClass = ClassNames('mx-1', classNameItem);
                    if (typeof source === 'string') {
                        return (
                            <ImagePreview
                                uri={source}
                                onPress={() =>
                                    setOpenLightBox({open: true, index})
                                }
                                className={itemClass}
                                {...imageItemProps}
                            />
                        );
                    }
                    return (
                        <ImagePreview
                            source={source}
                            onPress={() => setOpenLightBox({open: true, index})}
                            className={itemClass}
                            {...imageItemProps}
                        />
                    );
                })}
            {openLightBox?.open && (
                <ImageViewerModal
                    open={openLightBox?.open}
                    index={openLightBox.index as number}
                    onClose={() => setOpenLightBox({open: false, index: null})}
                    value={dataSource.map((item, index) => {
                        const url = getSource({item, index});
                        return {url} as any;
                    })}
                    {...imageViewerProps}
                />
            )}
        </ScrollView>
    );
};

export default ImageList;
