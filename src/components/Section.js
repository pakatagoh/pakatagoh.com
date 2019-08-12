import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../styles/sizes';
import Block from './Block';
import Subtitle from './Subtitle';

const StyledSectionHeader = styled.h2`
  margin-bottom: 0.6rem;

  ${media.sm`
    margin-bottom: 0.85rem;
  `};
`;
const Section = ({ header, subtitle, className, children }) => {
  return (
    <section className={className}>
      <Block>
        {header && <StyledSectionHeader>{header}</StyledSectionHeader>}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        {children}
      </Block>
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  header: PropTypes.string,
  subtitle: PropTypes.string,
};

export default Section;
