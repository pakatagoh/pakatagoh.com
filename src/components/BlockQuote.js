import React from 'react';
import styled from 'styled-components';
import { rhythm } from '../utils/typography';

const StyledBlockQuote = styled.blockquote`
  margin-right: 0;
  margin-left: 0;
  color: ${({ theme }) => theme.gray1};
  padding: 0 0 0 ${rhythm(1)};
  border-left: 4px solid ${({ theme }) => theme.secondary.base};
`;

const BlockQuote = ({ children }) => {
  return <StyledBlockQuote>{children}</StyledBlockQuote>;
};

export default BlockQuote;
