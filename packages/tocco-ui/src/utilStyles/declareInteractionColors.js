import {theme} from 'styled-system'
import {lighten, darken, getLuminance} from 'polished'

import {stylingFormat} from '../utilStyles'

const declareInteractionColors = (colors, format = stylingFormat.HTML) => {
  const fillProperty = format === stylingFormat.HTML ? 'background-color' : 'fill'
  const strokeProperty = format === stylingFormat.HTML ? 'color' : 'stroke'

  return `
    ${fillProperty}: ${colors.defaultBackground};
    ${strokeProperty}: ${colors.defaultColor};

    &:enabled {
      &:focus,
      &:hover {
        ${fillProperty}: ${colors.focusBackground};
        ${strokeProperty}: ${colors.focusColor};
      }

      /* :active must be declared after :hover and :focus to visualize state change */
      &:active {
        ${fillProperty}: ${colors.activeBackground};
        ${strokeProperty}: ${colors.activeColor};
      }
    }
  `
}

const declareFlatBaseColors = props => {
  return {
    defaultColor: theme('colors.text')(props),
    defaultBackground: theme('colors.paper')(props),
    focusColor: theme('colors.base.line.1')(props),
    focusBackground: theme('colors.base.fill.0')(props),
    activeColor: theme('colors.base.line.2')(props),
    activeBackground: theme('colors.base.fill.1')(props)
  }
}

const declareFlatPrimaryColors = props => {
  return {
    defaultColor: theme('colors.primary.line.0')(props),
    defaultBackground: theme('colors.paper')(props),
    focusColor: theme('colors.primary.line.1')(props),
    focusBackground: theme('colors.base.fill.0')(props),
    activeColor: theme('colors.primary.line.2')(props),
    activeBackground: theme('colors.base.fill.1')(props)
  }
}

const declareRaisedBaseColors = props => {
  return {
    defaultColor: theme('colors.base.line.0')(props),
    defaultBackground: theme('colors.base.fill.0')(props),
    focusColor: theme('colors.base.line.1')(props),
    focusBackground: theme('colors.base.fill.1')(props),
    activeColor: theme('colors.base.line.2')(props),
    activeBackground: theme('colors.base.fill.2')(props)
  }
}

const declareRaisedPrimaryColors = props => {
  return {
    defaultColor: theme('colors.primary.fillContrast.0')(props),
    defaultBackground: theme('colors.primary.fill.0')(props),
    focusColor: theme('colors.primary.fillContrast.1')(props),
    focusBackground: theme('colors.primary.fill.1')(props),
    activeColor: theme('colors.primary.fillContrast.2')(props),
    activeBackground: theme('colors.primary.fill.2')(props)
  }
}

const getInteractionColor = (color = '#000', options = {}) => ([
  options.shadeOffset >= 0
    ? shadeColor(color, 0, options)
    : color,
  shadeColor(color, 1, options),
  shadeColor(color, 2, options)
])

const shadeColor = (color = '#000', step = 1, options = {}) => {
  const {
    action,
    shadeFactor,
    shadeOffset
  } = Object.assign({}, {
    action: 'auto',
    shadeFactor: 0.1,
    shadeOffset: 0
  }, options)

  const factor = shadeFactor * step + shadeOffset

  if (action === 'auto') {
    return getLuminance(color) < 0.5
      ? lighten(factor, color)
      : darken(factor, color)
  } else if (action === 'lighten') {
    return lighten(factor, color)
  } else if (action === 'darken') {
    return darken(factor, color)
  } else {
    return color
  }
}

export {
  declareFlatBaseColors,
  declareInteractionColors,
  declareRaisedBaseColors,
  declareRaisedPrimaryColors,
  declareFlatPrimaryColors,
  getInteractionColor,
  shadeColor
}
