import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { media } from '../styles/sizes';

const StyledWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
  ${media.sm`max-width: 540px`}
  ${media.md`max-width: 768px`}
  ${media.lg`max-width: 992px`}
  ${media.xl`max-width: 1200px`}
`;

const Container = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
