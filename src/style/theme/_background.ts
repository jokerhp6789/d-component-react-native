import { StyleSheet } from "react-native";
import Colors from "../color/_color";
import { generateStyleValue } from "../modifier";

export const BACKGROUND_VARIATIONS = {
  bg: "backgroundColor",
};

const backgroundClass = generateStyleValue(BACKGROUND_VARIATIONS, Colors);

const backgroundStyle = StyleSheet.create({
  "bg-transparent": {
    backgroundColor: "transparent",
  },
  ...backgroundClass,
});

export default backgroundStyle;
