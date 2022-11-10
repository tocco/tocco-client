import assertObjectValuesMatchOtherObjectKeys from './assertObjectValuesMatchOtherObjectKeys'
import {colorizeBorder, colorizeText} from './colorMap'
import declareFont from './declareFont'
import {
  declareFocus,
  declareInteractionColors,
  generateDisabledShade,
  generateInteractionColors,
  generateShades,
  getBestContrast,
  shadeColor
} from './declareInteractionColors'
import {declareNoneWrappingText, declareWrappingText} from './declareWrapping'
import design from './designConstants'
import {isTouchDevice} from './detectTouchDevice'
import filterObjectByKeysStartingWith from './filterObjectByKeysStartingWith'
import getTextOfChildren from './getTextOfChildren'
import interactiveStyling from './interactiveStyling'
import scale from './modularScale'
import {validateCssDimension} from './propTypesValidator'
import theme from './resolveThemePath'
import {useCollapseOnMobile} from './useCollapseOnMobile'
import {useWindowSize} from './useWindowSize'

const themeSelector = theme
export {
  interactiveStyling,
  assertObjectValuesMatchOtherObjectKeys,
  colorizeBorder,
  colorizeText,
  declareFocus,
  declareFont,
  declareInteractionColors,
  declareNoneWrappingText,
  declareWrappingText,
  design,
  filterObjectByKeysStartingWith,
  generateDisabledShade,
  generateInteractionColors,
  generateShades,
  getBestContrast,
  getTextOfChildren,
  scale,
  shadeColor,
  theme,
  themeSelector,
  validateCssDimension,
  isTouchDevice,
  useWindowSize,
  useCollapseOnMobile
}
