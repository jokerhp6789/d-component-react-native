import { StyleSheet } from "react-native";
import { generateStyleValue } from "../modifier";

export const FLEX_VALUE = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
};

const flexValueClass = generateStyleValue({ flex: "flex" }, FLEX_VALUE);

const flexStyle = StyleSheet.create({
  //flex

  "flex-wrap": {
    flexWrap: "wrap",
  },

  "flex-nowrap": {
    flexWrap: "nowrap",
  },

  "flex-wrap-reverse": {
    flexWrap: "wrap-reverse",
  },

  "flex-row": {
    flexDirection: "row",
  },

  "flex-row-reverse": {
    flexDirection: "row-reverse",
  },

  "flex-column": {
    flexDirection: "column",
  },

  "flex-column-reverse": {
    flexDirection: "column-reverse",
  },

  "flex-center-y": {
    flexDirection: "row",
    alignItems: "center",
  },
  "flex-center-x": {
    flexDirection: "column",
    alignItems: "center",
  },

  // align

  "align-center": {
    alignItems: "center",
  },
  "align-items-center": {
    alignItems: "center",
  },
  "align-end": {
    alignItems: "flex-end",
  },
  "align-items-end": {
    alignItems: "flex-end",
  },
  "align-start": {
    alignItems: "flex-start",
  },
  "align-items-start": {
    alignItems: "flex-start",
  },
  "align-base": {
    alignItems: "baseline",
  },
  "align-items-base": {
    alignItems: "baseline",
  },
  "align-stretch": {
    alignItems: "stretch",
  },
  "align-items-stretch": {
    alignItems: "stretch",
  },
  "align-self-center": {
    alignSelf: "center",
  },
  "align-self-end": {
    alignSelf: "flex-end",
  },
  "align-self-start": {
    alignSelf: "flex-start",
  },
  "align-self-base": {
    alignSelf: "baseline",
  },
  "align-self-stretch": {
    alignSelf: "stretch",
  },

  //justify-content

  "justify-content-center": {
    justifyContent: "center",
  },
  "justify-content-end": {
    justifyContent: "flex-end",
  },
  "justify-content-start": {
    justifyContent: "flex-start",
  },
  "justify-content-between": {
    justifyContent: "space-between",
  },
  "justify-content-evenly": {
    justifyContent: "space-evenly",
  },
  "justify-content-around": {
    justifyContent: "space-around",
  },

  "justify-center": {
    justifyContent: "center",
  },
  "justify-end": {
    justifyContent: "flex-end",
  },
  "justify-start": {
    justifyContent: "flex-start",
  },
  "justify-between": {
    justifyContent: "space-between",
  },
  "justify-evenly": {
    justifyContent: "space-evenly",
  },
  "justify-around": {
    justifyContent: "space-around",
  },

  ...flexValueClass,
});

export default flexStyle;
