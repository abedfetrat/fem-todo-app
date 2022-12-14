import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "../features/filters/filtersSlice";
import todosReducer from "../features/todos/todosSlice";

const loadStateFromStorage = () => {
    const persistedState = JSON.parse(localStorage.getItem('app_state'));
    return persistedState ? persistedState : {};
};

const saveStateToStorage = () => {
    const state = store.getState();
    localStorage.setItem('app_state', JSON.stringify(state));
};

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        filters: filtersReducer
    },
    preloadedState: loadStateFromStorage()
});

store.subscribe(saveStateToStorage);