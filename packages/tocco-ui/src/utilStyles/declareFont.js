import {theme} from '../utilStyles'
import objectToCss from './objectToCss'

const declareFont = (props, options) => {
  options = Object.assign({
    color: theme.color('text')(props),
    fontFamily: theme.fontFamily('regular')(props),
    fontSize: `${theme.fontSize('base')(props)}rem`,
    fontStyle: 'normal',
    fontWeight: theme.fontWeight('regular')(props),
    lineHeight: theme.lineHeight('regular')(props)
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
