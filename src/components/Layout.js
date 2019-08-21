import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import '../styles/fonts.css';
import '../styles/icons.css';
import GlobalStyle from '../styles/GlobalStyle';
import StyledTheme from '../styles/StyledTheme';
import Header from './Header';
import Footer from './Footer';
import { media } from '../styles/sizes';

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
  /* height of sticky nav */
  /* see Header component */
  padding-top: 4rem;

  ${media.sm`
  padding-top: 7rem;
  `};
  /* height of Footer */
  /* see Footer component */
  padding-bottom: 3rem;
`;

const StyledMain = styled.main`
  padding-bottom: 2rem;

  ${media.sm`
    padding-bottom: 0;
  `}
`;

const Layout = ({ children }) => {
  return (
    <>
      <StyledTheme>
        <GlobalStyle />
        <StyledPageWrapper>
          <Header />
          <StyledMainWrapper>
            <StyledMain>{children}</StyledMain>
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
