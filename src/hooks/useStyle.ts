import {useContext} from 'react';
import StyleStateContext from '../context/StyleContext';

export const useDarkMode = () => {
    const {colorSchema} = useContext(StyleStateContext);
    return colorSchema === 'dark';
};
