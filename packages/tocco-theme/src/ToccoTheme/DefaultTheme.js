import {trimDecimalPlaces} from 'tocco-ui'

/* COLORS
 * Paper, text and primary are the main colors. Whereas signal colors are only used to
 * emphasize states. Paper must be a light color. Colors text and primary must have
 * a high contrast to paper colors.
 */
const colors = {
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
}

/* FONT Family
 * Use web safe fonts or provide font files and @font-face separately.
 * Variable fontFamily control declaration but does not load fonts.
 */
const fontFamily = {
  sansSerif: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  monospace: 'Menlo, Monaco, Consolas, "Courier New", monospace'
}

/* FONT SIZES
 * All font sizes are calculated automatically as an exponential scale.
 * Both variables are unitless factors. Base font size is interpreted as
 * rem, hence it inherits from websites root.
 */
const fontSizeBase = 1.4
const fontSizeScale = 1.3

/* FONT WEIGHTS
 * Change weights for extra light or extra bold typography but ensure that
 * font files does provide such weights.
 */
const fontWeights = {
  regular: 400,
  bold: 700
}

/* LINE HEIGHT
 * Line height is a factor applied on font size.
 */
const lineHeights = {
  dense: 1,
  regular: 1.4
}

/* RADII
 * Radii is used to round corners of elements like panels, field and buttons.
 */
const radii = '4px'

/* SPACE
 * SpaceBase and spaceScale are used to control vertical and horizontal white
 * space rhythm. All spaces are calculated automatically as an exponential scale.
 * Both variables must be provided as unitless factors. SpaceBase is interpreted as
 * rem, hence it inherits from websites root. It is recommended to use powers
 * of two to ensure alignment.
 */
const spaceBase = trimDecimalPlaces(fontSizeBase * lineHeights.regular)
const spaceScale = 2

const defaultTheme = {
  colors,
  fontSizeBase,
  fontSizeScale,
  fontFamily,
  fontWeights,
  lineHeights,
  radii,
  spaceBase,
  spaceScale
}

export default defaultTheme
