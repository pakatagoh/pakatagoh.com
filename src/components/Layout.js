import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import '../styles/fonts.css';
import GlobalStyle from '../styles/GlobalStyle';
import StyledTheme from '../styles/StyledTheme';
import Header from './Header';
import Footer from './Footer';

/*
 * @description: StyledPageWrapper and StyledMainWrapper are used to keep footer at the bottom of the screen
 * @link: https://www.freecodecamp.org/news/how-to-keep-your-footer-where-it-belongs-59c6aa05c59c/
 */
const StyledPageWrapper = styled.div`
  position: relative;
  min-height: 100vh;

  & footer {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
`;

const StyledMainWrapper = styled.div`
  /* height of Footer */
  padding-bottom: 60px;
`;

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <StyledTheme>
        <StyledPageWrapper>
          <Header />
          <StyledMainWrapper>
            <main>{children}</main>
          </StyledMainWrapper>
          <Footer />
        </StyledPageWrapper>
      </StyledTheme>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
