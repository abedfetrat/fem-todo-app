import styled from "styled-components";
import ThemeToggle from "./ThemeToggle";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 1.5rem; // 24px
    letter-spacing: 0.375em;
    line-height: 1;
    text-transform: uppercase;
    color: #fff;
  }

  @media screen and (min-width: 48em) {
    h1 {
      font-size: 2.5rem; // 40px
    }
  }
`;

function Header() {
  return (
    <StyledHeader>
      <h1>Todo</h1>
      <ThemeToggle />
    </StyledHeader>
  );
}

export default Header;
