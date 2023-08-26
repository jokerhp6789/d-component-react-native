/**
 * App Theme - Sizes
 */

const DefaultFont = {
  iosFont: "Poppins-Regular",
  androidFont: "Poppins-Reg",
  iosBoldFont: "Poppins-Bold",
  androidBoldFont: "Poppins-Bold",
  baseFontSize: 10,
};

export type AppFontKeyType = keyof typeof DefaultFont;

export default DefaultFont;
