import React from 'react';
import styled from 'styled-components';
import { media } from '../styles/sizes';

const StyledSmall = styled.small`
  font-size: 65%;
  ${media.sm`
    font-size: 80%;
  `};
`;

const Small = props => {
  return <StyledSmall {...props} />;
};

export default Small;
