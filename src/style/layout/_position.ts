/* eslint-disable no-plusplus */
import { StyleSheet } from "react-native";
import { generateStyleValue } from "../modifier";

export const POSITION_VARIANTS = ["right", "left", "top", "bottom"];
const positionClass: any = {};
const zIndexClass: any = {};
for (let i = 0; i < 101; i++) {
  POSITION_VARIANTS.forEach((key) => {
    positionClass[`${key}-${i}`] = { [key]: i };
  });
}

for (let i = 1; i < 11; i++) {
  zIndexClass[`zIndex-${i}`] = {
    zIndex: i,
  };
}

const positionStyle = StyleSheet.create({
  "position-relative": {
    position: "relative",
  },
  "position-absolute": {
    position: "absolute",
  },
  "zIndex-1": {
    zIndex: 1,
  },
  ...positionClass,
  ...zIndexClass,
});

export default positionStyle;
