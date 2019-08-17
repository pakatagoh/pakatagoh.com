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
    disabled: '#ffeed7',
  },
  secondary: {
    base: '#94defa',
    hover: '#5dcaf3',
    pressed: '#58bfe6',
    disabled: '#eaf9ff',
  },
  shadow: {
    hover: '0px 7px 7px 2px rgba(0, 0, 0, 0.20)',
    pressed: '0 4px 6px 0px rgba(0, 0, 0, 0.50)',
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
