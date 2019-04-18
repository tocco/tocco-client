import _round from 'lodash/round'

import theme from './resolveThemePath'

const font = (exponent, unit) => props =>
  declareScale(exponent, theme.fontSize('base')(props), theme.fontSize('factor')(props), unit)

const space = (exponent, unit) => props =>
  declareScale(exponent, theme.space('base')(props), theme.space('factor')(props), unit)

const declareScale = (exponent, base, factor, unit = 'rem') =>
  `${_round(exponentiate(base, exponent, factor), 3)}${unit}`

const exponentiate = (base, exponent, factor) =>
  Math.pow(factor, exponent) * base

export default {
  declareScale,
  exponentiate,
  font,
  space
}
