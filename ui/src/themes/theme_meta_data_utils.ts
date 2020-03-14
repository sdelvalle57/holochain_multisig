import { Theme } from './commons';
import { DefaultTheme } from './default_theme';

export const getThemeByName = (): Theme => {
    const themeReturn = new DefaultTheme();
    return themeReturn;
};
