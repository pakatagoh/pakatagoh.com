/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../styles/sizes';
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
  margin-right: 20px;

  ${media.sm`
    margin-right: 0 15px;
  `};
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
