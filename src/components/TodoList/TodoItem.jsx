import styled from "styled-components";
import CheckBox from "../CheckBox";
import Button from "../Button";
import { ReactComponent as CrossIcon } from "../../assets/images/icon-cross.svg";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border);

  .todo-item-text {
    text-decoration: ${({ completed }) =>
      completed ? "line-through" : "none"};
  }

  .todo-item-delete {
    margin-left: auto;
    line-height: 0;
  }

  @media screen and (min-width: 48em) {
    column-gap: 24px;
  }
`;

function TodoItem({ completed }) {
  return (
    <StyledWrapper completed={completed}>
      <CheckBox />
      <p className="todo-item-text">Item</p>
      <Button className="todo-item-delete">
        <CrossIcon />
      </Button>
    </StyledWrapper>
  );
}

export default TodoItem;
