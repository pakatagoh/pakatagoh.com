import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import React from 'react';
import Container from './Container';
import { media } from '../styles/sizes';
import logo from '../assets/icons/Logo.svg';

const NAVLINKS = ['blog', 'about', 'contact'];
const ACTIVE = 'active';

const StyledNav = styled.nav`
  height: 115px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & a {
    text-decoration: none;
  }
  & a.${ACTIVE} {
    color: ${({ theme }) => theme.black};
    border-bottom: 5px solid ${({ theme }) => theme.secondary.base};
  }
`;

const StyledBrandLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const StyledBrandLogo = styled.div`
  width: 45px;
  height: 45px;
`;

const StyledImg = styled.img`
  margin: 0;
`;

const StyledBrandTitle = styled.span`
  font-family: 'Bebas Neue', 'Segoe UI', 'Arial', 'sans-serif';
  font-size: 38px;
  margin-left: 15px;
  color: ${({ theme }) => theme.black};
  display: none;

  ${media.md`
    display: block
  `}
`;

const StyledLink = styled(Link)`
  font-size: 18px;
  padding-bottom: 6px;
  margin-left: 18px;
  color: ${({ theme }) => theme.gray2};

  &:hover {
    color: ${({ theme }) => theme.black};
  }

  ${media.sm`
    font-size: 24px;
    margin-left: 30px
  `};
  ${media.md`
    margin-left: 60px
  `};
`;

const Header = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const { title: siteTitle } = data.site.siteMetadata;

  return (
    <header>
      <Container>
        <StyledNav>
          <StyledBrandLink to="/">
            <StyledBrandLogo>
              <StyledImg src={logo} alt={siteTitle} />
            </StyledBrandLogo>
            <StyledBrandTitle>{siteTitle}</StyledBrandTitle>
          </StyledBrandLink>
          <div>
            {NAVLINKS.map(navlink => (
              <StyledLink key={navlink} to={`/${navlink}`} activeClassName={ACTIVE}>
                {navlink}
              </StyledLink>
            ))}
          </div>
        </StyledNav>
      </Container>
    </header>
  );
};

export default Header;
