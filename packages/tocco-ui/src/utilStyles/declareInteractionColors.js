import {themeGet} from 'styled-system'
import {
  lighten,
  darken,
  getLuminance,
  tint
} from 'polished'

import {
  fallbackColors,
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

const generateFlatBaseColors = props => {
  const text = themeGet('colors.text', fallbackColors.TEXT)(props)
  const paper = themeGet('colors.paper', fallbackColors.PAPER)(props)
  const fg = generateInteractionColor(text, {
    action: getLuminance(paper) > 0.5 ? 'darken' : 'lighten'
  })
  const bg = generateInteractionColor(paper)

  return {
    defaultColor: fg[0],
    defaultBackground: bg[0],
    focusColor: fg[1],
    focusBackground: bg[1],
    activeColor: fg[2],
    activeBackground: bg[2]
  }
}

const generateFlatPrimaryColors = props => {
  const primary = themeGet('colors.primary', fallbackColors.TEXT)(props)
  const paper = themeGet('colors.paper', fallbackColors.PAPER)(props)
  const fg = generateInteractionColor(primary, {
    action: getLuminance(paper) > 0.5 ? 'darken' : 'lighten'
  })
  const bg = generateInteractionColor(paper)

  return {
    defaultColor: fg[0],
    defaultBackground: bg[0],
    focusColor: fg[1],
    focusBackground: bg[1],
    activeColor: fg[2],
    activeBackground: bg[2]
  }
}

const generateRaisedBaseColors = props => {
  const text = themeGet('colors.text', fallbackColors.TEXT)(props)
  const paper = themeGet('colors.paper', fallbackColors.PAPER)(props)
  const fg = generateInteractionColor(text, {
    action: getLuminance(paper) > 0.5 ? 'darken' : 'lighten'
  })
  const bg = generateInteractionColor(paper, {
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

const generateRaisedPrimaryColors = props => {
  const text = themeGet('colors.text', fallbackColors.TEXT)(props)
  const paper = themeGet('colors.paper', fallbackColors.PAPER)(props)
  const primary = themeGet('colors.primary', fallbackColors.TEXT)(props)
  const higherContrast = getContrast(text, primary) > getContrast(paper, primary) ? text : paper
  const fg = generateInteractionColor(higherContrast, {
    action: getLuminance(primary) > 0.5 ? 'darken' : 'lighten'
  })
  const bg = generateInteractionColor(primary)

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

const generateInteractionColor = (color = fallbackColors.SHADE, options = {}) => ([
  options.shadeOffset >= 0
    ? shadeColor(color, 0, options)
    : color,
  shadeColor(color, 1, options),
  shadeColor(color, 2, options)
])

const shadeColor = (color = fallbackColors.SHADE, step = 1, options = {}) => {
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
  generateFlatBaseColors,
  declareInteractionColors,
  generateRaisedBaseColors,
  generateRaisedPrimaryColors,
  generateFlatPrimaryColors,
  generateInteractionColor,
  shadeColor
}
