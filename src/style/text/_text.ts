/**
 * /* eslint-disable no-plusplus
 *
 * @format
 */

import { StyleSheet } from "react-native";
import Colors from "../color/_color";
import Fonts from "../font/_font";
import { generateStyleValue } from "../modifier";

export const TEXT_ALIGN_VARIANTS = { text: "textAlign" };
export const TEXT_DECOR_VARIANTS = { text: "textDecorationLine" };
export const TEXT_TRANSFORM_VARIANTS = { text: "textTransform" };
export const FONT_WEIGHT_VARIANT = { "font-weight": "fontWeight" };
export const FONT_SIZE_VARIANT = { "font-size": "fontSize" };

const textSizeClass: any = {};
for (let i = 0; i < 100; i++) {
    textSizeClass[`font-size-${i}`] = {
        fontSize: i,
    };
}

const textLineHeightClass: any = {};
for (let i = 0; i <= 50; i += 1) {
    textLineHeightClass[`line-height-${i}`] = {
        lineHeight: i,
    };
}

export const FONT_WEIGHT_VALUE = {
    100: "100",
    200: "200",
    300: "300",
    400: "400",
    500: "500",
    600: "600",
    700: "700",
    800: "800",
    900: "900",
    normal: "normal",
    bold: "bold",
};

export const TEXT_ALIGN_VALUE = {
    auto: "auto",
    start: "left",
    left: "left",
    end: "right",
    right: "right",
    center: "center",
    justify: "justify",
};

export const TEXT_DECOR_VALUE = {
    none: "none",
    underline: "underline",
    "line-through": "line-through",
    "underline line-through": "underline line-through",
};

export const TEXT_TRANSFORM_VALUE = {
    capitalize: "capitalize",
    uppercase: "uppercase",
    lowercase: "lowercase",
};

const textColorClass = generateStyleValue({ text: "color" }, Colors);

const textAlignClass = generateStyleValue(
    TEXT_ALIGN_VARIANTS,
    TEXT_ALIGN_VALUE
);

const textDecorClass = generateStyleValue(
    TEXT_DECOR_VARIANTS,
    TEXT_DECOR_VALUE
);

const textTransformClass = generateStyleValue(
    TEXT_TRANSFORM_VARIANTS,
    TEXT_TRANSFORM_VALUE
);

const fontWeightClass = generateStyleValue(
    FONT_WEIGHT_VARIANT,
    FONT_WEIGHT_VALUE
);

const textStyle = StyleSheet.create({
    ...textColorClass,
    ...textAlignClass,
    ...textDecorClass,
    ...textTransformClass,
    ...textSizeClass,
    ...fontWeightClass,
    ...textLineHeightClass,
    ...Fonts.fontClass,
});

export default textStyle;
