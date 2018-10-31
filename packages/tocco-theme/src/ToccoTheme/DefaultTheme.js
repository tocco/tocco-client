/* COLORS
 * base.paper and base.text are the very basic colors
 * base.fill and primary.fill are used for backgrounds which change by state
 * base.line and primary.line are use for text and borders which change by state
 * line and fill must have a high contrast
 * primary.fill and pirmary.line must have the same hue but differentiate in saturation
 * and/or brightness to align visual perception
 * primary line must have a high contrast to to base fill
 * primary fillContrast could be set if the contrast between primary fill and base line is not sufficient
 * color[0] is used as default (stateless)
 * color[1] is used for hover state
 * color[2] is used for active state
*/

const colors = {
  base: {
    fill: [
      '#EEEEEE', // Grey 200
      '#E0E0E0', // Grey 300
      '#BDBDBD' // Grey 400
    ],
    line: [
      '#424242', // Grey 800
      '#303030', // Grey 850
      '#212121' // Grey 900
    ],
    paper: '#FFFFFF',
    text: '#212121' // Grey 900
  },
  primary: {
    fill: [
      '#9E2124', // Tocco Red
      '#841B1D', // Tocco Red (darken 10%)
      '#6B1617' // Tocco Red (darken 20%)
    ],
    line: [
      '#9E2124', // Tocco Red
      '#841B1D', // Tocco Red (darken 10%)
      '#6B1617' // Tocco Red (darken 20%)
    ],
    fillContrast: [
      '#FAFAFA', // Grey 50
      '#F5F5F5', // Grey 100
      '#EEEEEE' // Grey 200
    ]
  },
  signal: {
    danger: '#D32F2F', // Red 700
    dangerBg: '#EF9A9A', // Red 200
    info: '#FBC02D', // Yellow 700
    infoBg: '#FFF59D', // Yellow 200
    success: '#388E3C', // Green 700
    successBg: '#A5D6A7', // Green 200
    warning: '#FFA000', // Amber 700
    warningBg: '#FFE082' // Amber 200
  }
}

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

const fontWeights = {
  regular: 400,
  bold: 700
}

/* LINE HEIGHT
   lineHeights[0] = dense mode
   lineHeights[1] = normal mode
 */
const lineHeights = [
  1,
  1.4
]

const overlays = {
  disabled: {
    color: colors.base.paper,
    opacity: 0.7
  }
}

const radii = '4px'

const shadows = {
  levels: [
    'none',
    '0 1px 1px 1px',
    '0 2px 2px 2px'
  ],
  color: 'rgba(33, 33, 33, .6)'
}

/* SPACE
 * Space controls vertical and horizontal white space rhythm.
 * Unit 'rem' is required for correct presentation, independently from zoom and nesting.
 * It is recommended to use powers of two to ensure alignment.
 * space[0] = 0px
 * space[1] = 1px
 * space[2] = 2px
 * space[3] = 4px
 * space[4] = 8px
 * space[5] = 16px
 * space[6] = 32px
 * space[7] = 64px
 * space[8] = 128px
 * space[9] = 256px
 * space[10] = 512px
 */
const space = [
  0, '.0625rem', '.125rem', '.25rem', '.5rem', '1rem', '2rem', '4rem', '8rem', '16rem', '32rem'
]

const defaultTheme = {
  colors,
  fontSizeBase,
  fontSizeScale,
  fontFamily,
  fontWeights,
  lineHeights,
  overlays,
  radii,
  shadows,
  space
}

export default defaultTheme
