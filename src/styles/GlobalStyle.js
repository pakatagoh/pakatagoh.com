import { createGlobalStyle, css } from 'styled-components';
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

  /* Display utlities */
  .d-block {
    display: block;
  }

  .d-none {
    display: none;
  }
  
  ${media.md`
    .d-md-block {
      display: block;
    }

    .d-md-none {
      display: none;
    }
  `};

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

  /* Links */
  a {
    color: ${({ theme }) => theme.primary.base};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.primary.hover};
      border-bottom: 1px solid ${({ theme }) => theme.primary.hover};
      background-color: ${({ theme }) => theme.white2};
    }
    &:active {
      background-color: ${({ theme }) => theme.white};
      border-bottom: 1px solid ${({ theme }) => theme.primary.pressed};
      color: ${({ theme }) => theme.primary.pressed};
    }
  }
`;

export const StyledCSSAnchorReset = css`
  &:hover {
    color: inherit;
    border-bottom: none;
    background: none;
  }
  &:active {
    color: inherit;
    border-bottom: none;
    background: none;
  }
`;

export default GlobalStyle;
