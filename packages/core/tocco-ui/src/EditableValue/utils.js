/*
 * Returns format separators provided by intl API.
 */
export const parseLocalePlaceholder = countryCode => {
  const thousandSeparator = (1111).toLocaleString(countryCode).replace(/1/g, '')
  const decimalSeparator = (1.1).toLocaleString(countryCode).replace(/1/g, '')

  return {thousandSeparator, decimalSeparator}
}

/*
 * String to number converter
 */
export const convertStringToNumber = stringValue =>
  !stringValue || isNaN(stringValue) ? null : parseFloat(stringValue)

export const ensureNegative = number => Math.abs(number) * -1

/*
 * Convert two numbers as hours and minutes to milliseconds
 */
export const calculateMilliseconds = (hours, minutes) => {
  if (!hours && !minutes) {
    return null
  }

  if (hours < 0 || minutes < 0) {
    hours = ensureNegative(hours)
    minutes = ensureNegative(minutes)
  }

  const hoursMilliseconds = (hours || 0) * 60 * 60000
  const minutesMilliseconds = (minutes || 0) * 60000
  return hoursMilliseconds + minutesMilliseconds
}
