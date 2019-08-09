import React from 'react';
import styled from 'styled-components';
import { media } from '../styles/sizes';
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
  height: 60px;
  display: flex;
  align-items: center;
  flex-wrap: wrap-reverse;
`;

const StyledCopyright = styled.div`
  font-family: 'Bebas Neue Book', 'Segoe UI', 'Arial', 'sans-serif';
  font-size: 16px;
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
    margin: 0 0 0 30px;
  `};
`;

const StyledLink = styled.li`
  margin: 0;

  & a {
    font-size: 13px;
    margin: 0;
    color: ${({ theme }) => theme.gray1};
    text-decoration: none;

    ${media.sm`
      margin: 0 15px 0 0;
    `}
  }

  & a:hover {
    color: ${({ theme }) => theme.secondary.base};
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
