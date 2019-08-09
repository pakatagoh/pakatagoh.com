import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Container from '../components/Container';
import Block from '../components/Block';

const StyledPageTitle = styled.h1`
  margin: 0;
`;

const StyledEmail = styled.button`
  font-family: 'Roboto Condensed', 'Georgia', 'serif';
  font-size: 24px;
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
`;

const Contact = () => {
  const [copyMessage, setCopyMessage] = useState(null);

  /*
   * @description: Copy text to clipboard
   * @link: https://github.com/feross/clipboard-copy/blob/master/index.js
   */
  const handleCopy = () => {
    const span = document.createElement('span');
    span.textContent = 'pakatagohlh@gmail.com';

    // Preserve consecutive spaces and newlines
    span.style.whiteSpace = 'pre';

    // Add the <span> to the page
    document.body.appendChild(span);

    // Make a selection object representing the range of text selected by the user
    const selection = window.getSelection();
    const range = window.document.createRange();
    selection.removeAllRanges();
    range.selectNode(span);
    selection.addRange(range);

    // Copy text to the clipboard
    try {
      window.document.execCommand('copy');
      // Cleanup
      selection.removeAllRanges();
      window.document.body.removeChild(span);
      setCopyMessage('Copied!');
    } catch (err) {
      setCopyMessage('Unable to copy');
    }
  };

  return (
    <Layout>
      <Container>
        <Block>
          <StyledPageTitle>Contact</StyledPageTitle>
        </Block>
        <section>
          <Block>
            <h2>GET IN TOUCH</h2>
            <StyledEmail type="button" aria-label="Copy email to clipboard" onClick={handleCopy}>
              pakatagohlh@gmail.com
            </StyledEmail>
            {<span>{copyMessage}</span> || null}
          </Block>
        </section>
      </Container>
    </Layout>
  );
};

export default Contact;
