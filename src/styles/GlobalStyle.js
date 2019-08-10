import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  html{
    height: 100%;
    box-sizing: border-box;
  }
  body {
    min-height: 100%;
    margin: 0;
  }
  
  *, *:before, *:after {
  box-sizing: inherit;
  }

  .d-flex {
    display: flex;
  }

  .align-items-center {
    align-items: center;
  }

  .justify-content-center {
    justify-content: center;
  }

  .justify-content-space-between {
    justify-content: space-between;
  }
`;

export default GlobalStyle;
