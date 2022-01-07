export const getOrFirst = value => {
  if (value && Array.isArray(value)) {
    if (value.length > 0) {
      return value[0]
    }
    return []
  }
  return value
}

/**
 * Rounds number to defined decimal places.
 * Examples:
 * const value = roundDecimalPlaces(10.1234, 3) // 10.123
 * const value = roundDecimalPlaces(10.1234, 1) // 10.1
 */
export const roundDecimalPlaces = (value, digits) => {
  const factor = Math.pow(10, digits)
  return Math.round(value * factor) / factor
}

/**
 * Copies text to users clipboard.
 */
export const copyToClipboard = text => {
  if (!navigator.clipboard) {
    return Promise.reject(new Error('navigator.clipboard API not available'))
  }

  return navigator.clipboard.writeText(text)
}
