import styled from "styled-components";
import NewTodo from "../features/todos/NewTodo";
import TodoList from "../features/todos/TodoList/TodoList";

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  margin-top: 40px;
  padding-bottom: 64px;

  @media screen and (min-width: 48em) {
    row-gap: 24px;
  }
`;

const StyledParagraph = styled.p`
  margin-inline: auto;
  margin-top: 40px;
  font-size: 0.875rem;
  color: var(--color-text-secondary);

  @media screen and (min-width: 48em) {
    margin-top: 30px;
  }
`;

function Main() {
  return (
    <StyledMain>
      <NewTodo />
      <TodoList />
      <StyledParagraph>Drag and drop to reorder list</StyledParagraph>
    </StyledMain>
  );
}

export default Main;
