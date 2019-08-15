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

const TALKS = [
  {
    name: 'Hooked on Hooks: Intro to React Hooks',
    href: 'https://www.youtube.com/watch?v=7tcf20ItkA0',
  },
];

const SETUP = [
  { label: 'Computer', name: 'Dell XPS 15' },
  { label: 'Monitor', name: 'LG 27UD88-W' },
  { label: 'Keyboard', name: 'Anne Pro2 / Logitech K780' },
  { label: 'Mouse', name: 'Logitech MX Master 2' },
  { label: 'Code Editor', name: 'Visual Studio Code' },
  { label: 'Font', name: 'Fira Code (with ligatures)' },
  { label: 'Theme', name: 'Monokai++ or Andromeda(Colorizer), depends on my mood' },
];

const StyledParagraph = styled.p`
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const StyledSpan = styled.span`
  margin-left: 10px;
`;

const StyledList = styled.ul`
  margin-bottom: 0;
`;

const StyledListItem = styled.li`
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const StyledLink = styled.a`
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

export const fluidImage = graphql`
  fragment fluidImage on File {
    childImageSharp {
      fluid(maxWidth: 576) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;

const About = () => {
  const data = useStaticQuery(graphql`
    query instagramImageQuery {
      pakaCodes_1: file(relativePath: { eq: "instagram-pakacodes-1.jpg" }) {
        ...fluidImage
      }
      pakaCodes_2: file(relativePath: { eq: "instagram-pakacodes-2.jpg" }) {
        ...fluidImage
      }
      pakaCodes_3: file(relativePath: { eq: "instagram-pakacodes-3.jpg" }) {
        ...fluidImage
      }
      pakatagoh_1: file(relativePath: { eq: "instagram-pakatagoh-1.jpg" }) {
        ...fluidImage
      }
      pakatagoh_2: file(relativePath: { eq: "instagram-pakatagoh-2.jpg" }) {
        ...fluidImage
      }
      pakatagoh_3: file(relativePath: { eq: "instagram-pakatagoh-3.jpg" }) {
        ...fluidImage
      }
    }
  `);

  const imagesPakataGoh = [
    { fluid: data.pakatagoh_1.childImageSharp.fluid, alt: 'pakatagoh_1' },
    { fluid: data.pakatagoh_2.childImageSharp.fluid, alt: 'pakatagoh_2' },
    { fluid: data.pakatagoh_3.childImageSharp.fluid, alt: 'pakatagoh_3' },
  ];

  const imagesPakaCodes = [
    { fluid: data.pakaCodes_1.childImageSharp.fluid, alt: 'pakaCodes_1' },
    { fluid: data.pakaCodes_2.childImageSharp.fluid, alt: 'pakaCodes_2' },
    { fluid: data.pakaCodes_3.childImageSharp.fluid, alt: 'pakaCodes_3' },
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
        <Section header="TALKS">
          <StyledList>
            {TALKS.map(({ href, name }) => (
              <StyledListItem>
                <StyledLink key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
                  {name}
                </StyledLink>
              </StyledListItem>
            ))}
          </StyledList>
        </Section>
        <Section header="PHOTOGRAPHY">
          <p>
            {`Camera: Fujifilm X-H1`}
            <br />
            {`Lenses: XF 16-55mm F2.8, XF 16mm F1.4, XF 35mm F2`}
          </p>
          <SocialIconLink
            color="primary"
            icon={{ src: instagram_logo, name: 'pakata codes instagram', to: 'https://instagram.com/paka.codes/' }}
          >
            <StyledSpan>@paka.codes</StyledSpan>
          </SocialIconLink>
          <StyledImageRow>
            {imagesPakaCodes.map(({ fluid, alt }) => (
              <StyledImageCol key={alt}>
                <StyledImage fluid={fluid} alt={alt} />
              </StyledImageCol>
            ))}
          </StyledImageRow>
          <SocialIconLink
            color="primary"
            icon={{ src: instagram_logo, name: 'pakata goh instagram', to: 'https://instagram.com/pakatagoh/' }}
          >
            <StyledSpan>@pakatagoh</StyledSpan>
          </SocialIconLink>
          <StyledImageRow>
            {imagesPakataGoh.map(({ fluid, alt }) => (
              <StyledImageCol key={alt}>
                <StyledImage fluid={fluid} alt={alt} />
              </StyledImageCol>
            ))}
          </StyledImageRow>
        </Section>
        <Section header="SETUP">
          <StyledList>
            {SETUP.map(({ label, name }) => (
              <StyledListItem key={label}>
                <strong>{label}:</strong> {name}
              </StyledListItem>
            ))}
          </StyledList>
        </Section>
      </Container>
    </Layout>
  );
};

export default About;
