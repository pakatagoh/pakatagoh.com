import React from 'react';
import PropType from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import format from 'date-fns/format';
import { media } from '../styles/sizes';
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

const REPO = 'https://github.com/pakatagoh/pakatagoh.com';
const GITHUB_BLOB = '/blob/master/content';

const StyledArticle = styled.article`
  margin-bottom: ${rhythm(1)};
`;

const StyledSmall = styled.small`
  font-size: 65%;
  ${media.sm`
    font-size: 80%;
  `};
`;

const StyledTime = styled.time`
  font-size: 65%;
  ${media.sm`
    font-size: 80%;
  `};
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

  const formatDate = date => format(date, 'DD MMM YYYY');

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
          <StyledTime dateTime={frontmatter.createdAt}>Posted: {formatDate(frontmatter.createdAt)} / </StyledTime>
          {frontmatter.updatedAt && (
            <>
              <StyledTime dateTime={frontmatter.updatedAt}>Updated: {formatDate(frontmatter.updatedAt)} / </StyledTime>
            </>
          )}
          <InlineLink href={`${REPO}${GITHUB_BLOB}${slug}/index.mdx`} target="_blank" rel="noopener noreferrer">
            <StyledSmall>Edit on GitHub</StyledSmall>
          </InlineLink>
          <Section header="Table of Contents">
            <TableOfContents items={tableOfContents.items} path={slug} />
          </Section>
          <MDXProvider components={components}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
        </StyledArticle>
        <div className="d-flex justify-content-end">
          <StyledInlineLink href={`${REPO}${GITHUB_BLOB}${slug}/index.mdx`} target="_blank" rel="noopener noreferrer">
            Edit on GitHub
          </StyledInlineLink>
          /
          <StyledInlineLink
            href={`https://twitter.com/intent/tweet?text=${frontmatter.title}&url=https://pakatagoh.com${slug}&via=GohPakata`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Tweet
          </StyledInlineLink>
        </div>
      </Container>
      <section>
        <Callout />
      </section>
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
    postImage: file(relativePath: { eq: "Logo.png" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default PostTemplate;
