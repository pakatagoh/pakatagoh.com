import React from 'react';
import SEO from '../components/seo';
import Layout from '../components/Layout';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Container>
      <PageTitle>NOT FOUND</PageTitle>
      <p>
        The page you are searching for doesnt exist...{' '}
        <span role="img" aria-label="shrugging emoji">
          🤷‍♂️
        </span>
      </p>
    </Container>
  </Layout>
);

export default NotFoundPage;
