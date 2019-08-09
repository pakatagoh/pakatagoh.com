import React from 'react';
import PropTypes from 'prop-types';
import '../styles/fonts.css';
import GlobalStyle from '../styles/GlobalStyle';
import StyledTheme from '../styles/StyledTheme';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <StyledTheme>
        <Header />
        <main>{children}</main>
        <Footer />
      </StyledTheme>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
