/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable indent */
/* eslint-disable radix */
/* eslint-disable operator-linebreak */
/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import _ from 'lodash';

const moneyFormat = (n: any) =>
    `${
        n
            ? Number(n)
                  .toFixed(0)
                  .replace(/./g, (c, i, a) =>
                      i > 0 && c !== '.' && (a.length - i) % 3 === 0
                          ? `,${c}`
                          : c,
                  )
            : '0'
    }`;
const moneyFormatFixed2 = (n: any) =>
    `${
        n
            ? Number(n)
                  .toFixed(2)
                  .replace(/./g, (c, i, a) =>
                      i > 0 && c !== '.' && (a.length - i) % 3 === 0
                          ? `,${c}`
                          : c,
                  )
            : '0'
    }`;

const moneyThaiFormat = (number: number) => {
    if (!number) {
        return `฿${0}`;
    }
    if (number < 0) {
        return `฿-${moneyFormat(`${Math.abs(number)}`)}`;
    }
    return `฿${moneyFormat(number)}`;
};

const moneyThaiFormatFixed2 = (number: string) => {
    if (!number) {
        return `฿${0}`;
    }
    return `฿${moneyFormatFixed2(number)}`;
};

const isAllDigit = (string: string) => {
    return /^\d+$/.test(string);
};

const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

const isEnglishAlphabet = (text: string) => {
    const regular = /^[a-zA-Z0-9$@$!%*?&#^-_. +--]+$/;
    return regular.test(text);
};

function convertCsvJSON(csv: any) {
    const lines = _.split(csv, '\n');
    const result = [];
    const headers = _.split(lines[0], ',');
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < lines.length; i++) {
        let validObject = false;
        // eslint-disable-next-line no-continue
        if (!lines[i]) continue;
        const objectItem: any = {};
        const currentline = lines[i].split(',');
        headers.forEach((header, index) => {
            const currentHeader = header.replace(/\W/g, '');
            const currentLineIndex = currentline[index];
            let currentValue = currentline[index]?.replace(/\W/g, '');
            if (currentLineIndex.includes('-')) {
                currentValue = `-${currentValue}`;
            }
            if (!_.isEmpty(currentValue)) {
                validObject = true;
                objectItem[currentHeader] = currentValue;
            }
        });
        if (validObject) {
            result.push(objectItem);
        }
    }
    return result;
}

const getExtensionFromFilename = (filename: string) => {
    if (!filename) {
        return '';
    }
    // eslint-disable-next-line no-bitwise
    return filename?.slice(((filename?.lastIndexOf('.') - 1) >>> 0) + 2);
};

function generateCode(length: number) {
    let result = '';
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        );
    }
    return result;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getFullNameStore(store: any) {
    if (!store) {
        return 'N/A';
    }
    return `${store?.name ?? ''} - ${store?.code ?? ''}`;
}

function getUniqueID() {
    const randomMath = Math.random().toString(36).substr(2, 9);
    return `${randomMath}${_.now()}`;
}

function removeAllSpace(str: string) {
    if (_.isEmpty(str)) return '';
    return str.replace(/\s/g, '');
}

function removeAllEnterAndSpace(str: string) {
    if (_.isEmpty(str)) return '';
    const convertArray = _.split(str, '\n');
    const filterArray = convertArray.map(string => string.replace(/\s/g, ''));
    return _.join(filterArray, '\n');
}

function convertToNumber(string = '') {
    const value = string.replace(/\D+/g, '');
    if (!value) {
        return '';
    }
    // eslint-disable-next-line radix
    return parseInt(value);
}

function validURL(str: string) {
    const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
        'i',
    ); // fragment locator
    return !!pattern.test(str);
}

function getYouTubeVideoId(url: string) {
    const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
}

function mapWatchToEmbedYouTube(url: string) {
    const videoId = getYouTubeVideoId(url);
    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
}

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

function removeHTMLTags(str: string | null | undefined) {
    if (str === null || str === '' || typeof str === 'undefined') return false;
    str = str.toString();

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/gi, '');
}

function getRandomNumber(minProps?: number, maxProps?: number) {
    const min = minProps ? Math.ceil(minProps) : 1;
    const max = maxProps ? Math.floor(maxProps) : 200;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

export function generateDummyText(wordProp?: string[], length?: number) {
    const words = wordProp?.length
        ? wordProp
        : [
              'The sky',
              'above',
              'the port',
              'was',
              'the color of television',
              'tuned',
              'to',
              'a dead channel',
              '.',
              'All',
              'this happened',
              'more or less',
              '.',
              'I',
              'had',
              'the story',
              'bit by bit',
              'from various people',
              'and',
              'as generally',
              'happens',
              'in such cases',
              'each time',
              'it',
              'was',
              'a different story',
              '.',
              'It',
              'was',
              'a pleasure',
              'to',
              'burn',
          ];
    const text = [];
    let x = length || getRandomNumber();
    while (--x) text.push(words[Math.floor(Math.random() * words.length)]);
    return text.join(' ');
}

export default {
    moneyFormat,
    moneyThaiFormat,
    isAllDigit,
    validateEmail,
    moneyThaiFormatFixed2,
    convertCsvJSON,
    getExtensionFromFilename,
    generateCode,
    getRandomNumber,
    getRandomColor,
    getFullNameStore,
    getUniqueID,
    removeAllSpace,
    removeAllEnterAndSpace,
    convertToNumber,
    validURL,
    isEnglishAlphabet,
    mapWatchToEmbedYouTube,
    phoneRegExp,
    removeHTMLTags,
    generateDummyText,
};
