import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'HelveticaNeueW20-55Roman';
    src: url('../fonts/HelveticaNeueW20-55Roman.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'HelveticaNeueW20-75Bold';
    src: url('../fonts/HelveticaNeueW20-75Bold.woff2') format('woff2');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'HelvNeue55_W1G';
    src: url('../fonts/HelvNeue55_W1G.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'HelvNeue75_W1G';
    src: url('../fonts/HelvNeue75_W1G.woff2') format('woff2');
    font-weight: bold;
    font-style: normal;
  }
`;

export default GlobalStyles;
