import { createGlobalStyle } from 'styled-components';
import { media } from './sizes';
import { options } from '../utils/typography';

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

  p,a{
    font-size: ${9.5 / 10}rem;
    line-height: ${options.baseLineHeight * (9.5 / 10)};
    margin-bottom: ${options.baseLineHeight * (9.5 / 10)}rem;

    ${media.sm`
      font-size: 1rem;
      line-height: ${options.baseLineHeight};
      margin-bottom: ${options.baseLineHeight}rem;
    `}
  }

  ul {
    margin-left: ${options.baseLineHeight * (9.5 / 10)}rem;
    margin-bottom: ${(options.baseLineHeight * (9.5 / 10)) / 2}rem;
    
    ${media.sm`
      margin-left: ${options.baseLineHeight}rem;
      margin-bottom: ${options.baseLineHeight}rem;
    `}
  }

  li {
    font-size: ${9.5 / 10}rem;
    line-height: ${options.baseLineHeight * (9.5 / 10)};
    margin-bottom: ${(options.baseLineHeight * (9.5 / 10)) / 2}rem;

    ${media.sm`
      font-size: 1rem;
      line-height: ${options.baseLineHeight};
      margin-bottom: ${options.baseLineHeight / 2}rem;
    `}

    & > ul, & > ol {
      margin-left: ${options.baseLineHeight * (9.5 / 10)}rem;
      margin-top: ${(options.baseLineHeight * (9.5 / 10)) / 2}rem;
      margin-bottom: ${(options.baseLineHeight * (9.5 / 10)) / 2}rem;
      
      ${media.sm`
        margin-left: ${options.baseLineHeight}rem;
        margin-top: ${options.baseLineHeight / 2}rem;
        margin-bottom: ${options.baseLineHeight / 2}rem;
      `}
    }
  }
`;

export default GlobalStyle;
