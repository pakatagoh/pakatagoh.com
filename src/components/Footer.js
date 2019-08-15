import React from 'react';
import styled from 'styled-components';
import { media } from '../styles/sizes';
import { rhythm } from '../utils/typography';
import Container from './Container';

const FOOTER_LINKS = [
  { name: 'LinkedIn', to: 'https://linkedin.com/in/pakata-goh/' },
  { name: 'Github', to: 'https://github.com/pakatagoh' },
  { name: 'Twitter', to: 'https://twitter.com/GohPakata' },
  { name: 'Instagram', to: 'https://instagram.com/paka.codes/' },
  { name: 'View Source', to: 'https://github.com/pakatagoh/pakatagoh.com' },
];

const StyledFooterWrapper = styled.div`
  /* height of Footer */
  /* see Layout component */
  height: 3rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap-reverse;
`;

const StyledCopyright = styled.div`
  font-family: 'Bebas Neue Book', 'Segoe UI', 'Arial', 'sans-serif';
  font-size: 0.9rem;
  color: ${({ theme }) => theme.gray1};
  text-align: center;
  flex: 0 0 100%;

  ${media.sm`
    flex: 0 0 auto;
  `};
`;

const StyledFooterLinks = styled.ul`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  list-style: none;
  flex: 0 0 100%;

  ${media.sm`
    flex: 0 0 auto;
    margin: 0 0 0 ${rhythm(1)};
  `};
`;

const StyledLink = styled.li`
  margin: 0;

  & a {
    font-size: 0.7rem;
    margin: 0;
    color: ${({ theme }) => theme.gray1};
    text-decoration: none;

    ${media.sm`
      margin: 0 ${rhythm(3 / 5)} 0 0;
    `}
  }

  & a:hover {
    color: ${({ theme }) => theme.secondary.base};
  }
  & a:active {
    color: ${({ theme }) => theme.secondary.pressed};
  }
`;

const Footer = () => {
  return (
    <footer>
      <Container>
        <StyledFooterWrapper>
          <StyledCopyright>© {new Date().getFullYear()} Pakata Goh</StyledCopyright>
          <StyledFooterLinks>
            {FOOTER_LINKS.map(({ name, to }) => (
              <StyledLink key={name} to={to}>
                <a href={to} target="_blank" rel="noreferrer noopener">
                  {name}
                </a>
              </StyledLink>
            ))}
          </StyledFooterLinks>
        </StyledFooterWrapper>
      </Container>
    </footer>
  );
};

export default Footer;
