import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../styles/sizes';
import Icon, { ICON_SIZE } from './Icon';

const ICON_BACKGROUND_SIZE = {
  xs: ICON_SIZE.xs + 9,
  sm: ICON_SIZE.sm + 9,
};

const StyledIconBackground = styled.div`
  width: ${ICON_BACKGROUND_SIZE.xs}px;
  height: ${ICON_BACKGROUND_SIZE.xs}px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ color, theme }) => (theme[color] ? theme[color].base : theme.secondary.base)};
  box-shadow: none;
  transition: box-shadow 0.1s linear;

  ${media.sm`
    width: ${ICON_BACKGROUND_SIZE.sm}px;
    height:${ICON_BACKGROUND_SIZE.sm}px;
  `};
`;

const StyledIconLink = styled.a`
  margin-bottom: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${({ color, theme }) => (theme[color] ? theme[color].base : theme.black)};

  &:hover {
    color: ${({ color, theme }) => (theme[color] ? theme[color].hover : theme.secondary.hover)};

    ${StyledIconBackground} {
      background-color: ${({ color, theme }) => (theme[color] ? theme[color].hover : theme.secondary.hover)};
      box-shadow: ${({ theme }) => theme.shadow.hover};
    }
  }

  &:active {
    color: ${({ color, theme }) => (theme[color] ? theme[color].pressed : theme.secondary.pressed)};

    ${StyledIconBackground} {
      background-color: ${({ color, theme }) => (theme[color] ? theme[color].pressed : theme.secondary.pressed)};
      box-shadow: ${({ theme }) => theme.shadow.pressed};
    }
  }
`;

const SocialIconLink = ({ icon, color, children }) => {
  return (
    <StyledIconLink color={color} href={icon.to} target="_blank" rel="noreferrer noopener" aria-label={icon.name}>
      <StyledIconBackground color={color}>
        <Icon src={icon.src} alt={icon.name} />
      </StyledIconBackground>
      {children}
    </StyledIconLink>
  );
};

SocialIconLink.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.shape({
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }),
};

export default SocialIconLink;
