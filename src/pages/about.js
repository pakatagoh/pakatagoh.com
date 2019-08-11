import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { media } from '../styles/sizes';
import Layout from '../components/Layout';
import Block from '../components/Block';
import Container from '../components/Container';
import Row from '../components/Row';
import Col from '../components/Col';
import LayerImage from '../components/LayerImage';
import IconList from '../components/IconList';

const StyledH1 = styled.h1`
  font-family: 'Roboto', 'Georgia', 'serif';
  font-size: 2.3rem;
  margin-bottom: 1.1rem;
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
  margin-bottom: 0.8rem;

  ${media.sm`
    margin-bottom: 1rem;
  `};
`;

const StyledSubtitle = styled.p`
  font-size: 1.15rem;
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

const StyledLeftCol = styled(Col)`
  flex: 1 1 ${(8 * 100) / 12}%;
`;

const StyledRightCol = styled(Col)`
  flex: 1 1 ${(4 * 100) / 12}%;
  display: none;

  ${media.md`
    display: block;
  `};
`;

const About = () => {
  const data = useStaticQuery(graphql`
    query pgImageQuery {
      pgImage: file(relativePath: { eq: "pg-headshot.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  const { fluid } = data.pgImage.childImageSharp;
  return (
    <Layout>
      <Container>
        <section>
          <Block>
            <Row className="align-items-center">
              <StyledLeftCol>
                <StyledH1>
                  Hey! I&apos;m <span>Pakata</span>
                </StyledH1>
                <StyledSubtitle>
                  A software developer from Singapore specializing in JavaScript. In this personal site, I write about
                  things I&apos;ve learnt and hopefully you&apos;ll learn a thing or two from me.
                </StyledSubtitle>
                <IconList />
              </StyledLeftCol>
              <StyledRightCol>
                <LayerImage fluid={fluid} alt="Pakata Goh" />
              </StyledRightCol>
            </Row>
          </Block>
        </section>
        <section>
          <Block>
            <StyledSectionHeader>TECHNOLOGIES</StyledSectionHeader>
            <StyledSubtitle>I build applications using the React and Node.js ecosystem</StyledSubtitle>
          </Block>
        </section>
      </Container>
    </Layout>
  );
};

export default About;
