import React from 'react';
import Layout from '../components/Layout';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import UnderConstruction from '../components/UnderConstruction';
import SEO from '../components/SEO';

const Projects = () => {
  return (
    <Layout>
      <SEO title="Projects" />
      <Container>
        <PageTitle>PROJECTS</PageTitle>
        <UnderConstruction />
      </Container>
    </Layout>
  );
};

export default Projects;
