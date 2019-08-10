import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledRow = styled.div`
  display: flex;
  flex-wrap: flex-wrap;
  margin-left: -15px;
  margin-right: -15px;
`;

const Row = ({ children, className }) => {
  return <StyledRow className={className}>{children}</StyledRow>;
};

Row.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Row;
