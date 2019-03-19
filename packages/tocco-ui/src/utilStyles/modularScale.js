import _round from 'lodash/round'
import _get from 'lodash/get'

const font = (theme, exponent, unit) =>
  declareScale(theme, exponent, 'fontSize.base', 'fontSize.factor', unit)

const space = (theme, exponent, unit) =>
  declareScale(theme, exponent, 'space.base', 'space.factor', unit)

const declareScale = (theme, exponent, base, factor, unit = 'rem') =>
  `${_round(exponentiate(_get(theme, base), exponent, _get(theme, factor)), 3)}${unit}`

const exponentiate = (base, exponent, factor) =>
  Math.pow(factor, exponent) * base

export default {
  declareScale,
  exponentiate,
  font,
  space
}
