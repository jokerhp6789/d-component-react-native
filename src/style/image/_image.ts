import { StyleSheet } from "react-native";
import { generateStyleValue } from "../modifier";

const baseSize = 16;

const imageStyle = StyleSheet.create({
  "image-reg-tiny": {
    height: baseSize,
  },
  "image-reg-xx-small": {
    height: baseSize * 1.4,
  },

  "image-reg-x-small": {
    height: baseSize * 2,
  },

  "image-reg-small": {
    height: baseSize * 3,
  },

  "image-reg-medium": {
    height: baseSize * 4,
  },

  "image-reg-large": {
    height: baseSize * 5,
  },

  "image-reg-x-large": {
    height: baseSize * 6,
  },

  "image-reg-xx-large": {
    height: baseSize * 7,
  },

  "image-square-tiny": {
    width: baseSize,
    height: baseSize,
  },

  "image-square-xx-small": {
    width: baseSize * 1.4,
    height: baseSize * 1.4,
  },

  "image-square-x-small": {
    width: baseSize * 2,
    height: baseSize * 2,
  },
  "image-square-small": {
    width: baseSize * 3,
    height: baseSize * 3,
  },
  "image-square-medium": {
    width: baseSize * 4,
    height: baseSize * 4,
  },
  "image-square-large": {
    width: baseSize * 5,
    height: baseSize * 5,
  },
  "image-square-x-large": {
    width: baseSize * 6,
    height: baseSize * 6,
  },
  "image-square-xx-large": {
    width: baseSize * 7,
    height: baseSize * 7,
  },
});

export default imageStyle;
