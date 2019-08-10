import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../styles/sizes';

const ICON_WRAPPER_SIZE = {
  xs: '24px',
  sm: '27px',
};

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
