import { useState } from "react";
import styled from "styled-components";
import { useTodosDispatch } from "../providers/TodosProvider";

const StyledWrapper = styled.div`
  position: relative;
  height: 48px;
  @media screen and (min-width: 48em) {
    height: 64px;
  }
`;

const StyledRing = styled.div`
  position: absolute;
  top: 50%;
  left: 20px;
  z-index: 2;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  @media screen and (min-width: 48em) {
    left: 24px;
    width: 24px;
    height: 24px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  padding-left: 52px;
  padding-right: 24px;
  border: none;
  border-radius: 5px;
  background-color: var(--color-surface);
  box-shadow: var(--card-shadow);

  ::placeholder {
    opacity: 1;
    color: var(--color-text-secondary);
  }

  &:focus {
    outline-offset: 0;
  }

  @media screen and (min-width: 48em) {
    padding-left: 72px;
  }
`;

function NewTodo() {
  const [text, setText] = useState("");
  const dispatch = useTodosDispatch();

  const handleAddTodo = () => {
    if (text.length > 0) {
      dispatch({
        type: "added",
        text: text
      });
      setText("");
    }
  };

  return (
    <StyledWrapper>
      <StyledRing></StyledRing>
      <StyledInput
        placeholder="Create a new todo...."
        value={text}
        onChange={({ target }) => setText(target.value)}
        onKeyDown={({ key }) => key === "Enter" && handleAddTodo()}
      />
    </StyledWrapper>
  );
}

export default NewTodo;
