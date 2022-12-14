import styled from "styled-components";
import TodoItem from "./TodoItem";
import Footer from "./Footer";
import Filters from "./Filters";
import useMediaQuery from "../../hooks/useMediaQuery";
import { motion, Reorder } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  clearedCompleted,
  reordered,
  selectAllTodos,
  selectFilteredTodos,
} from "../../todosSlice";
import {
  selectSelectedFilter,
  selectSelectableFilters,
} from "../../filtersSlice";

const StyledWrapper = styled(motion.div)`
  background-color: var(--color-surface);
  border-radius: 5px;
  box-shadow: var(--card-shadow);
  overflow: hidden;

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
  const dispatch = useDispatch();
  const todos = useSelector(selectAllTodos);
  const filteredTodos = useSelector(selectFilteredTodos);
  const uncompletedCount = todos.filter((todo) => !todo.completed).length;
  const selectableFilters = useSelector(selectSelectableFilters);
  const selectedFilter = useSelector(selectSelectedFilter);

  const handleClearCompleted = () => {
    dispatch(clearedCompleted());
  };

  const handleReorder = (newOrder) => {
    dispatch(reordered({ newOrder }));
  };

  const renderTodos = () => {
    return (
      <Reorder.Group
        key={selectedFilter}
        axis="y"
        values={filteredTodos}
        onReorder={handleReorder}
      >
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </Reorder.Group>
    );
  };

  const renderPlaceholder = () => {
    return (
      <motion.div className="todolist-placeholder" layout="position">
        {selectedFilter === selectableFilters.completed ? (
          <p>You haven't completed any todos yet</p>
        ) : (
          <p>
            Sit back and relax 🍹 <br /> You don't have anything todo
          </p>
        )}
      </motion.div>
    );
  };

  return (
    <>
      <StyledWrapper layout>
        {filteredTodos.length > 0 ? renderTodos() : renderPlaceholder()}
        <Footer
          uncompletedCount={uncompletedCount}
          onClearCompleted={handleClearCompleted}
        />
      </StyledWrapper>
      {isMobile && <Filters standalone />}
    </>
  );
}

export default TodoList;
