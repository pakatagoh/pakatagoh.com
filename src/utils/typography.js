import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '18px',
  scaleRatio: 3.33,
  baseLineHeight: 1.666,
  headerFontFamily: ['Bebas Neue', 'Segoe UI', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Roboto', 'Georgia', 'serif'],
  overrideStyles: () => ({
    nav: {
      fontFamily: ['Bebas Neue Book', 'Segoe UI', 'Arial', 'sans-serif'].join(','),
    },
  }),
});

const { rhythm, scale, options } = typography;

// @link: https://github.com/KyleAMathews/typography.js/blob/49363c455d931f2fceaf7b7594c2c5159c1dc416/packages/typography/src/utils/createStyles.js#L248
const baseHeaderScale = {
  h1: 1,
  h2: 3 / 5,
  h3: 2 / 5,
  h4: 0 / 5,
  h5: -1 / 5,
  h6: -1.5 / 5,
};

export { rhythm, scale, options, baseHeaderScale };
export default typography;
