import { useEffect, useReducer, createContext, useContext } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";
import { v4 as uuid } from "@lukeed/uuid";

const TodosContext = createContext(null);
const TodosDispatchContext = createContext(null);

function TodosProvider({ children }) {
    const [persistedTodos, setPersistedTodos] = useLocalStorageState(
        "todos",
        [],
        true
    );
    const [todos, dispatch] = useReducer(todosReducer, persistedTodos);

    useEffect(() => {
        setPersistedTodos(todos);
    }, [todos]);

    return (
        <TodosContext.Provider value={todos}>
            <TodosDispatchContext.Provider value={dispatch}>
                {children}
            </TodosDispatchContext.Provider>
        </TodosContext.Provider>
    );
}

function todosReducer(todos, action) {
    switch (action.type) {
        case "added": {
            return [
                {
                    id: uuid(),
                    text: action.text,
                    completed: false,
                },
                ...todos,
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
            return todos.filter((todo) => todo.id !== action.id);
        }
        case "cleared_completed": {
            return todos.filter((todo) => !todo.completed);
        }
        case "reordered": {
            return action.reorderedTodos;
        }
    }
}

function useTodos() {
    return useContext(TodosContext);
}

function useTodosDispatch() {
    return useContext(TodosDispatchContext);
}

export { TodosProvider as default, useTodos, useTodosDispatch };