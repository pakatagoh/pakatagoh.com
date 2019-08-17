import React from 'react';
import PropType from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { media } from '../styles/sizes';
import Layout from '../components/Layout';
import Container from '../components/Container';
import Section from '../components/Section';
import PageTitle from '../components/PageTitle';
import InlineLink from '../components/InlineLink';
import TableOfContents from '../components/TableOfContents';
import SectionHeader from '../components/SectionHeader';

const REPO = 'https://github.com/pakatagoh/pakatagoh.com';
const GITHUB_BLOG = '/blob/master/content';

const StyledSmall = styled.small`
  font-size: 65%;
  ${media.sm`
    font-size: 80%;
  `};
`;

const StyledSectionHeader = styled(SectionHeader)`
  border-bottom: 1px solid ${({ theme }) => theme.secondary.base};
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
};

const PostTemplate = ({ data }) => {
  const { mdx } = data;
  const { frontmatter, tableOfContents } = mdx;

  return (
    <Layout>
      <Container>
        <PageTitle>{frontmatter.title}</PageTitle>
        <StyledSmall>Posted: {frontmatter.createdAt} / </StyledSmall>
        {frontmatter.updatedAt && (
          <>
            <StyledSmall>Updated: {frontmatter.updatedAt} / </StyledSmall>
          </>
        )}
        <InlineLink
          href={`${REPO}${GITHUB_BLOG}${frontmatter.path}/index.md`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <StyledSmall>Edit on GitHub</StyledSmall>
        </InlineLink>
        <Section header="Table of Contents">
          <TableOfContents items={tableOfContents.items} path={frontmatter.path} />
        </Section>
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
        createdAt: PropType.string,
        updatedAt: PropType.string,
        path: PropType.string,
      }),
      body: PropType.string,
      tableOfContents: PropType.shape({
        items: PropType.array,
      }),
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
        createdAt(formatString: "DD MMM YYYY")
        updatedAt(formatString: "DD MMM YYYY")
        path
      }
      tableOfContents
    }
  }
`;

export default PostTemplate;
