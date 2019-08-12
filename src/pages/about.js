import React from 'react';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import UnderConstruction from '../components/UnderConstruction';

const About = () => {
  return (
    <Layout>
      <SEO title="About" />
      <Container>
        <PageTitle>ABOUT</PageTitle>
        <UnderConstruction />
      </Container>
    </Layout>
  );
};

export default About;
