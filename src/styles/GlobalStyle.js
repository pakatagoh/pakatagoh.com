import { createGlobalStyle } from 'styled-components';
import BebasNeueBold from '../assets/fonts/BebasNeue-Bold.ttf';
import RobotoBold from '../assets/fonts/Roboto-Bold.ttf';
import RobotoMedium from '../assets/fonts/Roboto-Medium.ttf';
import Roboto from '../assets/fonts/Roboto-Regular.ttf';
import RobotoCondensedRegular from '../assets/fonts/RobotoCondensed-Regular.ttf';
import RobotoCondensedRegularItalic from '../assets/fonts/RobotoCondensed-RegularItalic.ttf';

const GlobalStyle = createGlobalStyle`
    @font-face {
    font-family: 'Bebas Neue';
    font-weight: 'bold';
    src: url(${BebasNeueBold})  format('truetype'),
  }
    @font-face {
    font-family: 'Roboto';
    font-weight: 'bold';
    src: url(${RobotoBold})  format('truetype'),
  }
    @font-face {
    font-family: 'Roboto';
    font-weight: 'medium';
    src: url(${RobotoMedium})  format('truetype'),
  }

    @font-face {
    font-family: 'Roboto';
    font-weight: 'normal';
    src: url(${Roboto})  format('truetype'),
  }

    @font-face {
    font-family: 'Roboto Condensed';
    font-weight: 'normal';
    src: url(${RobotoCondensedRegular})  format('truetype'),
  }

    @font-face {
    font-family: 'Roboto Condensed';
    font-weight: 'normal';
    font-style: italic;
    src: url(${RobotoCondensedRegularItalic})  format('truetype'),
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
