import {themeGet} from 'styled-system'
import {
  lighten,
  darken,
  getLuminance,
  tint
} from 'polished'

import {
  stylingFormat
} from '../utilStyles'

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

    &:disabled {
      ${fillProperty}: ${generateDisabledShade(colors.defaultBackground)};
      ${strokeProperty}: ${generateDisabledShade(colors.defaultColor)};

      &:focus,
      &:hover {
        ${fillProperty}: ${generateDisabledShade(colors.focusBackground)};
        ${strokeProperty}: ${generateDisabledShade(colors.focusColor)};
      }

      /* :active must be declared after :hover and :focus to visualize state change */
      &:active {
        ${fillProperty}: ${generateDisabledShade(colors.activeBackground)};
        ${strokeProperty}: ${generateDisabledShade(colors.activeColor)};
      }
    }
  `
}

const declareFlatBaseColors = props => {
  const text = themeGet('colors.text', '#010101')(props)
  const paper = themeGet('colors.paper', '#fefefe')(props)
  const fg = getInteractionColor(text, {
    action: getLuminance(paper) > 0.5 ? 'darken' : 'lighten'
  })
  const bg = getInteractionColor(paper)

  return {
    defaultColor: fg[0],
    defaultBackground: bg[0],
    focusColor: fg[1],
    focusBackground: bg[1],
    activeColor: fg[2],
    activeBackground: bg[2]
  }
}

const declareFlatPrimaryColors = props => {
  const primary = themeGet('colors.primary', '#010101')(props)
  const paper = themeGet('colors.paper', '#fefefe')(props)
  const fg = getInteractionColor(primary, {
    action: getLuminance(paper) > 0.5 ? 'darken' : 'lighten'
  })
  const bg = getInteractionColor(paper)

  return {
    defaultColor: fg[0],
    defaultBackground: bg[0],
    focusColor: fg[1],
    focusBackground: bg[1],
    activeColor: fg[2],
    activeBackground: bg[2]
  }
}

const declareRaisedBaseColors = props => {
  const text = themeGet('colors.text', '#010101')(props)
  const paper = themeGet('colors.paper', '#fefefe')(props)
  const fg = getInteractionColor(text, {
    action: getLuminance(paper) > 0.5 ? 'darken' : 'lighten'
  })
  const bg = getInteractionColor(paper, {
    shadeOffset: 0.1
  })

  return {
    defaultColor: fg[0],
    defaultBackground: bg[0],
    focusColor: fg[1],
    focusBackground: bg[1],
    activeColor: fg[2],
    activeBackground: bg[2]
  }
}

const declareRaisedPrimaryColors = props => {
  const text = themeGet('colors.text', '#010101')(props)
  const paper = themeGet('colors.paper', '#fefefe')(props)
  const primary = themeGet('colors.primary', '#010101')(props)
  const higherContrast = getContrast(text, primary) > getContrast(paper, primary) ? text : paper
  const fg = getInteractionColor(higherContrast, {
    action: getLuminance(primary) > 0.5 ? 'darken' : 'lighten'
  })
  const bg = getInteractionColor(primary)

  return {
    defaultColor: fg[0],
    defaultBackground: bg[0],
    focusColor: fg[1],
    focusBackground: bg[1],
    activeColor: fg[2],
    activeBackground: bg[2]
  }
}

const getContrast = (colorA, colorB) => {
  const luminanceA = getLuminance(colorA)
  const luminanceB = getLuminance(colorB)
  return luminanceA > luminanceB ? luminanceA - luminanceB : luminanceB - luminanceA
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

const generateDisabledShade = color => tint(0.5, color)

export {
  declareFlatBaseColors,
  declareInteractionColors,
  declareRaisedBaseColors,
  declareRaisedPrimaryColors,
  declareFlatPrimaryColors,
  getInteractionColor,
  shadeColor
}
