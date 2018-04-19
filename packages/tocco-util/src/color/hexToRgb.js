const RADIX = 16

export const hexToRgb = (hex, fallBack = null) => {
  hex = normalizeHex(hex)
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  return result ? {
    r: parseInt(result[1], RADIX),
    g: parseInt(result[2], RADIX),
    b: parseInt(result[3], RADIX)
  } : fallBack
}

const normalizeHex = hex => {
  if (!hex.startsWith('#')) {
    hex = '#' + hex
  }
  return hex.padEnd(7, '0')
}
