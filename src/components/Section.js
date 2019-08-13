import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../styles/sizes';
import { rhythm, scale, baseHeaderScale } from '../utils/typography';
import Block from './Block';
import Subtitle from './Subtitle';

const StyledSectionHeader = styled.h2`
  ${scale(baseHeaderScale.h2 * (9 / 10))};
  margin-bottom: ${rhythm(1 / 5)};

  ${media.sm`
  ${scale(baseHeaderScale.h2 * (10 / 10))};
    margin-bottom: ${rhythm(2 / 5)};
    
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
