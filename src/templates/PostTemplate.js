import React from 'react';
import PropType from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { rhythm } from '../utils/typography';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Container from '../components/Container';
import Section from '../components/Section';
import PageTitle from '../components/PageTitle';
import InlineLink from '../components/InlineLink';
import TableOfContents from '../components/TableOfContents';
import SectionHeader from '../components/SectionHeader';
import Callout from '../components/Callout';
import config from '../../config';
import formatDate from '../utils/formatDate';
import Small from '../components/Small';

const GITHUB_BLOB = '/blob/master/content';

const StyledArticle = styled.article`
  margin-bottom: ${rhythm(1)};
`;

const StyledSectionHeader = styled(SectionHeader)`
  border-bottom: 1px solid ${({ theme }) => theme.secondary.base};
`;

const StyledBlockQuote = styled.blockquote`
  margin-right: 0;
  margin-left: 0;
  padding: ${rhythm(1 / 2)} ${rhythm(1)};
  border: 2px solid ${({ theme }) => theme.secondary.base};
  background-color: ${({ theme }) => theme.secondary.disabled};
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
  blockquote: StyledBlockQuote,
};

const PostTemplate = ({ data }) => {
  const { mdx, postImage } = data;
  const { frontmatter, tableOfContents, fields } = mdx;
  const { slug } = fields;

  return (
    <Layout>
      <SEO
        isBlogPost
        title={frontmatter.title}
        description={frontmatter.description}
        slug={slug}
        image={postImage.childImageSharp.fluid.src}
      />
      <Container>
        <StyledArticle>
          <PageTitle>{frontmatter.title}</PageTitle>
          <Small>Posted: </Small>
          <Small as="time" dateTime={frontmatter.createdAt}>
            {formatDate(frontmatter.createdAt)} /{' '}
          </Small>
          {frontmatter.updatedAt && (
            <>
              <Small>Updated: </Small>
              <Small as="time" dateTime={frontmatter.updatedAt}>
                {formatDate(frontmatter.updatedAt)} /{' '}
              </Small>
            </>
          )}
          <InlineLink href={`${config.repo.link}${GITHUB_BLOB}${slug}`} target="_blank" rel="noopener noreferrer">
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
          <StyledInlineLink href={`${config.repo.link}${GITHUB_BLOB}${slug}`} target="_blank" rel="noopener noreferrer">
            Edit on GitHub
          </StyledInlineLink>
          /
          <StyledInlineLink
            href={`https://twitter.com/intent/tweet?text=${frontmatter.title}&url=${config.site.url}${slug}&via=${config.twitter.handle}`}
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
    </Layout>
  );
};

PostTemplate.propTypes = {
  data: PropType.shape({
    mdx: PropType.shape({
      frontmatter: PropType.shape({
        title: PropType.string.isRequired,
        description: PropType.string,
        createdAt: PropType.string.isRequired,
        updatedAt: PropType.string,
      }),
      body: PropType.string,
      tableOfContents: PropType.shape({
        items: PropType.array,
      }),
      fields: PropType.shape({
        slug: PropType.string,
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
      }
      frontmatter {
        title
        description
        createdAt(formatString: "YYYY-MM-DD")
        updatedAt(formatString: "YYYY-MM-DD")
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
