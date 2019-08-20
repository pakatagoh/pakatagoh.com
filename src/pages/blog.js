import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import SEO from '../components/SEO';
import formatDate from '../utils/formatDate';

const StyledPostTitle = styled.h2`
  & a {
    font-size: 1em;
    color: ${({ theme }) => theme.black};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.primary.hover};
      border-bottom: 1px solid ${({ theme }) => theme.primary.hover};
      background-color: ${({ theme }) => theme.white2};
    }
    &:active {
      background-color: ${({ theme }) => theme.white};
      border-bottom: 1px solid ${({ theme }) => theme.primary.pressed};
      color: ${({ theme }) => theme.primary.pressed};
    }
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.primary.base};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.primary.hover};
    border-bottom: 1px solid ${({ theme }) => theme.primary.hover};
    background-color: ${({ theme }) => theme.white2};
  }
  &:active {
    background-color: ${({ theme }) => theme.white};
    border-bottom: 1px solid ${({ theme }) => theme.primary.pressed};
    color: ${({ theme }) => theme.primary.pressed};
  }
`;

const Blog = () => {
  const data = useStaticQuery(graphql`
    query blogListQuery {
      allMdx(sort: { order: DESC, fields: frontmatter___createdAt }) {
        ...BlogInfo
      }
    }
  `);

  const { edges } = data.allMdx;
  return (
    <Layout>
      <SEO title="Blog" />
      <Container>
        <PageTitle block>BLOG</PageTitle>
        {edges.map(({ node: post }) => {
          const { excerpt, fields, id, frontmatter } = post;
          const { slug } = fields;
          const { title, createdAt, updatedAt } = frontmatter;

          return (
            <article key={id}>
              <StyledPostTitle>
                <Link to={slug}>{title}</Link>
              </StyledPostTitle>
              <p>
                {formatDate(createdAt)} {formatDate(updatedAt)}
              </p>
              <p>{excerpt}</p>
              <StyledLink to={slug}>Read post</StyledLink>
            </article>
          );
        })}
      </Container>
    </Layout>
  );
};

export default Blog;
