import {theme} from 'styled-system'

export const trimDecimalPlaces = (value, maxDecimalPlaces = 3) =>
  Math.round(value * Math.pow(10, maxDecimalPlaces)) / Math.pow(10, maxDecimalPlaces)

export const scaleExponential = (base, exponent, scale) => {
  return Math.pow(scale, exponent) * base
}

export const fontScale = (props, exponent, unit = 'rem') => {
  const base = theme('fontSizeBase')(props)
  const scale = theme('fontSizeScale')(props)
  return `${trimDecimalPlaces(scaleExponential(base, exponent, scale))}${unit}`
}

export const spaceScale = (props, exponent, unit = 'rem') => {
  const base = theme('spaceBase')(props) * theme('lineHeights.1')(props)
  const scale = theme('spaceScale')(props)
  return `${trimDecimalPlaces(scaleExponential(base, exponent, scale))}${unit}`
}
