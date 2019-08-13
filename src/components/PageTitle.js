import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { scale } from '../utils/typography';
import { media } from '../styles/sizes';
import Block from './Block';

const StyledPageTitle = styled.h1`
  ${scale(0.83)};
  margin: 0;

  ${media.sm`
    ${scale(0.93)};
  `};
  ${media.md`
    ${scale(1)};
  `};
`;

const PageTitle = ({ children, as }) => {
  return (
    <Block>
      <StyledPageTitle as={as}>{children}</StyledPageTitle>
    </Block>
  );
};

PageTitle.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.string,
};

export default PageTitle;
