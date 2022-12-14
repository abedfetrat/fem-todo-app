import { useContext } from "react";
import styled, { css } from "styled-components";
import Button from "../Button";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  selected,
  selectSelectableFilters,
  selectSelectedFilter,
} from "../../filtersSlice";

const StyledDiv = styled(motion.div)`
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
  text-transform: capitalize;

  ${({ selected }) =>
    selected &&
    css`
      color: var(--bright-blue);
    `}
`;

function Filters({ standalone }) {
  const dispatch = useDispatch();
  const selectableFilters = useSelector(selectSelectableFilters);
  const selectedFilter = useSelector(selectSelectedFilter);

  return (
    <StyledDiv standalone={standalone} layout>
      {Object.entries(selectableFilters).map(([key, value]) => (
        <StyledFilterBtn
          key={key}
          selected={selectedFilter === value}
          onClick={() => dispatch(selected({ newSelection: value }))}
        >
          {value}
        </StyledFilterBtn>
      ))}
    </StyledDiv>
  );
}

export default Filters;
