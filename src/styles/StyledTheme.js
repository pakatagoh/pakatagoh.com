import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

export const theme = {
  black: '#2d2d2d',
  gray1: '#7d7d7d',
  gray2: '#aaaaaa',
  gray3: '#cacaca',
  white: '#f2f2f2',
  white2: '#f6f6f6',
  primary: {
    base: '#ffb148',
    hover: '#ff980e',
    pressed: '#f2900c',
    disabled: '#ffd7a1',
  },
  secondary: {
    base: '#94defa',
    hover: '#5dcaf3',
    pressed: '#58bfe6',
    disabled: '#b9e3f3',
  },
  shadow: {
    hover: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    hoverHigh: '0px 15px 15px 1px rgba(0, 0, 0, 0.25)',
    pressed: '0 1px 2px 0 rgba(0, 0, 0, 0.39)',
    pressedHigh: '0 4px 6px 0px rgba(0, 0, 0, 0.45)',
  },
};

const StyledTheme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <>{children}</>
    </ThemeProvider>
  );
};

StyledTheme.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StyledTheme;
