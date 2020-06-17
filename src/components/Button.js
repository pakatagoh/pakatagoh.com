import React from 'react';
import { animated, useSpring } from 'react-spring';
import styled, { css, useTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { media } from '../styles/sizes';
import isMobile from '../utils/isMobile';

const StyledButton = styled(animated.button)`
  padding: 6px 12px;
  display: inline-flex;
  align-items: center;
  border: none;
  ${!isMobile() &&
  css`
    background-color: ${({ color, theme }) => (theme[color] ? theme[color].base : theme.primary.base)};
    box-shadow: none;
    transition: box-shadow 0.1s linear;
    &:hover {
      background-color: ${({ color, theme }) => (theme[color] ? theme[color].hover : theme.primary.hover)};
      box-shadow: ${({ theme }) => theme.shadow.hover};
    }
    &:active {
      background-color: ${({ color, theme }) => (theme[color] ? theme[color].pressed : theme.primary.pressed)};
      box-shadow: ${({ theme }) => theme.shadow.pressed};
    }
  `}

  ${media.sm`
    padding: 8px 15px;  
  `};
`;

const Button = ({ children, color, onClick }) => {
  const theme = useTheme();
  const [spring, set] = useSpring(() => ({
    to: {
      boxShadow: theme.shadow.hover,
      backgroundColor: theme[color] ? theme[color].hover : theme.primary.hover,
    },
  }));

  const handleClick = () => {
    if (isMobile) {
      set({
        to: {
          boxShadow: theme.shadow.pressed,
          backgroundColor: theme[color] ? theme[color].pressed : theme.primary.pressed,
        },
        config: {
          duration: 80,
        },
        onRest: () => {
          set({
            boxShadow: theme.shadow.hover,
            backgroundColor: theme[color] ? theme[color].hover : theme.primary.hover,
          });
        },
      });
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <StyledButton color={color} onClick={handleClick} style={isMobile() ? spring : null}>
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
