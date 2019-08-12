import React from 'react';
import Layout from '../components/Layout';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import UnderConstruction from '../components/UnderConstruction';

const About = () => {
  return (
    <Layout>
      <Container>
        <PageTitle>ABOUT</PageTitle>
        <UnderConstruction />
      </Container>
    </Layout>
  );
};

export default About;
