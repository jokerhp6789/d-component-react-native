/* eslint-disable import/prefer-default-export */
import _ from "lodash";
import { Appearance } from "react-native";
import Colors from "./_color";

type Schemes = {
  light: { [key: string]: string };
  dark: { [key: string]: string };
};
type SchemeType = "default" | "light" | "dark";

export class SchemaClass {
  [key: string]: any;

  schemes: Schemes = { light: {}, dark: {} };

  currentScheme: SchemeType = "default";

  constructor() {
    Object.assign(this, Colors);

    Appearance.addChangeListener(() => {
      if (this.currentScheme === "default") {
        Object.assign(
          this,
          this.schemes[Appearance.getColorScheme() ?? "light"]
        );
      }
    });
  }

  /**
   * Load set of schemes for light/dark mode
   * arguments:
   * schemes - two sets of map of colors e.g {light: {screen: 'white'}, dark: {screen: 'black'}}
   */

  loadSchemes(schemes: Schemes) {
    const lightSchemeKeys = Object.keys(schemes.light);
    const darkSchemeKeys = Object.keys(schemes.dark);

    const missingKeys = _.xor(lightSchemeKeys, darkSchemeKeys);
    if (!_.isEmpty(missingKeys)) {
      console.error(
        `There is a mismatch in scheme keys: ${missingKeys.join(", ")}`
      );
    }

    this.schemes = schemes;
    const colorScheme = this.getScheme();
    Object.assign(this, this.schemes[colorScheme]);
  }

  /**
   * Get app's current color scheme
   */
  getScheme(): "light" | "dark" {
    const scheme =
      this.currentScheme === "default"
        ? Appearance.getColorScheme()
        : this.currentScheme;
    return scheme ?? "light";
  }

  /**
   * Set color scheme for app
   * arguments:
   * scheme - color scheme e.g light/dark/default
   */
  setScheme(scheme: SchemeType) {
    if (!["light", "dark", "default"].includes(scheme)) {
      throw new Error(
        `${scheme} is invalid colorScheme, please use 'light' | 'dark' | 'default'`
      );
    }
    this.currentScheme = scheme;
    const colorScheme = this.getScheme();
    Object.assign(this, this.schemes[colorScheme]);
  }
}
//@ts-ignore
const Scheme = new SchemaClass();
export default Scheme;
