import _ from 'lodash';
import {Platform, TextStyle} from 'react-native';
import DefaultFont, {AppFontKeyType} from '../constant/AppFonts';

export class FontClass {
    [key: string]: any;

    constructor() {
        Object.assign(this, DefaultFont);
    }

    /**
     * Load custom set of fonts
     * arguments:
     * fonts - map of keys and font family values e.g {iosFont: Poppins-Regular}
     */
    public loadFonts(fonts: {
        [key: string]: string | number | TextStyle | {[key: string]: any};
    }) {
        const {baseFontSize, locale, ios, android, ...rest} = fonts || {};
        const {normal: iosFont, bold: iosBoldFont} = (ios as any) || {};
        const {normal: androidFont, bold: androidBoldFont} =
            (android as any) || {};
        const baseSize = baseFontSize || this.baseFontSize;
        this.fontClass = {
            h0: {
                fontSize: baseSize + 10,
                // lineHeight: base.fontSize * 2 * 1.1,
                ...this.getFont({iosFont, androidFont} as any),
            },
            h1: {
                fontSize: baseSize + 8,
                // lineHeight: base.fontSize * 1.8 * 1.2,
                ...this.getFont({iosFont, androidFont} as any),
            },
            h2: {
                fontSize: baseSize + 6,
                // lineHeight: base.fontSize * 1.6 * 1.3,
                ...this.getFont({iosFont, androidFont} as any),
            },
            h3: {
                fontSize: baseSize + 4,
                // lineHeight: base.fontSize * 1.4 * 1.4,
                ...this.getFont({iosFont, androidFont} as any),
            },
            h4: {
                fontSize: baseSize + 2,
                // lineHeight: base.fontSize * 1.2 * 1.5,
                ...this.getFont({iosFont, androidFont} as any),
            },
            h5: {
                fontSize: baseSize,
                // lineHeight: base.fontSize * 2 * 1.1,
                ...this.getFont({iosFont, androidFont} as any),
            },
            text: {
                fontSize: baseSize,
                // lineHeight: base.fontSize * 2 * 1.1,
                ...this.getFont({iosFont, androidFont} as any),
            },
            'font-weight-bold': {
                ...this.getBoldFont({iosBoldFont, androidBoldFont} as any),
            },
            ...rest,
        };
        this.locale = locale;
    }

    private getFont({
        iosFont,
        androidFont,
    }: {
        iosFont?: string;
        androidFont?: string;
    }) {
        return Platform.select({
            ios: {
                fontFamily: iosFont || this.iosFont,
            },
            android: {
                fontFamily: androidFont || this.androidFont,
            },
        });
    }

    private getBoldFont({
        iosBoldFont,
        androidBoldFont,
    }: {
        iosBoldFont?: string;
        androidBoldFont?: string;
    }) {
        return Platform.select({
            ios: {
                fontFamily: iosBoldFont || this.iosBoldFont,
            },
            android: {
                fontFamily: androidBoldFont || this.androidBoldFont,
            },
        });
    }

    fontClass: any = {
        h0: {
            fontSize: this.baseFontSize + 10,
            // lineHeight: base.fontSize * 2 * 1.1,
            ...this.getFont({}),
        },
        h1: {
            fontSize: this.baseFontSize + 8,
            // lineHeight: base.fontSize * 1.8 * 1.2,
            ...this.getFont({}),
        },
        h2: {
            fontSize: this.baseFontSize + 6,
            // lineHeight: base.fontSize * 1.6 * 1.3,
            ...this.getFont({}),
        },
        h3: {
            fontSize: this.baseFontSize + 4,
            // lineHeight: base.fontSize * 1.4 * 1.4,
            ...this.getFont({}),
        },
        h4: {
            fontSize: this.baseFontSize + 2,
            // lineHeight: base.fontSize * 1.2 * 1.5,
            ...this.getFont({}),
        },
        h5: {
            fontSize: this.baseFontSize,
            ...this.getFont({}),
        },
        text: {
            fontSize: this.baseFontSize,
            ...this.getFont({}),
        },
        'font-weight-bold': {
            ...this.getBoldFont({}),
        },
    };
}

const Fonts = new FontClass();
Fonts.loadFonts(DefaultFont);

export default Fonts;
