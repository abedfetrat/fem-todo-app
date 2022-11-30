import styled, { css } from "styled-components";
import checkIcon from "../assets/images/icon-check.svg";

const StyledCheckBox = styled.input`
  cursor: pointer;
  display: grid;
  place-items: center;
  appearance: none;
  /* For iOS < 15 to remove gradient background */
  background-color: #fff;
  margin: 0;
  font: inherit;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background: transparent;

  &:checked {
    background: var(--check-bg);
    border: none;

    &::after {
      content: "";
      display: block;
      width: 11px;
      height: 9px;
      background-image: url(${checkIcon});
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      z-index: 10;
    }
  }

  @media screen and (min-width: 48em) {
    width: 24px;
    height: 24px;
  }
`;

function CheckBox(props) {
  return (
    <StyledCheckBox
      type="checkbox"
      checked={props.checked}
      onChange={props.onCheck}
      {...props}
    />
  );
}

export default CheckBox;
