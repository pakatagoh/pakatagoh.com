import { Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

const ACTIVE = 'active';

const StyledNav = styled.nav`
  font-family: 'Bebas Neue';
`;

const StyledBrand = styled(Link)`
  color: black;
  text-decoration: none;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;

  &.${ACTIVE} {
    border-bottom: 2px solid blue;
  }
`;

const Header = ({ siteTitle }) => (
  <header>
    <StyledNav>
      <StyledBrand to="/">{siteTitle}</StyledBrand>
      <StyledLink to="/page-2" activeClassName={ACTIVE}>
        page2
      </StyledLink>
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
