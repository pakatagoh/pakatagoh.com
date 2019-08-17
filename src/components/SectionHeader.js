import React from 'react';
import PropType from 'prop-types';
import styled from 'styled-components';
import { media } from '../styles/sizes';
import { scale, rhythm, baseHeaderScale } from '../utils/typography';

const StyledSectionHeader = styled.h2`
  ${({ as }) => (as ? scale(baseHeaderScale[as] * (9 / 10)) : scale(baseHeaderScale.h2 * (9 / 10)))};
  margin-bottom: ${rhythm(1 / 5)};

  ${media.sm`
  ${({ as }) => (as ? scale(baseHeaderScale[as] * (10 / 10)) : scale(baseHeaderScale.h2 * (10 / 10)))};
    margin-bottom: ${rhythm(2 / 5)};
    
  `};
`;

const SectionHeader = ({ children, ...rest }) => {
  return <StyledSectionHeader {...rest}>{children}</StyledSectionHeader>;
};

SectionHeader.propTypes = {
  children: PropType.node.isRequired,
};

export default SectionHeader;
