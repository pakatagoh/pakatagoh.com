/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../styles/sizes';
import SocialIconLink from './SocialIconLink';
import config from '../../config';

import linkedIn_logo from '../assets/icons/linkedin_logo.svg';
import github_logo from '../assets/icons/github_logo.svg';
import twitter_logo from '../assets/icons/twitter_logo.svg';
import instagram_logo from '../assets/icons/instagram_logo.svg';
import unsplash_logo from '../assets/icons/unsplash_logo.svg';

const SOCIAL_LINKS = [
  { name: 'LinkedIn', src: linkedIn_logo, to: config.linkedin.link },
  { name: 'Github', src: github_logo, to: config.github.link },
  { name: 'Twitter', src: twitter_logo, to: config.twitter.link },
  { name: 'Instagram', src: instagram_logo, to: config.instagram_coding.link },
  { name: 'Unsplash', src: unsplash_logo, to: config.unsplash.link },
];

const StyledSocialIconLinksWrapper = styled.div`
  padding: 10px 0;

  ${media.sm`
    padding: 0;
  `};
`;

const StyledSocialIconLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

const SocialIconList = ({ className, ...rest }) => {
  return (
    <StyledSocialIconLinksWrapper className={`d-flex align-items-center ${className}`} {...rest}>
      {SOCIAL_LINKS.map(socialLink => (
        <StyledSocialIconLinkWrapper key={socialLink.name}>
          <SocialIconLink icon={socialLink} />
        </StyledSocialIconLinkWrapper>
      ))}
    </StyledSocialIconLinksWrapper>
  );
};

SocialIconList.propTypes = {
  className: PropTypes.string,
};

export default SocialIconList;
