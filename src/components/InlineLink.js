import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

const StyledAnchor = styled(OutboundLink)`
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

const InlineLink = ({ children, ...rest }) => {
  return <StyledAnchor {...rest}>{children}</StyledAnchor>;
};

InlineLink.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InlineLink;
