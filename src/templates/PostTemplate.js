import React from 'react';
import PropType from 'prop-types';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import Layout from '../components/Layout';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import InlineLink from '../components/InlineLink';

const components = {
  h1: PageTitle,
  a: InlineLink,
};

const PostTemplate = ({ data }) => {
  const { mdx } = data;
  const { frontmatter } = mdx;
  return (
    <Layout>
      <Container>
        <PageTitle>{frontmatter.title}</PageTitle>
        <h2>{frontmatter.date}</h2>
        <MDXProvider components={components}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MDXProvider>
      </Container>
    </Layout>
  );
};

PostTemplate.propTypes = {
  data: PropType.shape({
    mdx: PropType.shape({
      frontmatter: PropType.shape({
        title: PropType.string,
        date: PropType.string,
        path: PropType.string,
      }),
      body: PropType.string,
    }),
  }),
};

export const postQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        date
      }
    }
  }
`;

export default PostTemplate;
