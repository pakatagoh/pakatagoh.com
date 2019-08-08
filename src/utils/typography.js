import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  headerFontFamily: ['Bebas Neue', 'Segoe UI', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Roboto', 'Georgia', 'serif'],
  overrideStyles: () => ({
    nav: {
      fontFamily: ['Bebas Neue', 'Segoe UI', 'Arial', 'sans-serif'].join(','),
    },
  }),
});
export default typography;
