import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { media } from '../styles/sizes';
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
import UnderConstruction from '../components/UnderConstruction';

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
  font-family: 'Roboto', 'Georgia', 'serif';
  font-size: 2.3rem;
  margin-bottom: 1rem;
  font-weight: medium;

  & span {
    color: ${({ theme }) => theme.primary.base};
  }

  ${media.sm`
    font-size: 2.8rem;
    margin-bottom: 1.3rem;
  `};

  ${media.lg`
    font-size: 3.33rem;
    margin-bottom: 1.5rem;

  `};
`;

const StyledAboutLeftCol = styled(Col)`
  flex: 1 1 auto;
`;

const StyledTechRow = styled(Row)`
  padding-top: 1rem;
  flex-wrap: wrap;
`;

const StyledTechCol = styled(Col)`
  flex: 0 0 auto;
  margin-bottom: 0.6rem;

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
    query pgImageQuery {
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
    }
  `);

  const { fluid: fluidSquare } = data.pgImageSquare.childImageSharp;
  const { fluid: fluidWide } = data.pgImageWide.childImageSharp;

  return (
    <Layout>
      <Container>
        <section>
          <Block>
            <Row className="align-items-center">
              <StyledAboutLeftCol>
                <StyledH1>
                  Hey! I&apos;m <span>Pakata</span>
                </StyledH1>
                <Subtitle>
                  A software developer from Singapore specializing in JavaScript. In this personal site, I write about
                  things I&apos;ve learnt and hopefully you&apos;ll learn a thing or two from me.
                </Subtitle>
                <Image fluid={fluidWide} alt="Pakata Goh" className="d-md-none" />
                <IconList />
              </StyledAboutLeftCol>
              <Col className="d-none d-md-block">
                <LayerImage fluid={fluidSquare} alt="Pakata Goh" />
              </Col>
            </Row>
          </Block>
        </section>
        <Section header="TECHNOLOGIES" subtitle="I build applications using the React and Node.js ecosystem">
          <StyledTechRow>
            {TECH_LISTS.map(({ listHeader, icon, items }) => (
              <StyledTechCol key={listHeader}>
                <BorderList header={listHeader} iconClassName={icon} items={items} />
              </StyledTechCol>
            ))}
          </StyledTechRow>
        </Section>
        <Section header="LATEST POSTS">
          <UnderConstruction />
        </Section>
      </Container>
    </Layout>
  );
};

export default IndexPage;
