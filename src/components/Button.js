import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.div`
  padding: 8px 15px;
  display: inline-block;
  border: none;
  background-color: ${({ color, theme }) => (theme[color] ? theme[color].base : theme.primary.base)};

  &:hover {
    background-color: ${({ color, theme }) => (theme[color] ? theme[color].hover : theme.primary.hover)};
    box-shadow: ${({ theme }) => theme.shadow.hover};
  }

  &:active {
    background-color: ${({ color, theme }) => (theme[color] ? theme[color].pressed : theme.primary.pressed)};
    box-shadow: ${({ theme }) => theme.shadow.pressed};
  }
`;

const Button = ({ children, color }) => {
  return <StyledButton color={color}>{children}</StyledButton>;
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};

export default Button;