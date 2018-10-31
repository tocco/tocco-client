import {theme} from 'styled-system'

import objectToCss from './objectToCss'

const declareFont = (props, options) => {
  options = Object.assign({
    fontFamily: theme('fontFamily.sansSerif')(props),
    fontSize: `${theme('fontSizeBase')(props)}rem`,
    fontStyle: 'normal',
    fontWeight: theme('fontWeights.regular')(props),
    lineHeight: theme('lineHeights.1')(props)
  }, options)

  const declarations = {
    'font-family': options.fontFamily,
    'font-size': options.fontSize,
    'font-style': options.fontStyle,
    'font-weight': options.fontWeight,
    'line-height': options.lineHeight
  }

  return objectToCss(declarations)
}

export default declareFont
