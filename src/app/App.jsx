import styled from "styled-components";
import Container from "../components/Container";
import Header from "../components/Header";
import Main from "../components/Main";
import ThemeProvider from "../providers/ThemeProvider";

const StyledApp = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

function App() {
  return (
    <ThemeProvider>
        <StyledApp>
          <Container>
            <Header />
            <Main />
          </Container>
        </StyledApp>
    </ThemeProvider>
  );
}

export default App;
