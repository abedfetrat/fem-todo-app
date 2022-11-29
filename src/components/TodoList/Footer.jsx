import styled from "styled-components";
import Filters from "./Filters";
import Button from "../Button";
import useMediaQuery from "../../hooks/useMediaQuery";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  color: var(--color-text-secondary);
  font-size: 0.875rem;

  @media screen and (min-width: 48em) {
    padding: 20px 24px;
  }
`;

function Footer() {
  const isTablet = useMediaQuery("(min-width: 48em)");

  return (
    <StyledDiv>
      <p>5 items left</p>
      {isTablet && <Filters />}
      <Button>Clear completed</Button>
    </StyledDiv>
  );
}

export default Footer;
