import { useContext } from "react";
import styled, { css } from "styled-components";
import Button from "../Button";
import FilterContext, {filters} from "./FilterContext";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
  z-index: 2;

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
  const {selectedFilter, setSelectedFilter} = useContext(FilterContext);

  return (
    <StyledDiv standalone={standalone}>
      <StyledFilterBtn
        selected={selectedFilter === filters.all}
        onClick={() => setSelectedFilter(filters.all)}
      >
        All
      </StyledFilterBtn>
      <StyledFilterBtn
        selected={selectedFilter === filters.active}
        onClick={() => setSelectedFilter(filters.active)}
      >
        Active
      </StyledFilterBtn>
      <StyledFilterBtn
        selected={selectedFilter === filters.completed}
        onClick={() => setSelectedFilter(filters.completed)}
      >
        Completed
      </StyledFilterBtn>
    </StyledDiv>
  );
}

export default Filters;
