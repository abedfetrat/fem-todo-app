import styled from "styled-components";

export default styled.button`
  cursor: pointer;
  background: none;
  border: none;
  color: var(--color-text-secondary);
  transition: color 150ms ease;

  &:hover,
  &:focus,
  &:active {
    color: var(--color-text);
  }
`;
