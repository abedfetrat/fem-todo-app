import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectable: {
        all: 'all',
        active: 'active',
        completed: 'completed'
    },
    selected: 'all'
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        selected(state, action) {
            state.selected = action.payload.newSelection;
        }
    }
});

export const selectSelectableFilters = (state) => state.filters.selectable;
export const selectSelectedFilter = (state) => state.filters.selected;

export const { selected } = filtersSlice.actions;
export default filtersSlice.reducer;