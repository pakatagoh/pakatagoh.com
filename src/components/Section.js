import React from 'react';
import PropTypes from 'prop-types';
import Block from './Block';
import Subtitle from './Subtitle';
import SectionHeader from './SectionHeader';

const Section = ({ header, subtitle, className, children }) => {
  return (
    <section className={className}>
      <Block>
        {header && <SectionHeader>{header}</SectionHeader>}
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
