import {getInteractionColor, trimDecimalPlaces} from 'tocco-ui'
import {getLuminance} from 'polished'

const paper = '#FFFFFF'
const text = '#212121'
const primary = '#9E2124'

const colors = {
  paper,
  text,
  base: {
    fill: getInteractionColor(paper, {shadeOffset: 0.1}),
    line: getInteractionColor(paper, {shadeOffset: 0.4})
  },
  primary: {
    fill: getInteractionColor(primary, {action: 'darken'}),
    line: getInteractionColor(primary, {action: 'darken'}),
    fillContrast: getLuminance(primary) > 0.5 ? getInteractionColor(text) : getInteractionColor(paper)
  },
  signal: {
    danger: '#D32F2F', // Red 700
    dangerBg: '#EF9A9A', // Red 200
    info: '#0288D1', // Light Blue 700
    infoBg: '#81D4FA', // Light Blue 200
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
 * SpaceBase and spaceScale are used to control vertical and horizontal white
 * space rhythm. All spaces are calculated automatically as an exponential scale.
 * Both variables are unitless factors. SpaceBase is interpreted as
 * rem, hence it inherits from websites root. It is recommended to use powers
 * of two to ensure alignment.
 */
const spaceBase = trimDecimalPlaces(fontSizeBase * lineHeights[1])
const spaceScale = 2

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
  spaceBase,
  spaceScale
}

export default defaultTheme
