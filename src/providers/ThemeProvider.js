import { useEffect, createContext, useContext } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";

const THEMES = {
    light: 'light',
    dark: 'dark'
};

const ThemeContext = createContext({ theme: THEMES.light, toggleTheme: () => { } });

function ThemeProvider({ children }) {
    const [theme, setTheme] = useLocalStorageState("theme", THEMES.light);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

function useTheme() {
    return useContext(ThemeContext);
}

export { ThemeProvider as default, useTheme };