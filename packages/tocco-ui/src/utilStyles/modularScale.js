import {theme} from 'styled-system'
import _round from 'lodash/round'

const font = (props, exponent, unit) =>
  declareScale(props, exponent, 'fontSize.base', 'fontSize.factor', unit)

const space = (props, exponent, unit) =>
  declareScale(props, exponent, 'space.base', 'space.factor', unit)

const declareScale = (props, exponent, base, factor, unit = 'rem') =>
  `${_round(exponentiate(theme(base)(props), exponent, theme(factor)(props)), 3)}${unit}`

const exponentiate = (base, exponent, factor) =>
  Math.pow(factor, exponent) * base

export default {
  declareScale,
  exponentiate,
  font,
  space
}
