import Routing from './route';
import { createGlobalStyle } from 'styled-components';
import React from 'react';

//Styled component global style

const GlobalStyle = createGlobalStyle`
  *,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
}


body {
  background-color: #f1f3f5;
  box-sizing: border-box;
  font-family: "lato", sans-serif;
  font-weight: 400;
  line-height: 1.7;
}
`;
function App() {
  return (
    <>
      <GlobalStyle />
      <Routing />
    </>
  );
}

export default App;
