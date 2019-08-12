import { createGlobalStyle } from 'styled-components';
import { media } from './sizes';

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


  /* Flex utlities */
  .d-flex {
    display: flex;
  }

  .flex-row-wrap {
    flex-wrap: wrap;
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

  /* icons */
  i {
    color: ${({ theme }) => theme.black};
    font-size: 0.85rem;

    ${media.sm`
      font-size: 1rem;
    `};
  }

  .icon-sm {
    font-size: 1.05rem;

    ${media.sm`
      font-size: 1.25rem;
    `};
  }

  .icon-md {
    font-size: 1.3rem;

    ${media.sm`
      font-size: 1.5rem;
    `};
  }
`;

export default GlobalStyle;
