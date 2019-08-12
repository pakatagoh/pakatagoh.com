import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../styles/sizes';
import Block from './Block';

const StyledPageTitle = styled.h1`
  font-size: 2.4rem;
  margin: 0;

  ${media.sm`
    font-size: 2.9rem;
  `};
  ${media.md`
    font-size: 3.3rem;
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
