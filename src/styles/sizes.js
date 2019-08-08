import { css } from 'styled-components';

export const sizes = {
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 576,
};

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;
  return accumulator;
}, {});
