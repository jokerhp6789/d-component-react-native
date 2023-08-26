import React, { useState } from "react";
import { ImageProps } from "react-native";
import ClassNames from "classnames";
import ScrollView from "../view/ScrollView";
import ImagePreview, { IImagePreviewProps } from "./ImagePreview";
import ImageViewerModal from "./ImageViewerModal";

export interface IImageListProps extends IImagePreviewProps {
  dataSource: Array<any>;
  getSource?: ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => ImageProps["source"] | string;
  variant?: "horizontal" | "vertical";
  showsHorizontalScrollIndicator?: boolean;
  className?: string;
  classNameItem?: string;
}

const ImageList: React.FC<IImageListProps> = ({
  dataSource,
  getSource = ({ item }) => ({ uri: item }),
  variant = "horizontal",
  showsHorizontalScrollIndicator = false,
  className,
  classNameItem,
  ...rest
}) => {
  const [openLightBox, setOpenLightBox] = useState<{
    open: boolean;
    index: null | number;
  }>({ open: false, index: null });
  return (
    <ScrollView
      horizontal={variant === "horizontal"}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      className={className}
    >
      {dataSource?.length > 0 &&
        dataSource.map((item, index) => {
          const source = getSource({ item, index });
          const itemClass = ClassNames("mx-1", classNameItem);
          if (typeof source === "string") {
            return (
              <ImagePreview
                uri={source}
                onPress={() => setOpenLightBox({ open: true, index })}
                className={itemClass}
                {...rest}
              />
            );
          }
          return (
            <ImagePreview
              source={source}
              onPress={() => setOpenLightBox({ open: true, index })}
              className={itemClass}
              {...rest}
            />
          );
        })}
      {openLightBox?.open && (
        <ImageViewerModal
          open={openLightBox?.open}
          index={openLightBox.index as number}
          onClose={() => setOpenLightBox({ open: false, index: null })}
          value={dataSource.map((item, index) => {
            const url = getSource({ item, index });
            return { url } as any;
          })}
        />
      )}
    </ScrollView>
  );
};

export default ImageList;
