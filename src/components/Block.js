import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../styles/sizes';

const StyledWrapper = styled.div`
  padding: 30px 0;

  ${media.sm`
    padding: 50px 0;
  `};
`;

const Block = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

Block.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Block;
