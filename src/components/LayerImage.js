import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../styles/sizes';

const IMAGE_SIZE = {
  lg: '400px',
  md: '250px',
};

const StyledWrapper = styled.div`
  padding-top: 15px;
  padding-left: 15px;
`;

const StyledBackgroundLayer = styled.div`
  width: ${IMAGE_SIZE.md};
  height: ${IMAGE_SIZE.md};
  background-color: ${({ theme }) => theme.secondary.base};

  ${media.lg`
  width: ${IMAGE_SIZE.lg}
  height: ${IMAGE_SIZE.lg}
  `};
`;

const StyledImageWrapper = styled.div`
  width: ${IMAGE_SIZE.md};
  height: ${IMAGE_SIZE.md};
  transform: translate(-15px, -15px);

  ${media.lg`
  width: ${IMAGE_SIZE.lg}
  height: ${IMAGE_SIZE.lg}
  `};
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  margin: 0;
  object-fit: cover;
  object-position: center;
`;

const LayerImage = ({ src, alt }) => {
  return (
    <StyledWrapper>
      <StyledBackgroundLayer>
        <StyledImageWrapper>
          <StyledImage src={src} alt={alt} />
        </StyledImageWrapper>
      </StyledBackgroundLayer>
    </StyledWrapper>
  );
};

LayerImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default LayerImage;
