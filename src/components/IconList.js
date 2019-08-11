/* eslint-disable camelcase */
import React from 'react';
import styled from 'styled-components';
import { media } from '../styles/sizes';
import ButtonLink from './ButtonLink';
import SocialIconLink from './SocialIconLink';

import linkedIn_logo from '../assets/icons/linkedin_logo.svg';
import github_logo from '../assets/icons/github_logo.svg';
import twitter_logo from '../assets/icons/twitter_logo.svg';
import instagram_logo from '../assets/icons/instagram_logo.svg';

const SOCIAL_LINKS = [
  { name: 'LinkedIn', src: linkedIn_logo, to: 'https://linkedin.com/in/pakata-goh/' },
  { name: 'Github', src: github_logo, to: 'https://github.com/pakatagoh' },
  { name: 'Twitter', src: twitter_logo, to: 'https://twitter.com/GohPakata' },
  { name: 'Instagram', src: instagram_logo, to: 'https://instagram.com/paka.codes/' },
];
const RESUME_LINK = 'https://drive.google.com/open?id=185fdbe4ubRIuHuuCR_AtKHV7p7Zbrpvo';

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

const IconList = () => {
  return (
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
  );
};

export default IconList;
