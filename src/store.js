import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filtersSlice";
import todosReducer from "./todosSlice";

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        filters: filtersReducer
    }
});