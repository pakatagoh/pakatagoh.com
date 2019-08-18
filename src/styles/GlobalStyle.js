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
  
  ${media.sm`
    .d-sm-block {
      display: block;
    }
  `};
  
  ${media.md`
    .d-md-block {
      display: block;
    }

    .d-md-none {
      display: none;
    }
  `};

  /* Spacing utilities  */
  .m-0 {
    margin: 0;
  }

  /* Flex utlities */
  .d-flex {
    display: flex;
  }

  .flex-row-wrap {
    flex-wrap: wrap;
  }

  .align-items-start {
    align-items: flex-start;
  }

  .align-items-center {
    align-items: center;
  }

  ${media.sm`
    .align-items-sm-center{
      align-items: center;
    }
  `};
  
  .justify-content-center {
    justify-content: center;
  }

  .justify-content-space-between {
    justify-content: space-between;
  }

  .justify-content-end {
    justify-content: flex-end;
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

  /* Element tags */
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

  /* https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/?=prismjs#optional-add-line-highlighting-styles */
  .gatsby-highlight-code-line {
    background-color: rgb(70, 70, 70);
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 0.75em;
    border-left: 0.25em solid rgb(107, 107, 107);
  }

  /**
  * Add back the container background-color, border-radius, padding, margin
  * and overflow that we removed from <pre>.
  */
  .gatsby-highlight {
    background-color: #2d2d2d;
    margin: ${options.baseLineHeight * (9.5 / 10)}rem 0;
    padding: 1em;
    overflow: auto;

    ${media.sm`
      margin: ${options.baseLineHeight}rem 0;
    `}
  }

  /**
  * Remove the default PrismJS theme background-color, border-radius, margin,
  * padding and overflow.
  * 1. Make the element just wide enough to fit its content.
  * 2. Always fill the visible space in .gatsby-highlight.
  * 3. Adjust the position of the line numbers
  */
  .gatsby-highlight pre[class*='language-'] {
    background-color: transparent;
    margin: 0;
    padding: 0;
    overflow: initial;
    float: left; /* 1 */
    min-width: 100%; /* 2 */
  }

  /* https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/?=prismjs#optional-add-line-numbering */
  /* Adjust the position of the line numbers if using line numbers css*/
  .gatsby-highlight pre[class*='language-'].line-numbers {
    padding-left: 2.8em;
    padding-right: 1rem;
  }

  pre[class*='language-'] {
    font-size: ${9.5 / 10}rem;

    ${media.sm`
      font-size: ${10 / 10}rem;
    `}
  }

  
  /* inline code */
  :not(pre) > code[class*='language-'] {
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.black};
  padding: 2px 4px;
  white-space: normal;
}

`;

export default GlobalStyle;
