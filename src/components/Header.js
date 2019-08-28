import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Container from './Container';
import { media } from '../styles/sizes';
import { rhythm } from '../utils/typography';
import logo from '../assets/icons/Logo.svg';
import useSiteMetaQuery from '../hooks/useSiteMetaQuery';

const NAVLINKS = ['blog', 'about', 'contact'];
const ACTIVE = 'active';
const SCROLL = 'scroll';

const StyledHeader = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: white;
  box-shadow: none;
  transition: box-shadow 0.1s linear;

  &.${SCROLL} {
    box-shadow: ${({ theme }) => theme.shadow.hover};
  }
`;

const StyledNav = styled.nav`
  /* height of header */
  /* see Layout component */
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: height 0.1s linear;

  & a {
    text-decoration: none;
  }
  & a.${ACTIVE} {
    color: ${({ theme }) => theme.black};
    border-bottom: 5px solid ${({ theme }) => theme.secondary.base};
  }

  ${media.sm`
    height: 100px;
  `};
`;

const StyledBrandLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 0;
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
  font-size: 2.1rem;
  margin-bottom: -6px;
  margin-left: ${rhythm(3 / 5)};
  color: ${({ theme }) => theme.black};
  display: none;

  ${media.md`
    display: block
  `}
`;

const StyledLink = styled(Link)`
  font-size: 1.1rem;
  padding: ${rhythm(1 / 5)} 0;
  margin-left: ${rhythm(3 / 5)};
  color: ${({ theme }) => theme.gray2};

  &:hover {
    color: ${({ theme }) => theme.black};
  }

  ${media.sm`
    font-size: 1.4rem;
    margin-left: ${rhythm(4 / 5)};
  `};
  ${media.md`
    margin-left: ${rhythm(6 / 5)};
  `};
  ${media.lg`
    margin-left: ${rhythm(8 / 5)};
  `};
`;

const Header = () => {
  const data = useSiteMetaQuery();

  useEffect(() => {
    const headerElement = document.querySelector('header');
    const toggleScroll = () => {
      if (window.pageYOffset > 0) {
        headerElement.classList.add(SCROLL);
        return;
      }
      headerElement.classList.remove(SCROLL);
    };
    window.addEventListener('scroll', toggleScroll);

    return () => {
      window.removeEventListener('scroll', toggleScroll);
    };
  }, []);

  const { title: siteTitle } = data.site.siteMetadata;

  return (
    <StyledHeader>
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
    </StyledHeader>
  );
};

export default Header;
