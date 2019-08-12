import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { media } from '../styles/sizes';
import Layout from '../components/Layout';
import Block from '../components/Block';
import Container from '../components/Container';
import Row from '../components/Row';
import Col from '../components/Col';
import LayerImage from '../components/LayerImage';
import IconList from '../components/IconList';

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

const StyledSectionHeader = styled.h2`
  margin-bottom: 0.6rem;

  ${media.sm`
    margin-bottom: 0.85rem;
  `};
`;

const StyledSubtitle = styled.p`
  font-size: 1.05rem;
  line-height: 1.33;
  margin-bottom: 1rem;

  ${media.sm`
    font-size: 1.25rem;
    line-height: 1.45;
    margin-bottom: 1.2rem;
  `}

  ${media.lg`
    font-size: 1.33rem;
    line-height: 1.6;
    margin-bottom: 1.6rem;
  `}
`;

const StyledListHeader = styled.h3`
  font-family: 'Roboto Condensed', 'Georgia', 'serif';
  font-size: 1.2rem;
  font-weight: normal;
  margin: 0;
  text-align: center;

  ${media.sm`
    font-size: 1.3rem;
  `};
`;

const StyledList = styled.ul`
  margin: 1rem 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;

  & li {
    font-size: 0.8rem;
    text-align: center;

    &:last-of-type {
      margin: 0;
    }

    ${media.sm`
      font-size: 1rem;
    `};
  }
`;

const StyledGatsbyImageWide = styled(Img)`
  & img {
    margin-bottom: 0;
  }

  ${media.md`
    display: none;
  `};
`;

const StyledListWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.gray3};
`;

const StyledAboutLeftCol = styled(Col)`
  flex: 1 1 auto;
`;

const StyledAboutRightCol = styled(Col)`
  display: none;

  ${media.md`
    display: block;
  `};
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
                <StyledSubtitle>
                  A software developer from Singapore specializing in JavaScript. In this personal site, I write about
                  things I&apos;ve learnt and hopefully you&apos;ll learn a thing or two from me.
                </StyledSubtitle>
                <StyledGatsbyImageWide fluid={fluidWide} alt="Pakata Goh" />
                <IconList />
              </StyledAboutLeftCol>
              <StyledAboutRightCol>
                <LayerImage fluid={fluidSquare} alt="Pakata Goh" />
              </StyledAboutRightCol>
            </Row>
          </Block>
        </section>
        <section>
          <Block>
            <StyledSectionHeader>TECHNOLOGIES</StyledSectionHeader>
            <StyledSubtitle>I build applications using the React and Node.js ecosystem</StyledSubtitle>
            <StyledTechRow>
              {TECH_LISTS.map(({ listHeader, icon, items }) => (
                <StyledTechCol key={listHeader}>
                  <StyledListWrapper>
                    <StyledListHeader>
                      <i className={`${icon} icon-md`} /> {listHeader}
                    </StyledListHeader>
                    <StyledList>
                      {items.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </StyledList>
                  </StyledListWrapper>
                </StyledTechCol>
              ))}
            </StyledTechRow>
          </Block>
        </section>
        <section>
          <Block>
            <StyledSectionHeader>LATEST POSTS</StyledSectionHeader>
            <p>
              Under construction...
              <span role="img" aria-label="sad face emoji">
                😥
              </span>
            </p>
          </Block>
        </section>
      </Container>
    </Layout>
  );
};

export default IndexPage;
