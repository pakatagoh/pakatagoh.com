/* eslint-disable camelcase */
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { media } from '../../styles/sizes';
import { rhythm } from '../../utils/typography';
import Section from '../Section';
import Col from '../Col';
import Image from '../Image';
import SocialIconLink from '../SocialIconLink';
import StyledImageRow from './StyledImageRow';
import config from '../../../config';

import instagram_logo from '../../assets/icons/instagram_logo.svg';

const StyledSpan = styled.span`
  margin-left: 10px;
`;

const StyledImage = styled(Image)`
  transform: scale(1);
  transform-origin: center;
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

const StyledImageCol = styled(Col)`
  flex: 0 0 100%;
  margin-bottom: ${rhythm(1)};
  overflow: hidden;

  &:nth-last-of-type(2) {
    margin-bottom: 0;
  }

  &:last-of-type {
    display: none;
  }

  ${media.sm`
    flex: 0 0 50%; 
    
    &:last-of-type { 
      display: block; margin-bottom: 0; 
    }
  `};

  ${media.md`
    flex: 1 1 0; 
    margin-bottom: 0;
  `}
`;

const PhotographySection = () => {
  const data = useStaticQuery(
    graphql`
      query photographImagesQuery {
        pakaCodes_1: file(relativePath: { eq: "instagram-pakacodes-1.jpg" }) {
          ...fluidImage576
        }
        pakaCodes_2: file(relativePath: { eq: "instagram-pakacodes-2.jpg" }) {
          ...fluidImage576
        }
        pakaCodes_3: file(relativePath: { eq: "instagram-pakacodes-3.jpg" }) {
          ...fluidImage576
        }
        pakatagoh_1: file(relativePath: { eq: "instagram-pakatagoh-1.jpg" }) {
          ...fluidImage576
        }
        pakatagoh_2: file(relativePath: { eq: "instagram-pakatagoh-2.jpg" }) {
          ...fluidImage576
        }
        pakatagoh_3: file(relativePath: { eq: "instagram-pakatagoh-3.jpg" }) {
          ...fluidImage576
        }
      }
    `
  );

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
    <Section header="PHOTOGRAPHY">
      <p>
        {`Camera: Fujifilm X-H1`}
        <br />
        {`Lenses: XF 16-55mm F2.8, XF 16mm F1.4, XF 35mm F2`}
      </p>
      <SocialIconLink
        color="primary"
        icon={{ src: instagram_logo, name: 'pakata codes instagram', to: config.instagram_coding.link }}
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
        icon={{ src: instagram_logo, name: 'pakata goh instagram', to: config.instagram_personal.link }}
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
  );
};

export default PhotographySection;
