import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
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

const StyledGatsbyImage = styled(Img)`
  & img {
    width: 100%;
    height: 100%;
    margin: 0;
    object-fit: cover;
    object-position: center;
  }
`;

const LayerImage = ({ fluid, alt }) => {
  return (
    <StyledWrapper>
      <StyledBackgroundLayer>
        <StyledImageWrapper>
          <StyledGatsbyImage fluid={fluid} alt={alt} />
        </StyledImageWrapper>
      </StyledBackgroundLayer>
    </StyledWrapper>
  );
};

LayerImage.propTypes = {
  fluid: PropTypes.shape({
    base64: PropTypes.string,
    aspectRatio: PropTypes.number,
    src: PropTypes.string,
    srcSet: PropTypes.string,
    sizes: PropTypes.string,
  }),
  alt: PropTypes.string.isRequired,
};

export default LayerImage;
