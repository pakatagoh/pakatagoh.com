import React from 'react';
import Layout from '../components/Layout';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import UnderConstruction from '../components/UnderConstruction';

const Blog = () => {
  return (
    <Layout>
      <Container>
        <PageTitle>BLOG</PageTitle>
        <UnderConstruction />
      </Container>
    </Layout>
  );
};

export default Blog;
