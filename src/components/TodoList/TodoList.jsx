import styled from "styled-components";
import TodoItem from "./TodoItem";
import Footer from "./Footer";
import Filters from "./Filters";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useContext, useState } from "react";
import { TodosContext, TodosDispatchContext } from "../../TodosContext";
import FilterContext, { filters } from "./FilterContext";

const StyledWrapper = styled.div`
  background-color: var(--color-surface);
  border-radius: 5px;
  box-shadow: var(--card-shadow);
`;

function TodoList() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  const todos = useContext(TodosContext);
  const dispatch = useContext(TodosDispatchContext);

  const [selectedFilter, setSelectedFilter] = useState(filters.all);

  const uncompletedCount = todos.filter((todo) => !todo.completed).length;

  const filteredTodos = todos.filter((todo) => {
    switch (selectedFilter) {
      case filters.active:
        return !todo.completed;
      case filters.completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  const handleClearCompleted = () => {
    dispatch({
      type: "cleared_completed",
    });
  };

  return (
    <FilterContext.Provider
      value={{
        selectedFilter: selectedFilter,
        setSelectedFilter: setSelectedFilter,
      }}
    >
      <StyledWrapper>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
          />
        ))}
        <Footer
          uncompletedCount={uncompletedCount}
          onClearCompleted={handleClearCompleted}
        />
      </StyledWrapper>
      {isMobile && <Filters standalone />}
    </FilterContext.Provider>
  );
}

export default TodoList;
