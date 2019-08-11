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

const StyledIconLink = styled.a`
  width: ${ICON_LINK_SIZE.xs};
  height: ${ICON_LINK_SIZE.xs};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.secondary.hover};
    box-shadow: ${({ theme }) => theme.shadow.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.secondary.pressed};
    box-shadow: ${({ theme }) => theme.shadow.pressed};
  }

  ${media.sm`
    width: ${ICON_LINK_SIZE.sm};
    height:${ICON_LINK_SIZE.sm};
  `};
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

const IconLink = ({ icon }) => {
  return (
    <StyledIconLink href={icon.to} target="_blank" rel="noreferrer noopener" aria-label={icon.name}>
      <StyledIconWrapper>
        <StyledIcon src={icon.src} alt={icon.name} />
      </StyledIconWrapper>
    </StyledIconLink>
  );
};

IconLink.propTypes = {
  icon: PropTypes.shape({
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }),
};

export default IconLink;
