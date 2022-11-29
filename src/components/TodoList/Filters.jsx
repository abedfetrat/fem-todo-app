import styled, { css } from "styled-components";
import Button from "../Button";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 20px;

  ${({ standalone }) =>
    standalone &&
    css`
      padding: 16px;
      border-radius: 5px;
      background-color: var(--color-surface);
      box-shadow: var(--card-shadow);
    `}
`;

const StyledFilterBtn = styled(Button)`
  font-size: 0.875rem;
  font-weight: 700;

  ${({ selected }) =>
    selected &&
    css`
      color: var(--bright-blue);
    `}
`;

function Filters({ standalone }) {
  return (
    <StyledDiv standalone={standalone}>
      <StyledFilterBtn selected>All</StyledFilterBtn>
      <StyledFilterBtn>Active</StyledFilterBtn>
      <StyledFilterBtn>Completed</StyledFilterBtn>
    </StyledDiv>
  );
}

export default Filters;
