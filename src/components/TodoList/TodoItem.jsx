import styled, { css } from "styled-components";
import CheckBox from "../CheckBox";
import Button from "../Button";
import { ReactComponent as CrossIcon } from "../../assets/images/icon-cross.svg";
import { useContext } from "react";
import { TodosDispatchContext } from "../../TodosContext";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border);

  .todo-item-text {
    cursor: pointer;
    ${({ completed }) =>
      completed &&
      css`
        text-decoration: line-through;
        color: var(--color-text-secondary);
      `}
  }

  .todo-item-delete {
    margin-left: auto;
    line-height: 0;
  }

  @media screen and (min-width: 48em) {
    column-gap: 24px;
  }
`;

function TodoItem({ id, text, completed }) {
  const dispatch = useContext(TodosDispatchContext);
  const handleChangeCompletion = () => {
    dispatch({
      type: "changed_completion",
      id: id,
      completed: !completed,
    });
  };

  const handleDelete = () => {
    dispatch({
      type: "deleted",
      id: id,
    });
  };

  return (
    <StyledWrapper completed={completed}>
      <CheckBox checked={completed} onCheck={handleChangeCompletion} />
      <p className="todo-item-text" onClick={handleChangeCompletion}>
        {text}
      </p>
      <Button className="todo-item-delete" onClick={handleDelete}>
        <CrossIcon />
      </Button>
    </StyledWrapper>
  );
}

export default TodoItem;
