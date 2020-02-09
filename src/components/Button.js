import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { media } from '../styles/sizes';
import isMobile from '../utils/isMobile';

const StyledButton = styled.button`
  padding: 6px 12px;
  display: inline-flex;
  align-items: center;
  border: none;
  background-color: ${({ color, theme }) => (theme[color] ? theme[color].base : theme.primary.base)};
  box-shadow: none;
  transition: box-shadow 0.1s linear;

  ${!isMobile() &&
    css`
      &:hover {
        background-color: ${({ color, theme }) => (theme[color] ? theme[color].hover : theme.primary.hover)};
        box-shadow: ${({ theme }) => theme.shadow.hover};
      }
    `}

  &:active {
    background-color: ${({ color, theme }) => (theme[color] ? theme[color].pressed : theme.primary.pressed)};
    box-shadow: ${({ theme }) => theme.shadow.pressed};
  }

  ${media.sm`
    padding: 8px 15px;  
  `};
`;

const Button = ({ children, color, onClick }) => {
  return (
    <StyledButton color={color} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
