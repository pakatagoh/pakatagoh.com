import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

const StyledGatsbyImg = styled(Img)`
  & img {
    margin-bottom: 0;
  }
`;

const Image = (props) => {
  return <StyledGatsbyImg {...props} />;
};

export default Image;
