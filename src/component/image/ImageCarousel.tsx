import ClassNames from "classnames";
import React, {
  ElementRef,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import Carousel, {
  AdditionalParallaxProps,
  CarouselProps,
} from "react-native-snap-carousel";
import { ColorKeyType } from "../../style/constant/AppColors";
import AppSizes from "../../style/constant/AppSizes";
import Icon from "../icon/Icon";
import TouchableOpacity from "../view/TouchableOpacity";
import View from "../view/View";
import Image from "./Image";

export interface IImageCarouselProps extends Partial<CarouselProps<any>> {
  className?: string;
  classNameItem?: string;
  carouselHeight?: number;
  iconColor?: ColorKeyType;
  getImage?: (item: any) => any;
  onPressItem?: ({ item, index }: { item: any; index: any }) => any;
}
export interface IImageCarouselMethod {}

const ImageCarousel: React.ForwardRefRenderFunction<
  IImageCarouselMethod,
  IImageCarouselProps
> = (
  {
    loop = true,
    data,
    iconColor = "white",
    className,
    classNameItem,
    renderItem,
    onPressItem,
    getImage = (item) => item?.url,
    carouselHeight = (AppSizes.screenWidth * 2) / 3,
    sliderWidth = AppSizes.screenWidth,
    itemWidth = AppSizes.screenWidth,
    ...rest
  },
  ref
) => {
  const carouselRef = useRef<ElementRef<typeof Carousel>>(null);

  useImperativeHandle(ref, () => ({}));

  const renderImage = (
    entity: any = {},
    parallaxProps: AdditionalParallaxProps
  ) => {
    if (renderItem) {
      return renderItem(entity, parallaxProps);
    }
    const { item, index } = entity;
    const itemClass = ClassNames("flex-1", classNameItem);
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onPressItem && onPressItem({ item, index })}
      >
        <Image
          source={{ uri: getImage(item) }}
          style={{ height: carouselHeight }}
          className={itemClass}
        />
      </TouchableOpacity>
    );
  };

  const renderArrows = () => {
    if (data && data.length < 2) {
      return null;
    }

    const iconClass =
      "bg-blackOverlay position-absolute width-40 height-40 flex-center-y justify-center rounded-pilled";

    const iconLeftClass = ClassNames(iconClass, "left-5");
    const iconRightClass = ClassNames(iconClass, "right-5");

    return (
      <>
        <TouchableOpacity
          style={{
            top: carouselHeight / 2 - 20,
          }}
          className={iconLeftClass}
          onPress={() =>
            carouselRef.current && carouselRef.current.snapToPrev()
          }
        >
          <Icon
            name="chevron-left"
            className={`border-2 rounded-pilled border-${iconColor}`}
            color={iconColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            top: carouselHeight / 2 - 20,
          }}
          className={iconRightClass}
          onPress={() =>
            carouselRef.current && carouselRef.current.snapToNext()
          }
        >
          <Icon
            name="chevron-right"
            className={`border-2 rounded-pilled border-${iconColor}`}
            color={iconColor}
          />
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View className={className}>
      <Carousel
        ref={carouselRef}
        loop={loop}
        data={data}
        {...(rest as any)}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        renderItem={renderImage}
      />
      {renderArrows()}
    </View>
  );
};

export default forwardRef(ImageCarousel);
