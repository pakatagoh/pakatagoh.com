import React from 'react';
import Layout from '../components/Layout';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import UnderConstruction from '../components/UnderConstruction';

const Projects = () => {
  return (
    <Layout>
      <Container>
        <PageTitle>PROJECTS</PageTitle>
        <UnderConstruction />
      </Container>
    </Layout>
  );
};

export default Projects;
