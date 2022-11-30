import { createContext } from "react";

const filters = {
    all: 0,
    active: 1,
    completed: 2,
  };

const FilterContext = createContext(filters.all);

export {FilterContext as default, filters};