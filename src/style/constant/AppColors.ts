/** @format */

const DefaultColors = {
    primary: "#041B47",
    primaryColor: "#041B47",
    secondary: "rgba(211, 15, 15, 0.87)",
    secondaryColor: "rgba(211, 15, 15, 0.87)",
    dark: "#0D0F12",
    light: "#FFFFFF",

    textColor: "#221D23",

    error: "#E63B2E",
    errorColor: "#E63B2E",
    success: "#ADC76F",
    successColor: "#ADC76F",
    warning: "#FF963C",
    warnColor: "#FF963C",
    disabled: "#9E9EA1",

    black: "#0D0F12",
    blackTrans: "rgba(0, 0, 0, 0.8)",
    blackOverlay: "rgba(0,0,0, 0.45)",
    white: "#FFFFFF",
    red: "#E63B2E",
    green: "#33963D",
    blue: "#17a2b8",
    blueLight: "#DAE6FF",
    yellow: "#FF963C",
    purple: "#791c96",
    pink: "#daa0e8",
    muted: "#F5F5F5",
    grayDark: "#bfbdbd",
    greyDark: "#bfbdbd",
    grey: "#d9d9d9",
    gray: "#d9d9d9",
    greyColor: "#d9d9d9",
    greyLight: "#f2f2f2",
    grayLight: "#f2f2f2",
};

export type ColorKeyType = keyof typeof DefaultColors | "transparent";

export default DefaultColors;
