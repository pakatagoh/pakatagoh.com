import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../styles/sizes';
import useCopy from '../hooks/useCopy';

const StyledCopyButton = styled.button`
  font-family: 'Roboto Condensed', 'Georgia', 'serif';
  font-size: 22px;
  padding: 0;
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
  `};
`;

const StyledCopyMessage = styled.span`
  margin-left: 10px;
  font-size: 16px;
`;

const CopyButton = ({ text }) => {
  const { handleCopy, copyMessage } = useCopy();

  return (
    <>
      <StyledCopyButton type="button" aria-label="Copy email to clipboard" onClick={() => handleCopy(text)}>
        {text}
      </StyledCopyButton>
      {<StyledCopyMessage>{copyMessage}</StyledCopyMessage> || null}
    </>
  );
};

CopyButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CopyButton;
