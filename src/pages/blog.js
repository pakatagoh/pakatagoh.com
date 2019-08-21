import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/Layout';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import BlogListItem from '../components/BlogListItem';
import SEO from '../components/SEO';

const Blog = () => {
  const data = useStaticQuery(graphql`
    query blogListQuery {
      allMdx(
        sort: { order: DESC, fields: frontmatter___createdAt }
        filter: { frontmatter: { isPublished: { eq: true } } }
      ) {
        ...BlogInfo
      }
    }
  `);

  const { edges: posts } = data.allMdx;
  return (
    <Layout>
      <SEO title="Blog" />
      <Container>
        <PageTitle block>BLOG</PageTitle>
        {posts.length > 0 ? (
          posts.map(({ node: post }) => {
            const { excerpt, fields, id, frontmatter } = post;
            const { slug } = fields;
            const { title, createdAt, updatedAt } = frontmatter;
            const blogListItemProps = {
              excerpt,
              slug,
              title,
              createdAt,
              updatedAt,
            };
            return <BlogListItem key={id} {...blogListItemProps} />;
          })
        ) : (
          <p>
            No posts to show at the moment{' '}
            <span role="img" aria-label="sad face">
              😭
            </span>
          </p>
        )}
      </Container>
    </Layout>
  );
};

export default Blog;
