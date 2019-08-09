import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import '../styles/fonts.css';
import GlobalStyle from '../styles/GlobalStyle';
import StyledTheme from '../styles/StyledTheme';
import Header from './Header';
import Footer from './Footer';

const StyledPageWrapper = styled.div`
  position: relative;
  min-height: 100vh;

  & footer {
    position: absolute;
    bottom: 0;
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <StyledTheme>
        <StyledPageWrapper>
          <Header />
          <main>{children}</main>
          <footer>
            <Footer />
          </footer>
        </StyledPageWrapper>
      </StyledTheme>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
