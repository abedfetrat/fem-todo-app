import { createContext } from "react";

const THEMES = {
    light: 'light',
    dark: 'dark'
};

const ThemeContext = createContext({theme: THEMES.light, toggleTheme: () => {}});

export {ThemeContext as default, THEMES};