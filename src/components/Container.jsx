import styled from "styled-components";

const StyledDiv = styled.div`
  width: min(100%, calc(540px + 48px)); // 540px + 48px
  margin-inline: auto;
  padding-inline: 24px; // 24px
  padding-top: 48px;

  @media screen and (min-width: 48em) {
    padding-top: 70px;
  }
`;

function Container({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}

export default Container;
