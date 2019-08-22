import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { media } from '../../styles/sizes';
import StyledImageRow from './StyledImageRow';
import Col from '../Col';
import Image from '../Image';

const StyledAboutImageCol = styled(Col)`
  flex: 0 0 100%;

  &:last-of-type {
    display: none;
  }

  ${media.sm`
    flex: 1 1 auto; 
    &:last-of-type { display: none; }
  `};

  ${media.md`
    &:last-of-type { 
      display: block; 
    }
  `};
`;

const AboutImages = () => {
  const data = useStaticQuery(
    graphql`
      query aboutImagesQuery {
        pg_talk: file(relativePath: { eq: "pg-talk.jpg" }) {
          ...fluidImage576
        }
        pg_fsae: file(relativePath: { eq: "pg-fsae.jpg" }) {
          ...fluidImage576
        }
      }
    `
  );

  const aboutImages = [
    { fluid: data.pg_talk.childImageSharp.fluid, alt: 'Giving software talk' },
    { fluid: data.pg_fsae.childImageSharp.fluid, alt: 'Win 7th place formula student' },
  ];

  return (
    <StyledImageRow>
      {aboutImages.map(({ fluid, alt }) => (
        <StyledAboutImageCol key={alt}>
          <Image fluid={fluid} alt={alt} />
        </StyledAboutImageCol>
      ))}
    </StyledImageRow>
  );
};

export default AboutImages;
