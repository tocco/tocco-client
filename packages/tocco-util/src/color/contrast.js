import {hexToRgb} from './hexToRgb'

const LUMIANCE_LIMIT = 0.179

const calculateLight = colorItem => {
  let c = colorItem / 255.0
  if (c <= 0.03928) {
    c = c / 12.92
  } else {
    c = Math.pow((c + 0.055) / 1.055, 2.4)
  }
  return c
}

const calculateLumiance = color =>
  0.2126 * calculateLight(color.r) + 0.7152 * calculateLight(color.g) + 0.0722 * calculateLight(color.b)

/***
 * Returns a dark or bright value depending on the given color.
 * This could be used to choose a pleasant font color to a background color.
 * @param hexColor Hex Color code
 * @param brightValue Bright value can be overridden. Default is the color white as hex.
 * @param darkValue Dark value can be overridden. Default is the color black as hex.
 * @returns {string}
 */
export const getContrastColor = (hexColor, brightValue = '#FFFFFF', darkValue = '#000000') => {
  const rgbColor = hexToRgb(hexColor)

  if (rgbColor) {
    return calculateLumiance(rgbColor) > LUMIANCE_LIMIT ? darkValue : brightValue
  }

  return brightValue
}
