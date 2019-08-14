/* eslint-disable camelcase */
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { media } from '../styles/sizes';
import { rhythm } from '../utils/typography';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Container from '../components/Container';
import Row from '../components/Row';
import Col from '../components/Col';
import Section from '../components/Section';
import Block from '../components/Block';
import PageTitle from '../components/PageTitle';
import Image from '../components/Image';
import SocialIconLink from '../components/SocialIconLink';

import instagram_logo from '../assets/icons/instagram_logo.svg';

const StyledParagraph = styled.p`
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const StyledSpan = styled.span`
  margin-left: 10px;
`;

const StyledImage = styled(Image)`
  transform: scale(1);
  box-shadow: none;
  transition: all 0.15s linear;

  &:hover {
    transform: scale(1.02);
    box-shadow: ${({ theme }) => theme.shadow.hover};
  }

  &:active {
    transform: scale(1.01);
    box-shadow: ${({ theme }) => theme.shadow.pressed};
  }
`;

const StyledImageRow = styled(Row)`
  flex-wrap: wrap;
  margin-bottom: ${rhythm(1)};

  &:last-of-type {
    margin-bottom: 0;
  }

  ${media.md`
    flex-wrap: nowrap;
  `}
`;
const StyledImageCol = styled(Col)`
  flex: 0 0 100%;
  margin-bottom: ${rhythm(1)};

  ${media.sm`
    flex: 0 0 50%;
  `};

  ${media.md`
    flex: 1 1 0;
    margin-bottom: 0;
  `}
`;

const About = () => {
  const data = useStaticQuery(graphql`
    query instagramImageQuery {
      pakaCodes_1: file(relativePath: { eq: "instagram-pakacodes-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 576) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      pakaCodes_2: file(relativePath: { eq: "instagram-pakacodes-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 576) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      pakaCodes_3: file(relativePath: { eq: "instagram-pakacodes-3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 576) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      pakatagoh_1: file(relativePath: { eq: "instagram-pakatagoh-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 576) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      pakatagoh_2: file(relativePath: { eq: "instagram-pakatagoh-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 576) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      pakatagoh_3: file(relativePath: { eq: "instagram-pakatagoh-3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 576) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  const imagesPakataGoh = [
    data.pakatagoh_1.childImageSharp.fluid,
    data.pakatagoh_2.childImageSharp.fluid,
    data.pakatagoh_3.childImageSharp.fluid,
  ];

  const imagesPakaCodes = [
    data.pakaCodes_1.childImageSharp.fluid,
    data.pakaCodes_2.childImageSharp.fluid,
    data.pakaCodes_3.childImageSharp.fluid,
  ];

  return (
    <Layout>
      <SEO title="About" />
      <Container>
        <PageTitle>ABOUT</PageTitle>
        <Block>
          <StyledParagraph>
            {`Hello! I'm Pakata`}
            <span role="img" aria-label="peace yo">
              ✌
            </span>
            {`I was born in 1990 and raised in the city of Singapore. Interesting fact, my name is a Buddhist name. I
          graduated with a degree in Mechanical Engineering back in 2015. In July 2018, I decided to leave my job to
          pursue software development as a career.`}
          </StyledParagraph>
          <StyledParagraph>
            {`Yes, I'm a self-taught developer. I created this website to further
          document my journey as a developer and to also share the knowledge I have gained thus far`}
          </StyledParagraph>
          <StyledParagraph>
            {`In my free time, I dabble in a little photography. I love cars and
          I keep up with Formula 1 during race weekends.`}
          </StyledParagraph>
        </Block>
        <Section header="PHOTOGRAPHY">
          <p>
            {`Camera: Fujifilm X-H1`}
            <br />
            {`Lenses: XF 16-55mm F2.8, XF 16mm F1.4, XF 35mm F2`}
          </p>
          <SocialIconLink
            icon={{ src: instagram_logo, name: 'pakata codes instagram', to: 'https://instagram.com/paka.codes/' }}
          >
            <StyledSpan>@paka.codes</StyledSpan>
          </SocialIconLink>
          <StyledImageRow>
            {imagesPakaCodes.map(image => (
              <StyledImageCol>
                <StyledImage fluid={image} />
              </StyledImageCol>
            ))}
          </StyledImageRow>
          <SocialIconLink
            icon={{ src: instagram_logo, name: 'pakata goh instagram', to: 'https://instagram.com/pakatagoh/' }}
          >
            <StyledSpan>@pakatagoh</StyledSpan>
          </SocialIconLink>
          <StyledImageRow>
            {imagesPakataGoh.map(image => (
              <StyledImageCol>
                <StyledImage fluid={image} />
              </StyledImageCol>
            ))}
          </StyledImageRow>
        </Section>
        <Section header="SETUP">
          <ul>
            <li>
              <strong>Computer:</strong> Dell XPS 15
            </li>
            <li>
              <strong>Monitor:</strong> LG 27UD88-W
            </li>
            <li>
              <strong>Keyboard:</strong> Anne Pro2 / Logitech K780
            </li>
            <li>
              <strong>Mouse:</strong> Logitech MX Master 2
            </li>
            <li>
              <strong>Code Editor:</strong> Visual Studio Code
            </li>
            <li>
              <strong>Font:</strong> Fire Code (with ligatures)
            </li>
            <li>
              <strong>Theme:</strong> Monokai++ or Andromeda(Colorizer), depends on my mood
            </li>
          </ul>
        </Section>
      </Container>
    </Layout>
  );
};

export default About;
