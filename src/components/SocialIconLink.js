import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../styles/sizes';

const ICON_LINK_SIZE = {
  xs: '32px',
  sm: '38px',
};

const ICON_WRAPPER_SIZE = {
  xs: '24px',
  sm: '27px',
};

const StyledIconBackground = styled.div`
  width: ${ICON_LINK_SIZE.xs};
  height: ${ICON_LINK_SIZE.xs};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ color, theme }) => (theme[color] ? theme[color].base : theme.secondary.base)};
  box-shadow: none;
  transition: box-shadow 0.1s linear;

  ${media.sm`
    width: ${ICON_LINK_SIZE.sm};
    height:${ICON_LINK_SIZE.sm};
  `};
`;

const StyledIconLink = styled.a`
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

const StyledIconWrapper = styled.div`
  width: ${ICON_WRAPPER_SIZE.xs};
  height: ${ICON_WRAPPER_SIZE.xs};
  display: inline-block;

  ${media.sm`
    width: ${ICON_WRAPPER_SIZE.sm};
    height: ${ICON_WRAPPER_SIZE.sm};
  `};
`;

const StyledIcon = styled.img`
  width: 100%;
  height: 100%;
  object-position: center;
  object-fit: contain;
  margin: 0;
`;

const SocialIconLink = ({ icon, color, children }) => {
  return (
    <StyledIconLink color={color} href={icon.to} target="_blank" rel="noreferrer noopener" aria-label={icon.name}>
      <StyledIconBackground color={color}>
        <StyledIconWrapper>
          <StyledIcon src={icon.src} alt={icon.name} />
        </StyledIconWrapper>
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
