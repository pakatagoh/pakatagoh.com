import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../styles/sizes';
import { rhythm } from '../utils/typography';

const StyledWrapper = styled.div`
  padding-top: ${rhythm(2 / 3)};
  padding-bottom: ${rhythm(2 / 3)};

  ${media.sm`
  padding-top: ${rhythm(3 / 3)};
  padding-bottom: ${rhythm(3 / 3)};
  `};
`;

const Block = ({ children, className }) => {
  return <StyledWrapper className={className}>{children}</StyledWrapper>;
};

Block.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Block;
