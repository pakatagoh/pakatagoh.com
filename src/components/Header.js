import { Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

const ACTIVE = 'active';
const NAVLINKS = ['projects', 'blog', 'about', 'contact'];

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & a {
    padding-bottom: 6px;
    color: ${({ theme }) => theme.black};
    text-decoration: none;
  }
  & a.${ACTIVE} {
    border-bottom: 5px solid ${({ theme }) => theme.secondary.base};
  }
`;

const StyledBrandLink = styled(Link)`
  font-size: 38px;
`;

const StyledLink = styled(Link)`
  font-size: 24px;
`;

const Header = ({ siteTitle }) => (
  <header>
    <StyledNav>
      <StyledBrandLink to="/">{siteTitle}</StyledBrandLink>
      <div>
        {NAVLINKS.map(navlink => (
          <StyledLink key={navlink} to={`/${navlink}`} activeClassName={ACTIVE}>
            {navlink}
          </StyledLink>
        ))}
      </div>
    </StyledNav>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
