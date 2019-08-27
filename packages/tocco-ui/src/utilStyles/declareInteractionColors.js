import _get from 'lodash/get'
import {css} from 'styled-components'
import {
  lighten,
  darken,
  getLuminance,
  tint,
  transparentize
} from 'polished'

import {
  design
} from '../utilStyles'

const colorSchemes = {
  flatBase: {
    bg: 'colors.paper',
    fg: 'colors.text'
  },
  flatPrimary: {
    bg: 'colors.paper',
    fg: 'colors.primary'
  },
  raisedBase: {
    bg: 'colors.paper',
    bgOption: {shadeOffset: 0.1},
    fg: 'colors.text'
  },
  raisedPrimary: {
    bg: 'colors.primary',
    fg: 'colors.text, colors.paper'
  }
}

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
    ${fillProperty}: ${colors.bg[0]};
    ${strokeProperty}: ${colors.fg[0]};

    &:focus,
    &:hover {
      ${fillProperty}: ${colors.bg[1]};
      ${strokeProperty}: ${colors.fg[1]};
    }

    /* :active must be declared after :hover and :focus to visualize state change */
    &:active,
    &[aria-pressed="true"] {
      ${fillProperty}: ${colors.bg[2]};
      ${strokeProperty}: ${colors.fg[2]};
    }

    &:disabled {
      ${fillProperty}: ${tint(0.5, colors.bg[0])};
      ${strokeProperty}: ${tint(0.5, colors.fg[0])};
    }
  `
}

const resolveColors = (theme, colors) =>
  colors.split(/\s*,\s*/).map(color =>
    color.startsWith('colors.')
      ? _get(theme, color)
      : color
  )

const lightenOrDarken = (color = design.fallbackColors.SHADE) =>
  getLuminance(color) > 0.5 ? 'darken' : 'lighten'

const generateInteractionColors = ({theme}, scheme) => {
  const {
    bg,
    bgOption = {},
    fg,
    fgOption = {}
  } = colorSchemes[scheme] || scheme

  const bgResolved = resolveColors(theme, bg)
  const fgResolved = resolveColors(theme, fg)

  const bgBestContrast = bgResolved.length > 1
    ? getBestContrast(fgResolved[0], bgResolved[0], bgResolved[1])
    : bgResolved[0]
  const fgBestContrast = fgResolved.length > 1
    ? getBestContrast(bgResolved[0], fgResolved[0], fgResolved[1])
    : fgResolved[0]

  bgOption.action = bgOption.action || lightenOrDarken(bgBestContrast)
  fgOption.action = fgOption.action || lightenOrDarken(bgBestContrast)

  return {
    bg: generateShades(bgBestContrast, bgOption),
    fg: generateShades(fgBestContrast, fgOption)
  }
}

const getContrast = (colorA = design.fallbackColors.SHADE, colorB = design.fallbackColors.PAPER) => {
  const luminanceA = getLuminance(colorA)
  const luminanceB = getLuminance(colorB)
  return luminanceA > luminanceB ? luminanceA - luminanceB : luminanceB - luminanceA
}

const getBestContrast = (base, colorA, colorB) =>
  getContrast(colorA, base) > getContrast(colorB, base) ? colorA : colorB

const generateShades = (color = design.fallbackColors.SHADE, options = {}) => ([
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
    shadeFactor: 0.1,
    shadeOffset: 0
  }, options)

  const factor = shadeFactor * step + shadeOffset

  if (action === 'lighten') {
    return lighten(factor, color)
  } else if (action === 'darken') {
    return darken(factor, color)
  } else {
    return getLuminance(color) > 0.5
      ? darken(factor, color)
      : lighten(factor, color)
  }
}

const generateDisabledShade = color => shadeColor(color, 3, {action: 'lighten'})

export {
  declareFocus,
  declareInteractionColors,
  generateDisabledShade,
  generateInteractionColors,
  generateShades,
  getBestContrast,
  shadeColor
}
