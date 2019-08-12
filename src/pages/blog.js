import React from 'react';
import Layout from '../components/Layout';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import UnderConstruction from '../components/UnderConstruction';
import SEO from '../components/SEO';

const Blog = () => {
  return (
    <Layout>
      <SEO title="Blog" />
      <Container>
        <PageTitle>BLOG</PageTitle>
        <UnderConstruction />
      </Container>
    </Layout>
  );
};

export default Blog;
