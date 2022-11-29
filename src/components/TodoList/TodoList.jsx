import styled from "styled-components";
import TodoItem from "./TodoItem";
import Footer from "./Footer";
import Filters from "./Filters";
import useMediaQuery from "../../hooks/useMediaQuery";

const StyledWrapper = styled.div`
  background-color: var(--color-surface);
  border-radius: 5px;
  box-shadow: var(--card-shadow);
`;

function TodoList() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  console.log(isMobile)
  return (
    <>
      <StyledWrapper>
        <TodoItem completed/>
        <TodoItem />
        <TodoItem />
        <Footer />
      </StyledWrapper>
      {isMobile && <Filters standalone />}
    </>
  );
}

export default TodoList;
