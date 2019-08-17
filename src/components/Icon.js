import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../styles/sizes';

export const ICON_SIZE = {
  xs: 19,
  sm: 24,
};

const StyledIconWrapper = styled.div`
  width: ${ICON_SIZE.xs}px;
  height: ${ICON_SIZE.xs}px;
  display: inline-block;

  ${media.sm`
    width: ${ICON_SIZE.sm}px;
    height: ${ICON_SIZE.sm}px;
  `};
`;

const StyledIcon = styled.img`
  width: 100%;
  height: 100%;
  object-position: center;
  object-fit: contain;
  margin: 0;
`;

const Icon = ({ src, alt }) => {
  return (
    <StyledIconWrapper>
      <StyledIcon src={src} alt={alt} />
    </StyledIconWrapper>
  );
};

Icon.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Icon;
