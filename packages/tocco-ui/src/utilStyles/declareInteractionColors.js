import _get from 'lodash/get'
import {css} from 'styled-components'
import {
  lighten,
  darken,
  getLuminance,
  tint,
  transparentize
} from 'polished'

import {design} from '../utilStyles'

const declareFocus = props => {
  const infoText = _get(props.theme, 'colors.signal.info.text', design.fallbackColors.INFO)
  return css`
    transition:  border-color ease-in-out 100ms,
                 box-shadow ease-in-out 100ms;
    will-change: border-color,
                 box-shadow;

    &:focus,
    &:focus-within {
      border-color: ${infoText};
      box-shadow: 0 0 6px ${transparentize(0.4, infoText)};
      outline: 0;
    }
  `
}

const declareInteractionColors = (colors, format = design.format.HTML) => {
  const fillProperty = format === design.format.HTML ? 'background-color' : 'fill'
  const strokeProperty = format === design.format.HTML ? 'color' : 'stroke'

  return `
    ${fillProperty}: ${colors.defaultBackground};
    ${strokeProperty}: ${colors.defaultColor};

    &:focus,
    &:hover {
      ${fillProperty}: ${colors.focusBackground};
      ${strokeProperty}: ${colors.focusColor};
    }

    /* :active must be declared after :hover and :focus to visualize state change */
    &:active,
    &[aria-pressed="true"] {
      ${fillProperty}: ${colors.activeBackground};
      ${strokeProperty}: ${colors.activeColor};
    }

    &:disabled {
      ${fillProperty}: ${generateDisabledShade(colors.defaultBackground)};
      ${strokeProperty}: ${generateDisabledShade(colors.defaultColor)};
    }
  `
}

const mapColors = (bg, fg) => ({
  defaultColor: fg[0],
  defaultBackground: bg[0],
  focusColor: fg[1],
  focusBackground: bg[1],
  activeColor: fg[2],
  activeBackground: bg[2]
})

const generateFlatBaseColors = props => {
  const text = _get(props.theme, 'colors.text', design.fallbackColors.TEXT)
  const paper = _get(props.theme, 'colors.paper', design.fallbackColors.PAPER)
  const fg = generateInteractionColor(text, {
    action: getLuminance(paper) > 0.5 ? 'darken' : 'lighten'
  })
  const bg = generateInteractionColor(paper)
  return mapColors(bg, fg)
}

const generateFlatPrimaryColors = props => {
  const primary = _get(props.theme, 'colors.primary', design.fallbackColors.TEXT)
  const paper = _get(props.theme, 'colors.paper', design.fallbackColors.PAPER)
  const fg = generateInteractionColor(primary, {
    action: getLuminance(paper) > 0.5 ? 'darken' : 'lighten'
  })
  const bg = generateInteractionColor(paper)
  return mapColors(bg, fg)
}

const generateRaisedBaseColors = props => {
  const text = _get(props.theme, 'colors.text', design.fallbackColors.TEXT)
  const paper = _get(props.theme, 'colors.paper', design.fallbackColors.PAPER)
  const fg = generateInteractionColor(text, {
    action: getLuminance(paper) > 0.5 ? 'darken' : 'lighten'
  })
  const bg = generateInteractionColor(paper, {
    shadeOffset: 0.1
  })
  return mapColors(bg, fg)
}

const generateRaisedPrimaryColors = props => {
  const text = _get(props.theme, 'colors.text', design.fallbackColors.TEXT)
  const paper = _get(props.theme, 'colors.paper', design.fallbackColors.PAPER)
  const primary = _get(props.theme, 'colors.primary', design.fallbackColors.TEXT)
  const higherContrast = getHigherContrast(primary, text, paper)
  const fg = generateInteractionColor(higherContrast, {
    action: getLuminance(primary) > 0.5 ? 'darken' : 'lighten'
  })
  const bg = generateInteractionColor(primary)
  return mapColors(bg, fg)
}

const generateCustomColors = (base, colorA, colorB) => {
  const higherContrast = getHigherContrast(base, colorA, colorB)
  const bg = generateInteractionColor(base)
  const fg = generateInteractionColor(higherContrast, {
    action: getLuminance(base) > 0.5 ? 'darken' : 'lighten'
  })
  return mapColors(bg, fg)
}

const getContrast = (colorA, colorB) => {
  const luminanceA = getLuminance(colorA)
  const luminanceB = getLuminance(colorB)
  return luminanceA > luminanceB ? luminanceA - luminanceB : luminanceB - luminanceA
}

const getHigherContrast = (base, colorA, colorB) =>
  getContrast(colorA, base) > getContrast(colorB, base) ? colorA : colorB

const generateInteractionColor = (color = design.fallbackColors.SHADE, options = {}) => ([
  options.shadeOffset >= 0
    ? shadeColor(color, 0, options)
    : color,
  shadeColor(color, 1, options),
  shadeColor(color, 2, options)
])

const shadeColor = (color = design.fallbackColors.SHADE, step = 1, options = {}) => {
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
  declareFocus,
  declareInteractionColors,
  generateCustomColors,
  generateRaisedBaseColors,
  generateRaisedPrimaryColors,
  generateFlatBaseColors,
  generateFlatPrimaryColors,
  generateInteractionColor,
  getHigherContrast,
  shadeColor
}
