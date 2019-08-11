/* eslint-disable camelcase */
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { media } from '../styles/sizes';
import Layout from '../components/Layout';
import Container from '../components/Container';
import Row from '../components/Row';
import Col from '../components/Col';
import Block from '../components/Block';
import PageTitle from '../components/PageTitle';
import CopyButton from '../components/CopyButton';
import ButtonLink from '../components/ButtonLink';
import SocialIconLink from '../components/SocialIconLink';
import LayerImage from '../components/LayerImage';

import linkedIn_logo from '../assets/icons/linkedin_logo.svg';
import github_logo from '../assets/icons/github_logo.svg';
import twitter_logo from '../assets/icons/twitter_logo.svg';
import instagram_logo from '../assets/icons/instagram_logo.svg';
// import typing_hands from '../images/typing-hands.jpg';

const SOCIAL_LINKS = [
  { name: 'LinkedIn', src: linkedIn_logo, to: 'https://linkedin.com/in/pakata-goh/' },
  { name: 'Github', src: github_logo, to: 'https://github.com/pakatagoh' },
  { name: 'Twitter', src: twitter_logo, to: 'https://twitter.com/GohPakata' },
  { name: 'Instagram', src: instagram_logo, to: 'https://instagram.com/paka.codes/' },
];
const EMAIL = 'pakatagohlh@gmail.com';
const RESUME_LINK = 'https://drive.google.com/open?id=185fdbe4ubRIuHuuCR_AtKHV7p7Zbrpvo';

const StyledSectionHeader = styled.h2`
  margin-bottom: 30px;

  ${media.sm`
    margin-bottom: 50px;
  `};
`;

const StyledCopyButtonWrapper = styled.div`
  margin-bottom: 10px;

  ${media.sm`
    margin-bottom: 0;
  `};
`;

const StyledButtonsRow = styled.div`
  flex-wrap: wrap-reverse;

  ${media.sm`
    margin-top: 25px;
  `};
`;

const StyledResumeButtonWrapper = styled.div`
  margin-right: 30px;

  ${media.sm`
    margin-right:40px;
  `};
`;

const StyledSocialIconLinksWrapper = styled.div`
  padding: 10px 0;

  ${media.sm`
    padding: 0;
  `};
`;

const StyledSocialIconLinkWrapper = styled.div`
  margin-right: 20px;

  ${media.sm`
    margin: 0 15px;
  `};
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

const Contact = () => {
  const data = useStaticQuery(graphql`
    query contactImageQuery {
      contactImage: file(relativePath: { eq: "typing-hands.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  const { fluid } = data.contactImage.childImageSharp;

  return (
    <Layout>
      <Container>
        <Block>
          <PageTitle>Contact</PageTitle>
        </Block>
        <section>
          <Block>
            <Row className="align-items-center">
              <StyledLeftCol>
                <StyledSectionHeader>GET IN TOUCH</StyledSectionHeader>
                <StyledCopyButtonWrapper>
                  <CopyButton text={EMAIL} />
                </StyledCopyButtonWrapper>
                <StyledButtonsRow className="d-flex align-items-center">
                  <StyledResumeButtonWrapper>
                    <ButtonLink href={RESUME_LINK} iconClassName="icon-text_document" iconSize="sm">
                      RESUME
                    </ButtonLink>
                  </StyledResumeButtonWrapper>
                  <StyledSocialIconLinksWrapper className="d-flex align-items-center">
                    {SOCIAL_LINKS.map(socialLink => (
                      <StyledSocialIconLinkWrapper key={socialLink.name}>
                        <SocialIconLink icon={socialLink} />
                      </StyledSocialIconLinkWrapper>
                    ))}
                  </StyledSocialIconLinksWrapper>
                </StyledButtonsRow>
              </StyledLeftCol>
              <StyledRightCol>
                <LayerImage fluid={fluid} alt="Get in touch" />
              </StyledRightCol>
            </Row>
          </Block>
        </section>
      </Container>
    </Layout>
  );
};

export default Contact;
