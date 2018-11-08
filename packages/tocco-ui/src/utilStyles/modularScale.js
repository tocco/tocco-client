import {theme} from 'styled-system'
import _round from 'lodash/round'

export const scaleExponential = (base, exponent, scale) => {
  return Math.pow(scale, exponent) * base
}

export const fontScale = (props, exponent, unit = 'rem') => {
  const base = theme('fontSizeBase')(props)
  const scale = theme('fontSizeScale')(props)
  return `${_round(scaleExponential(base, exponent, scale), 3)}${unit}`
}

export const spaceScale = (props, exponent, unit = 'rem') => {
  const base = theme('spaceBase')(props)
  const scale = theme('spaceScale')(props)
  return `${_round(scaleExponential(base, exponent, scale), 3)}${unit}`
}
