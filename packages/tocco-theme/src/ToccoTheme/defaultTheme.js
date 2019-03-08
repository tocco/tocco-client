export default {
  /* Paper, text and primary are the main colors. Whereas signal colors are only used to
   * emphasize states. Paper must be a light color. Colors text and primary must have
   * a high contrast to paper colors. */
  colors: {
    paper: '#fff',
    primary: '#9E2124',
    text: '#212121',
    signal: {
      danger: {
        paper: '#EF9A9A', // Red 200
        text: '#D32F2F' // Red 700
      },
      info: {
        paper: '#81D4FA', // Light Blue 200
        text: '#0288D1' // Light Blue 700
      },
      success: {
        paper: '#A5D6A7', // Green 200
        text: '#388E3C' // Green 700
      },
      warning: {
        paper: '#FFE082', // Amber 200
        text: '#FFA000' // Amber 700
      }
    }
  },
  /* Use web safe fonts or load fonts from a web service.
   * Declare font stack by variables monospace and regular (e.g. "font-family: [VARIABLE];").
   * Load fonts from web font services (e.g. "@import url([VARIABLE]);". */
  fontFamily: {
    monospace: 'Menlo, Monaco, Consolas, "Courier New", monospace',
    regular: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    url: ''
  },
  /* All font sizes are calculated automatically as an exponential scale.
   * Both values must be provided as unitless factors. Base is interpreted as
   * rem, hence it inherits from websites root. */
  fontSize: {
    base: 1.4,
    factor: 1.3
  },
  /* Change weights for extra light or extra bold typography but ensure that
   * font files does provide such weights. */
  fontWeights: {
    regular: 400,
    bold: 700
  },
  /* Line height is a factor applied on font size. */
  lineHeights: {
    dense: 1,
    regular: 1.4
  },
  /* Radii is used to round corners of elements like panels, field and buttons. */
  radii: {
    regular: '4px'
  },
  /* Base and factor are used to control vertical and horizontal white
   * space rhythm. All spaces are calculated automatically as an exponential scale.
   * Both values must be provided as unitless factors. Base is interpreted as
   * rem, hence it inherits from websites root. It is recommended to use
   * fontSice.base multiplied by lineHeights.regular for space.base and powers
   * of for space.factor two to ensure alignment */
  space: {
    base: 2,
    factor: 2
  }
}
