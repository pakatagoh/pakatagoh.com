import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  padding: 50px 0;
`;

const Block = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

Block.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Block;
