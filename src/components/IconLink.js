import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../styles/sizes';
import Icon from './Icon';

const ICON_LINK_SIZE = {
  xs: '32px',
  sm: '38px',
};

const StyledIconLink = styled.a`
  width: ${ICON_LINK_SIZE.xs};
  height: ${ICON_LINK_SIZE.xs};
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.secondary.hover};
    box-shadow: ${({ theme }) => theme.shadow.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.secondary.pressed};
    box-shadow: ${({ theme }) => theme.shadow.pressed};
  }

  ${media.sm`
    width: ${ICON_LINK_SIZE.sm};
    height:${ICON_LINK_SIZE.sm};
    margin: 0 15px;
  `};
`;

const IconLink = ({ icon }) => {
  return (
    <StyledIconLink href={icon.to} target="_blank" rel="noreferrer noopener">
      <Icon src={icon.src} alt={icon.name} />
    </StyledIconLink>
  );
};

IconLink.propTypes = {
  icon: PropTypes.shape({
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }),
};

export default IconLink;
