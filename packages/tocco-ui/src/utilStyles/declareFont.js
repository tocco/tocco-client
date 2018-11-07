import {theme} from 'styled-system'

import objectToCss from './objectToCss'

const declareFont = (props, options) => {
  options = Object.assign({
    color: theme('colors.text')(props),
    fontFamily: theme('fontFamily.sansSerif')(props),
    fontSize: `${theme('fontSizeBase')(props)}rem`,
    fontStyle: 'normal',
    fontWeight: theme('fontWeights.regular')(props),
    lineHeight: theme('lineHeights.regular')(props)
  }, options)

  const declarations = {
    'color': options.color,
    'font-family': options.fontFamily,
    'font-size': options.fontSize,
    'font-style': options.fontStyle,
    'font-weight': options.fontWeight,
    'line-height': options.lineHeight
  }

  return objectToCss(declarations)
}

export default declareFont
