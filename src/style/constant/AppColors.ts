/** @format */

const DefaultColors = {
    primary: '#041B47',
    primaryColor: '#041B47',
    textColor: '#221D23',

    secondary: 'rgba(211, 15, 15, 0.87)',
    secondaryColor: 'rgba(211, 15, 15, 0.87)',

    error: '#E63B2E',
    errorColor: '#E63B2E',
    red: '#E63B2E',
    warning: '#FF963C',
    warnColor: '#FF963C',
    yellow: '#FF963C',

    success: '#ADC76F',
    successColor: '#ADC76F',
    green: '#33963D',

    blueLight: '#DAE6FF',
    blue: '#17a2b8',

    pink: '#daa0e8',
    purple: '#791c96',

    dark: '#0D0F12',
    black: '#0D0F12',
    blackTrans: 'rgba(0, 0, 0, 0.8)',
    blackOverlay: 'rgba(0,0,0, 0.45)',

    light: '#FFFFFF',
    white: '#FFFFFF',
    muted: '#F5F5F5',
    greyLight: '#f2f2f2',
    grey: '#d9d9d9',
    gray: '#d9d9d9',
    greyColor: '#d9d9d9',
    grayDark: '#bfbdbd',
    greyDark: '#bfbdbd',
    disabled: '#9E9EA1',
};

export type ColorKeyType = keyof typeof DefaultColors | 'transparent';

export default DefaultColors;
