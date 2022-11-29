import { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "./components/Container";
import Header from "./components/Header";
import Main from "./components/Main";
import ThemeContext, { THEMES } from "./ThemeContext";
import useLocalStorageState from "./hooks/useLocalStorageState";

const StyledApp = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

function App() {
  const [theme, setTheme] = useLocalStorageState("theme", THEMES.light);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
      <StyledApp>
        <Container>
          <Header />
          <Main />
        </Container>
      </StyledApp>
    </ThemeContext.Provider>
  );
}

export default App;
