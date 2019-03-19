import _get from 'lodash/get'

import objectToCss from './objectToCss'

const declareFont = (props, options) => {
  options = Object.assign({
    color: _get(props.theme, 'colors.text'),
    fontFamily: _get(props.theme, 'fontFamily.regular'),
    fontSize: `${_get(props.theme, 'fontSize.base')}rem`,
    fontStyle: 'normal',
    fontWeight: _get(props.theme, 'fontWeights.regular'),
    lineHeight: _get(props.theme, 'lineHeights.regular')
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
