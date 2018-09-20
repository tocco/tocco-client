import _forOwn from 'lodash/forOwn'

export const atMostOne = array => {
  if (!array || array.length === 0) {
    return null
  } else if (array.length === 1) {
    return array[0]
  } else {
    throw new Error(`Expected at most one item in array: ${array.join(', ')}`)
  }
}

/**
 * Get a date value as `YYYY-MM-DD` string representation.
 *
 * @param date Anything that the `Date` constructor accepts as single argument
 * @returns {string} The given date in format `YYYY-MM-DD`
 */
export const toLocalDateString = date => {
  if (date == null) {
    return null
  }

  const dateObj = new Date(date)

  const year = dateObj.getFullYear()
  const month = dateObj.getMonth() + 1 // getMonth() is zero-based
  const day = dateObj.getDate()

  return [
    year,
    (month > 9 ? '' : '0') + month,
    (day > 9 ? '' : '0') + day
  ].join('-')
}

/**
 * Converts the formatting string of momentJS to one compatible with flatpickr.
 * see: https://flatpickr.js.org/formatting/
 * @param format momentJS formatting string
 * @returns {string} flatpickr formatting string
 */
export const momentJStoToFlatpickrFormat = format => {
  const formattingMap = {
    'd': 'DD',
    'm': 'MM',
    'Y': 'YYYY',
    'K': 'A',
    'H': 'HH',
    'h': 'h',
    'i': 'mm'
  }
  _forOwn(formattingMap, (v, k) => { format = format.replace(v, k) })
  return format
}

/*
 * Returns format separators provided by intl API.
 */
export const parseLocalePlaceholder = countryCode => {
  const thousandSeparator = (1111).toLocaleString(countryCode).replace(/1/g, '')
  const decimalSeparator = (1.1).toLocaleString(countryCode).replace(/1/g, '')

  return {thousandSeparator, decimalSeparator}
}

/*
 * Limits formatted value of react-number-format
 */
export const limitValue = maxValueObject => values => {
  const {formattedValue, floatValue} = values
  return formattedValue === '' || floatValue <= maxValueObject
}
