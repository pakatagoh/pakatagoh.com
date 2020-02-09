import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../styles/sizes';
import Image from './Image';

const IMAGE_SIZE = {
  lg: '300px',
  md: '230px',
  sm: '125px',
  xs: '90px',
};

export const OFFSET_PADDING = {
  xs: 5,
  sm: 7,
  md: 9,
  lg: 12,
};

const StyledWrapper = styled.div`
  padding-top: ${OFFSET_PADDING.xs}px;
  padding-left: ${OFFSET_PADDING.xs}px;

  ${media.sm`
    padding-top: ${OFFSET_PADDING.sm}px;
    padding-left: ${OFFSET_PADDING.sm}px
  `};

  ${media.md`
    padding-top: ${OFFSET_PADDING.md}px;
    padding-left: ${OFFSET_PADDING.md}px
  `};

  ${media.lg`
    padding-top: ${OFFSET_PADDING.lg}px;
    padding-left: ${OFFSET_PADDING.lg}px;
  `};
`;

const StyledBackgroundLayer = styled.div`
  width: ${IMAGE_SIZE.xs};
  height: ${IMAGE_SIZE.xs};
  background-color: ${({ theme }) => theme.secondary.base};
  box-shadow: ${({ theme }) => theme.shadow.hover};

  ${media.sm`
  width: ${IMAGE_SIZE.sm};
  height: ${IMAGE_SIZE.sm};
  `};

  ${media.md`
  width: ${IMAGE_SIZE.md};
  height: ${IMAGE_SIZE.md};
  `};

  ${media.lg`
  width: ${IMAGE_SIZE.lg};
  height: ${IMAGE_SIZE.lg};
  `};
`;

const StyledImageWrapper = styled.div`
  width: ${IMAGE_SIZE.xs};
  height: ${IMAGE_SIZE.xs};
  transform: translate(-${OFFSET_PADDING.xs}px, -${OFFSET_PADDING.xs}px);

  ${media.sm`
  width: ${IMAGE_SIZE.sm};
  height: ${IMAGE_SIZE.sm};
  transform: translate(-${OFFSET_PADDING.sm}px, -${OFFSET_PADDING.sm}px);
  `};

  ${media.md`
  width: ${IMAGE_SIZE.md};
  height: ${IMAGE_SIZE.md};
  transform: translate(-${OFFSET_PADDING.sm}px, -${OFFSET_PADDING.sm}px);
  `};

  ${media.md`
  width: ${IMAGE_SIZE.md};
  height: ${IMAGE_SIZE.md};
  transform: translate(-${OFFSET_PADDING.md}px, -${OFFSET_PADDING.md}px);
  `};

  ${media.lg`
  width: ${IMAGE_SIZE.lg};
  height: ${IMAGE_SIZE.lg};
  transform: translate(-${OFFSET_PADDING.lg}px, -${OFFSET_PADDING.lg}px);
  `};
`;

const LayerImage = ({ fluid, alt }) => {
  return (
    <StyledWrapper>
      <StyledBackgroundLayer>
        <StyledImageWrapper>
          <Image fluid={fluid} alt={alt} />
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
