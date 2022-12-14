import { createSlice, nanoid } from "@reduxjs/toolkit";

const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        added(state, action) {
            const newTodo = {
                id: nanoid(),
                text: action.payload.text,
                completed: false
            };
            state.unshift(newTodo);
        },
        toggled(state, action) {
            const toggledTodo = state.find(todo => todo.id === action.payload.id);
            toggledTodo.completed = !toggledTodo.completed;
        },
        deleted(state, action) {
            return state.filter(todo => todo.id !== action.payload.id);
        },
        clearedCompleted(state, action) {
            return state.filter(todo => !todo.completed);
        },
        reordered(state, action) {
            return action.payload.newOrder;
        }
    }
});

export const selectAllTodos = (state) => state.todos;
export const selectFilteredTodos = (state) => {
    const todos = state.todos;
    const selectedFilter = state.filters.selected;
    const selectableFilters = state.filters.selectable;

    switch (selectedFilter) {
        case selectableFilters.active:
            return todos.filter(todo => !todo.completed);
        case selectableFilters.completed:
            return todos.filter(todo => todo.completed);
        default:
            return todos;
    }
};

export const { added, toggled, deleted, clearedCompleted, reordered} = todosSlice.actions;
export default todosSlice.reducer;
