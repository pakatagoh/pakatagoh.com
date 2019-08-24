import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/SEO';
import { media } from '../styles/sizes';
import { scale, rhythm } from '../utils/typography';
import Layout from '../components/Layout';
import Block from '../components/Block';
import Container from '../components/Container';
import Section from '../components/Section';
import Row from '../components/Row';
import Col from '../components/Col';
import LayerImage from '../components/LayerImage';
import IconList from '../components/IconList';
import BorderList from '../components/BorderList';
import Image from '../components/Image';
import Subtitle from '../components/Subtitle';
import BlogListItem from '../components/BlogListItem';
import ButtonGatsbyLink from '../components/ButtonGatsbyLink';
import config from '../../config';

const TECH_LISTS = [
  {
    listHeader: 'Front',
    icon: 'icon-computer',
    items: ['React', 'styled-components', 'Bootstrap 4', 'Gatsby.js', 'testing-library/react'],
  },
  {
    listHeader: 'Back',
    icon: 'icon-database',
    items: ['Node.js', 'Express', 'Mongoose', 'Sequelize.js', 'Objection.js', 'Knex.js'],
  },
  {
    listHeader: 'Others',
    icon: 'icon-checklist',
    items: ['Git', 'Jest', 'Cypress', 'TDD', 'CI/CD', 'Pair Programming', 'Agile workflows'],
  },
];

const StyledH1 = styled.h1`
  ${scale(8 / 10)}
  margin-bottom: ${rhythm(4 / 10)};
  font-weight: medium;

  & span {
    color: ${({ theme }) => theme.primary.base};
  }

  ${media.sm`
    ${scale(9 / 10)}
    margin-bottom: ${rhythm(6 / 10)};
  `};

  ${media.lg`
    ${scale(1)}
    margin-bottom: ${rhythm(6 / 10)};
  `};
`;

const StyledAboutLeftCol = styled(Col)`
  flex: 1 1 auto;
`;

const StyledTechRow = styled(Row)`
  flex-wrap: wrap;
`;

const StyledTechCol = styled(Col)`
  flex: 0 0 auto;
  margin-bottom: 1rem;

  &:last-of-type {
    margin-bottom: 0;
  }

  ${media.sm`
    max-width: ${(4 * 100) / 12}%;
    margin-bottom: 0;
  `};
`;

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query indexPageQuery {
      pgImageSquare: file(relativePath: { eq: "pg-headshot.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      pgImageWide: file(relativePath: { eq: "pg-headshot16x9.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 768, quality: 70) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      allMdx(
        sort: { order: DESC, fields: frontmatter___createdAt }
        limit: 5
        filter: { frontmatter: { isPublished: { eq: true } } }
      ) {
        ...BlogInfo
      }
    }
  `);

  const { fluid: fluidSquare } = data.pgImageSquare.childImageSharp;
  const { fluid: fluidWide } = data.pgImageWide.childImageSharp;
  const { edges } = data.allMdx;
  const blogPosts = edges.map(({ node: post }) => {
    const { id, excerpt, fields } = post;
    const { slug, title } = fields;
    return {
      id,
      excerpt,
      title,
      slug,
    };
  });
  return (
    <Layout>
      <SEO />
      <Container>
        <section>
          <Block>
            <Row className="align-items-center">
              <StyledAboutLeftCol>
                <StyledH1>
                  Hey! I&apos;m <span>Pakata</span>
                </StyledH1>
                <Subtitle>
                  A software developer from Singapore specializing in JavaScript. In this personal site, I&apos;m
                  documenting what I&apos;ve learnt during my software development journey. Let&apos;s connect!
                </Subtitle>
                <Image fluid={fluidWide} alt={config.name} className="d-md-none" />
                <IconList />
              </StyledAboutLeftCol>
              <Col className="d-none d-md-block">
                <LayerImage fluid={fluidSquare} alt={config.name} />
              </Col>
            </Row>
          </Block>
        </section>
        <Section header="TECHNOLOGIES">
          <p>I build applications using the React and Node.js ecosystem</p>
          <StyledTechRow>
            {TECH_LISTS.map(({ listHeader, icon, items }) => (
              <StyledTechCol key={listHeader}>
                <BorderList header={listHeader} iconClassName={icon} items={items} />
              </StyledTechCol>
            ))}
          </StyledTechRow>
        </Section>
        <Section header="LATEST POSTS">
          {blogPosts.length > 0 ? (
            blogPosts.map(({ id, ...rest }) => {
              return <BlogListItem key={id} {...rest} postTitleAs="h3" />;
            })
          ) : (
            <p>
              No posts to show at the moment{' '}
              <span role="img" aria-label="sad face">
                😭
              </span>
            </p>
          )}
          <ButtonGatsbyLink to="/blog" iconClassName="icon-arrow_right_solid">
            ALL POSTS
          </ButtonGatsbyLink>
        </Section>
      </Container>
    </Layout>
  );
};

export default IndexPage;
