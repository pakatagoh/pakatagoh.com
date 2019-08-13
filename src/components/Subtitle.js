import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../styles/sizes';
import { options } from '../utils/typography';

const StyledSubtitle = styled.p`
  font-size: 1.05rem;
  line-height: 1.38;
  margin-bottom: 1rem;

  ${media.sm`
    font-size: 1.25rem;
    line-height: 1.45;
    margin-bottom: 1.2rem;
  `}

  ${media.lg`
    font-size: 1.33rem;
    line-height: ${options.baseLineHeight};
    margin-bottom: ${options.baseLineHeight}rem;
  `}
`;

const Subtitle = ({ className, children }) => {
  return <StyledSubtitle className={className}>{children}</StyledSubtitle>;
};

Subtitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Subtitle;
