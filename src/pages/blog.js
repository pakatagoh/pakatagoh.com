import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { rhythm } from '../utils/typography';
import Layout from '../components/Layout';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import SEO from '../components/SEO';
import formatDate from '../utils/formatDate';
import Small from '../components/Small';

const StyledArticle = styled.article`
  margin-bottom: ${rhythm(1)};
`;

const StyledSmall = styled(Small)`
  color: ${({ theme }) => theme.gray2};
`;

const StyledPostTitle = styled.h2`
  margin-bottom: ${rhythm(1 / 5)};

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

const StyledExcerpt = styled.p`
  margin-bottom: 0;
`;

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
            <StyledArticle key={id}>
              <StyledPostTitle>
                <Link to={slug}>{title}</Link>
              </StyledPostTitle>
              <StyledExcerpt>
                {excerpt}
                <StyledLink to={slug}>
                  READ POST <i className="icon-arrow_right_solid" />
                </StyledLink>
              </StyledExcerpt>
              <div>
                <StyledSmall>Posted: </StyledSmall>
                <StyledSmall forwardedAs="time" dateTime={updatedAt}>
                  {formatDate(createdAt)}
                </StyledSmall>
                {updatedAt && (
                  <>
                    <StyledSmall> / Updated: </StyledSmall>
                    <StyledSmall forwardedAs="time" dateTime={updatedAt}>
                      {formatDate(updatedAt)}
                    </StyledSmall>
                  </>
                )}
              </div>
            </StyledArticle>
          );
        })}
      </Container>
    </Layout>
  );
};

export default Blog;
