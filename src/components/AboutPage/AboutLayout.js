import React from 'react';
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/react';
import SEO from '../SEO';
import Container from '../Container';
import PageTitle from '../PageTitle';
import InlineLink from '../InlineLink';

const AnchorElement = props => <InlineLink {...props} target="_blank" rel="noopener noreferrer" />;

const components = {
  a: AnchorElement,
};

const AboutLayout = ({ children }) => {
  return (
    <>
      <SEO title="About" />
      <Container>
        <PageTitle block>ABOUT</PageTitle>
        <MDXProvider components={components}>{children}</MDXProvider>
      </Container>
    </>
  );
};

AboutLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AboutLayout;
