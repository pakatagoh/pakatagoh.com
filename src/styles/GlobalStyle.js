import { createGlobalStyle } from 'styled-components';
import * as fontFiles from './fonts';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Bebas Neue';
    font-weight: 'bold';
    src: url(${fontFiles.BebasNeueBold}) format('truetype');
  }
  @font-face {
    font-family: 'Roboto';
    font-weight: 'bold';
    src: url(${fontFiles.RobotoBold}) format('truetype');
  }
  @font-face {
    font-family: 'Roboto';
    font-weight: 'medium';
    src: url(${fontFiles.RobotoMedium}) format('truetype');
  }

  @font-face {
    font-family: 'Roboto';
    font-weight: 'normal';
    src: url(${fontFiles.Roboto}) format('truetype');
  }

  @font-face {
    font-family: 'Roboto Condensed';
    font-weight: 'normal';
    src: url(${fontFiles.RobotoCondensedRegular}) format('truetype');
  }

  @font-face {
    font-family: 'Roboto Condensed';
    font-weight: 'normal';
    font-style: italic;
    src: url(${fontFiles.RobotoCondensedRegularItalic}) format('truetype');
  }

  html{
    height: 100%;
    box-sizing: border-box;
  }
  body {
    min-height: 100%;
    margin: 0;
  }
  
  *, *:before, *:after {
  box-sizing: inherit;
  }
`;

export default GlobalStyle;
