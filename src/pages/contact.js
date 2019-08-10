/* eslint-disable camelcase */
import React from 'react';
import styled from 'styled-components';
import { media } from '../styles/sizes';
import Layout from '../components/Layout';
import Container from '../components/Container';
import Block from '../components/Block';
import IconLink from '../components/IconLink';
import LayerImage from '../components/LayerImage';
import Button from '../components/Button';
import Icon from '../components/Icon';
import PageTitle from '../components/PageTitle';
import Row from '../components/Row';
import useCopy from '../hooks/useCopy';

import linkedIn_logo from '../images/linkedin_logo.svg';
import github_logo from '../images/github_logo.svg';
import twitter_logo from '../images/twitter_logo.svg';
import instagram_logo from '../images/instagram_logo.svg';
import typing_hands from '../images/typing-hands.jpg';
import text_document_icon from '../images/text_document_icon.svg';
import Col from '../components/Col';

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

const StyledEmail = styled.button`
  font-family: 'Roboto Condensed', 'Georgia', 'serif';
  font-size: 22px;
  padding: 0;
  margin-bottom: 10px;
  border: none;
  background: none;

  &:hover {
    cursor: pointer;
  }

  &:active,
  &:focus {
    outline: none;
  }

  ${media.sm`
    font-size: 24px;
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

const StyledButtonLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.black};
`;

const StyledButtonText = styled.span`
  font-size: 12px;
  font-weight: bold;
  margin-right: 10px;
  text-transform: uppercase;

  ${media.sm`
    font-size: 14px;
  `};
`;

const StyledSocialLinksWrapper = styled.div`
  padding: 10px 0;

  ${media.sm`
    padding: 0;
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
  const { handleCopy, copyMessage } = useCopy();

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
                <StyledEmail type="button" aria-label="Copy email to clipboard" onClick={() => handleCopy(EMAIL)}>
                  {EMAIL}
                </StyledEmail>
                {<span>{copyMessage}</span> || null}
                <StyledButtonsRow className="d-flex align-items-center">
                  <StyledResumeButtonWrapper>
                    <StyledButtonLink href={RESUME_LINK} target="_blank" rel="noreferrer noopener">
                      <Button>
                        <div className="d-flex align-items-center">
                          <StyledButtonText>Resume</StyledButtonText>
                          <Icon src={text_document_icon} alt="resume" />
                        </div>
                      </Button>
                    </StyledButtonLink>
                  </StyledResumeButtonWrapper>
                  <StyledSocialLinksWrapper className="d-flex align-items-center">
                    {SOCIAL_LINKS.map(socialLink => (
                      <IconLink key={socialLink.name} icon={socialLink} />
                    ))}
                  </StyledSocialLinksWrapper>
                </StyledButtonsRow>
              </StyledLeftCol>
              <StyledRightCol>
                <LayerImage src={typing_hands} alt="Get in touch" />
              </StyledRightCol>
            </Row>
          </Block>
        </section>
      </Container>
    </Layout>
  );
};

export default Contact;
