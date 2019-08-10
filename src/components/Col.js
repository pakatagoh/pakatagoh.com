import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCol = styled.div`
  width: 100%;
  max-width: 100%;
  padding: 0 15px;
  flex: 1 1 0;
`;

const Col = ({ children, className }) => {
  return <StyledCol className={className}>{children}</StyledCol>;
};

Col.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Col;
