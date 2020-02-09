import React from 'react';
import SEO from '../components/SEO';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <Container>
      <PageTitle block>404: NOT FOUND</PageTitle>
      <p>
        The page you are searching for does not exist...{' '}
        <span role="img" aria-label="shrugging emoji">
          🤷‍♂️
        </span>
      </p>
    </Container>
  </>
);

export default NotFoundPage;
