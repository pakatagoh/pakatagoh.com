/* eslint-disable camelcase */
import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Container from '../components/Container';
import Block from '../components/Block';
import Icon from '../components/Icon';
import LayerImage from '../components/LayerImage';

import linkedIn_logo from '../images/linkedin_logo.svg';
import github_logo from '../images/github_logo.svg';
import twitter_logo from '../images/twitter_logo.svg';
import instagram_logo from '../images/instagram_logo.svg';
import typing_hands from '../images/typing-hands.jpg';

const SOCIAL_LINKS = [
  { name: 'LinkedIn', src: linkedIn_logo, to: 'https://linkedin.com/in/pakata-goh/' },
  { name: 'Github', src: github_logo, to: 'https://github.com/pakatagoh' },
  { name: 'Twitter', src: twitter_logo, to: 'https://twitter.com/GohPakata' },
  { name: 'Instagram', src: instagram_logo, to: 'https://instagram.com/paka.codes/' },
];
const EMAIL = 'pakatagohlh@gmail.com';

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

const StyledIconList = styled.div`
  display: flex;
  align-items: center;
`;

const StyledGetInTouchWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Contact = () => {
  const [copyMessage, setCopyMessage] = useState(null);

  /*
   * @description: Copy text to clipboard
   * @link: https://github.com/feross/clipboard-copy/blob/master/index.js
   */
  const handleCopy = () => {
    const span = document.createElement('span');
    span.textContent = EMAIL;

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
            <StyledGetInTouchWrapper>
              <div>
                <h2>GET IN TOUCH</h2>
                <StyledEmail type="button" aria-label="Copy email to clipboard" onClick={handleCopy}>
                  {EMAIL}
                </StyledEmail>
                {<span>{copyMessage}</span> || null}
                <StyledIconList>
                  {SOCIAL_LINKS.map(socialLink => (
                    <Icon key={socialLink.name} icon={socialLink} />
                  ))}
                </StyledIconList>
              </div>
              <div>
                <LayerImage src={typing_hands} alt="Get in touch" />
              </div>
            </StyledGetInTouchWrapper>
          </Block>
        </section>
      </Container>
    </Layout>
  );
};

export default Contact;
