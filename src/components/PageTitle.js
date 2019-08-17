import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { scale } from '../utils/typography';
import { media } from '../styles/sizes';
import Block from './Block';

const StyledPageTitle = styled.h1`
  ${scale(8 / 10)};
  margin: 0;

  ${media.sm`
    ${scale(9 / 10)};
  `};
  ${media.md`
    ${scale(10 / 10)};
  `};
`;

const PageTitle = ({ block, as, children }) => {
  if (block) {
    return (
      <Block>
        <StyledPageTitle as={as}>{children}</StyledPageTitle>
      </Block>
    );
  }

  return <StyledPageTitle as={as}>{children}</StyledPageTitle>;
};

PageTitle.propTypes = {
  children: PropTypes.node.isRequired,
  block: PropTypes.bool,
  as: PropTypes.string,
};

export default PageTitle;
