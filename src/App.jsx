import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import Container from "./components/Container";
import Header from "./components/Header";
import Main from "./components/Main";
import ThemeContext, { THEMES } from "./ThemeContext";
import useLocalStorageState from "./hooks/useLocalStorageState";
import { TodosContext, TodosDispatchContext } from "./TodosContext";
import { v4 as uuid } from "@lukeed/uuid";

const StyledApp = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

function App() {
  const [theme, setTheme] = useLocalStorageState("theme", THEMES.light);

  const [todos, dispatch] = useReducer(todosReducer, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
      <TodosContext.Provider value={todos}>
        <TodosDispatchContext.Provider value={dispatch}>
          <StyledApp>
            <Container>
              <Header />
              <Main />
            </Container>
          </StyledApp>
        </TodosDispatchContext.Provider>
      </TodosContext.Provider>
    </ThemeContext.Provider>
  );
}

function todosReducer(todos, action) {
  switch (action.type) {
    case "added": {
      return [
        ...todos,
        {
          id: uuid(),
          text: action.text,
          completed: false,
        },
      ];
    }
    case "changed_completion": {
      return todos.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            completed: action.completed,
          };
        }
        return todo;
      });
    }
    case "deleted": {
      return todos.filter(todo => todo.id !== action.id);
    }
    case "cleared_completed": {
      return todos.filter(todo => !todo.completed);
    }
  }
}

export default App;
