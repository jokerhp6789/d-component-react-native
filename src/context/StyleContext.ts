import React from 'react';
import {ColorSchemeName} from 'react-native';

const appState: IStyleStateContext = {};
const StyleStateContext = React.createContext<IStyleStateContext>(appState);

export default StyleStateContext;

export interface IStyleStateContext {
    locale?: string;
    useFontToLocale?: boolean;
    colorSchema?: ColorSchemeName;
}
