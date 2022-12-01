import styled from "styled-components";
import TodoItem from "./TodoItem";
import Footer from "./Footer";
import Filters from "./Filters";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useState } from "react";
import { useTodos, useTodosDispatch } from "../../providers/TodosProvider";
import FilterContext, { filters } from "./FilterContext";

const StyledWrapper = styled.div`
  background-color: var(--color-surface);
  border-radius: 5px;
  box-shadow: var(--card-shadow);
  z-index: 2;

  .todolist-placeholder {
    display: grid;
    place-items: center;
    padding: 40px 20px 20px;
    text-align: center;
    line-height: 1.2;
    font-size: 18px;
    color: var(--color-text-secondary);
  }
`;

function TodoList() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  const todos = useTodos();
  const dispatch = useTodosDispatch();

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
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
            />
          ))
        ) : (
          <div className="todolist-placeholder">
            {selectedFilter === filters.completed ? (
              <p>You haven't completed any todos yet</p>
            ) : (
              <p>
                Sit back and relax 🍹 <br /> You don't have anything todo
              </p>
            )}
          </div>
        )}

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
