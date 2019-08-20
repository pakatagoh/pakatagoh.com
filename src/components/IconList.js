import React from 'react';
import styled from 'styled-components';
import { media } from '../styles/sizes';
import ButtonLink from './ButtonLink';
import SocialIconList from './SocialIconList';
import config from '../../config';

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

const IconList = () => {
  return (
    <StyledButtonsRow className="d-flex align-items-center">
      <StyledResumeButtonWrapper>
        <ButtonLink href={config.resume.link} iconClassName="icon-text_document" iconSize="sm">
          RESUME
        </ButtonLink>
      </StyledResumeButtonWrapper>
      <SocialIconList />
    </StyledButtonsRow>
  );
};

export default IconList;
