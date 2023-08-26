import React, { Context } from "react";

const appState: any = null;
const StyleStateContext: Context<IStyleStateContext> = React.createContext<any>(appState);

export default StyleStateContext;

export interface IStyleStateContext {
  locale?: string;
  useFontToLocale?: boolean;
}
