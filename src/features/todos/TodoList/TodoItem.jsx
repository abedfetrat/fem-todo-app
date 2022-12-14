import styled, { css } from "styled-components";
import CheckBox from "../../../components/CheckBox";
import Button from "../../../components/Button";
import { ReactComponent as CrossIcon } from "../../../assets/images/icon-cross.svg";
import { Reorder } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleted, toggled } from "../todosSlice";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-surface);

  .todo-item-check {
    flex-shrink: 0;
  }

  .todo-item-text {
    cursor: pointer;
    width: 100%;
    word-break: break-all;
    white-space: pre-wrap;
    ${({ completed }) =>
      completed &&
      css`
        text-decoration: line-through;
        color: var(--color-text-secondary);
      `}
  }

  .todo-item-delete {
    margin-left: auto;
    flex-shrink: 0;
    line-height: 0;
  }

  @media screen and (min-width: 48em) {
    padding: 20px 24px;
    column-gap: 24px;

    .todo-item-delete {
      opacity: 0;
      transition: opacity 200ms ease;
    }

    &:hover,
    &:focus-within {
      .todo-item-delete {
        opacity: 1;
      }
    }
  }
`;

function TodoItem({ todo }) {
  const { id, text, completed } = todo;
  const dispatch = useDispatch();
  const [draging, setDraging] = useState(false);

  const handleChangeCompletion = () => {
    if (!draging) {
      dispatch(toggled({ id }));
    }
  };

  const handleDelete = () => {
    dispatch(deleted({ id }));
  };

  return (
    <Reorder.Item
      value={todo}
      onDragStart={(_) => setDraging(true)}
      onDragEnd={(_) => setTimeout(() => setDraging(false), 200)}
    >
      <StyledWrapper completed={completed}>
        <CheckBox
          className="todo-item-check"
          checked={completed}
          onCheck={handleChangeCompletion}
        />
        <p className="todo-item-text" onClick={handleChangeCompletion}>
          {text}
        </p>
        <Button className="todo-item-delete" onClick={handleDelete}>
          <CrossIcon />
        </Button>
      </StyledWrapper>
    </Reorder.Item>
  );
}

export default TodoItem;
