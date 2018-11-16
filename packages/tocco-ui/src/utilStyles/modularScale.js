import {theme} from 'styled-system'
import _round from 'lodash/round'

export const fontScale = (props, exponent, unit) =>
  declareScale(props, exponent, 'fontSizeBase', 'fontSizeScale', unit)

export const spaceScale = (props, exponent, unit) =>
  declareScale(props, exponent, 'spaceBase', 'spaceScale', unit)

export const declareScale = (props, exponent, base, scale, unit = 'rem') =>
  `${_round(scaleExponential(theme(base)(props), exponent, theme(scale)(props)), 3)}${unit}`

export const scaleExponential = (base, exponent, scale) =>
  Math.pow(scale, exponent) * base
