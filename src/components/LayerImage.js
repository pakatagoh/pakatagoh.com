import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { media } from '../styles/sizes';

const IMAGE_SIZE = {
  lg: '400px',
  md: '250px',
  sm: '175px',
  xs: '100px',
};

const StyledWrapper = styled.div`
  padding-top: 5px;
  padding-left: 5px;

  ${media.sm`
    padding-top: 7px;
    padding-left: 7px
  `};

  ${media.md`
    padding-top: 10px;
    padding-left: 10px
  `};

  ${media.lg`
    padding-top: 15px;
    padding-left: 15px
  `};
`;

const StyledBackgroundLayer = styled.div`
  width: ${IMAGE_SIZE.xs};
  height: ${IMAGE_SIZE.xs};
  background-color: ${({ theme }) => theme.secondary.base};

  ${media.sm`
  width: ${IMAGE_SIZE.sm}
  height: ${IMAGE_SIZE.sm}
  `};

  ${media.md`
  width: ${IMAGE_SIZE.md}
  height: ${IMAGE_SIZE.md}
  `};

  ${media.lg`
  width: ${IMAGE_SIZE.lg}
  height: ${IMAGE_SIZE.lg}
  `};
`;

const StyledImageWrapper = styled.div`
  width: ${IMAGE_SIZE.xs};
  height: ${IMAGE_SIZE.xs};
  transform: translate(-5px, -5px);

  ${media.sm`
  width: ${IMAGE_SIZE.sm}
  height: ${IMAGE_SIZE.sm}
  transform: translate(-7px, -7px);
  `};

  ${media.md`
  width: ${IMAGE_SIZE.md}
  height: ${IMAGE_SIZE.md}
  transform: translate(-7px, -7px);
  `};

  ${media.md`
  width: ${IMAGE_SIZE.md}
  height: ${IMAGE_SIZE.md}
  transform: translate(-10px, -10px);
  `};

  ${media.lg`
  width: ${IMAGE_SIZE.lg}
  height: ${IMAGE_SIZE.lg}
  transform: translate(-15px, -15px);
  `};
`;

const LayerImage = ({ fluid, alt }) => {
  return (
    <StyledWrapper>
      <StyledBackgroundLayer>
        <StyledImageWrapper>
          <Img fluid={fluid} alt={alt} />
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
