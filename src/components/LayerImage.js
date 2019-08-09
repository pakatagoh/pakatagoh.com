import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  padding-top: 15px;
  padding-left: 15px;
`;

const StyledBackgroundLayer = styled.div`
  width: 400px;
  height: 400px;
  background-color: ${({ theme }) => theme.secondary.base};
`;

const StyledImageWrapper = styled.div`
  width: 400px;
  height: 400px;
  transform: translate(-15px, -15px);
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
