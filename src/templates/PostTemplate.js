import React from 'react';
import PropType from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';

const PostTemplate = ({ data }) => {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout>
      <Container>
        <PageTitle>{frontmatter.title}</PageTitle>
        <h2>{frontmatter.date}</h2>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    </Layout>
  );
};

PostTemplate.propTypes = {
  data: PropType.shape({
    markdownRemark: PropType.shape({
      frontmatter: PropType.shape({
        title: PropType.string,
        date: PropType.string,
        path: PropType.string,
      }),
      html: PropType.string,
    }),
  }),
};

export const postQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;

export default PostTemplate;
