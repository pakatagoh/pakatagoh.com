import React from 'react';
import PropType from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { rhythm } from '../utils/typography';
import SEO from '../components/SEO';
import Container from '../components/Container';
import Section from '../components/Section';
import PageTitle from '../components/PageTitle';
import InlineLink from '../components/InlineLink';
import TableOfContents from '../components/TableOfContents';
import SectionHeader from '../components/SectionHeader';
import Callout from '../components/Callout';
import config from '../../config';
import Small from '../components/Small';
import PostDates from '../components/PostDates';
import BlockQuote from '../components/BlockQuote';

const StyledArticle = styled.article`
  margin-bottom: ${rhythm(1)};
`;

const StyledSectionHeader = styled(SectionHeader)`
  border-bottom: 1px solid ${({ theme }) => theme.secondary.base};
`;

const StyledInlineLink = styled(InlineLink)`
  margin-left: ${rhythm(1 / 2)};
  margin-right: ${rhythm(1 / 2)};

  &:last-of-type {
    margin-right: 0;
  }
`;

const SectionHeaderH2 = props => <StyledSectionHeader {...props} />;
const SectionHeaderH3 = props => <SectionHeader as="h3" {...props} />;
const SectionHeaderH4 = props => <SectionHeader as="h4" {...props} />;
const PostLink = props => <InlineLink target="_blank" rel="noopener noreferrer" {...props} />;

const components = {
  h1: PageTitle,
  h2: SectionHeaderH2,
  h3: SectionHeaderH3,
  h4: SectionHeaderH4,
  a: PostLink,
  blockquote: BlockQuote,
};

const PostTemplate = ({ data }) => {
  const { mdx, postImage } = data;
  const { tableOfContents, fields } = mdx;
  const { slug, title, description, createdAt, updatedAt, editOnGithubLink } = fields;

  return (
    <>
      <SEO isBlogPost title={title} description={description} slug={slug} image={postImage.childImageSharp.fluid.src} />
      <Container>
        <StyledArticle>
          <PageTitle>{title}</PageTitle>
          <PostDates createdAt={createdAt} updatedAt={updatedAt} />
          <InlineLink href={editOnGithubLink} target="_blank" rel="noopener noreferrer">
            <Small>Edit on GitHub</Small>
          </InlineLink>
          <Section header="Table of Contents">
            <TableOfContents items={tableOfContents.items} path={slug} />
          </Section>
          <MDXProvider components={components}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
        </StyledArticle>
        <div className="d-flex justify-content-end">
          <StyledInlineLink href={editOnGithubLink} target="_blank" rel="noopener noreferrer">
            Edit on GitHub
          </StyledInlineLink>
          /
          <StyledInlineLink
            href={`https://twitter.com/intent/tweet?text=${title}&url=${config.site.url}${slug}&via=${config.twitter.handle}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Tweet
          </StyledInlineLink>
        </div>
      </Container>
      <aside>
        <Callout />
      </aside>
    </>
  );
};

PostTemplate.propTypes = {
  data: PropType.shape({
    mdx: PropType.shape({
      body: PropType.string,
      tableOfContents: PropType.shape({
        items: PropType.array,
      }),
      fields: PropType.shape({
        slug: PropType.string.isRequired,
        title: PropType.string.isRequired,
        description: PropType.string,
        createdAt: PropType.string.isRequired,
        updatedAt: PropType.string,
        isPublished: PropType.bool,
        editOnGithubLink: PropType.string.isRequired,
      }),
    }),
    postImage: PropType.shape({
      childImageSharp: PropType.shape({
        fluid: PropType.shape({
          src: PropType.string,
        }),
      }),
    }),
  }),
};

export const postQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      tableOfContents
      fields {
        slug
        title
        description
        createdAt
        updatedAt
        editOnGithubLink
      }
    }
    postImage: file(relativePath: { eq: "Logo.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default PostTemplate;
