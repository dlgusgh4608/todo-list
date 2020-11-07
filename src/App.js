import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Todo from './components/todo/Todo';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: 'Noto Sans CJK KR', Noto Sans KR, sans-serif;
  }
`;
const Container = styled.div`
  background-color: #e9ecef;
  padding-top: 20px;
  width: 100%;
  height: calc(100vh - 20px);
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Todo />
      </Container>
    </>
  );
};
export default App;
