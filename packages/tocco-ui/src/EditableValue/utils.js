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
    d: 'DD',
    m: 'MM',
    Y: 'YYYY',
    K: 'A',
    H: 'HH',
    h: 'h',
    i: 'mm'
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
 * String to number converter
 */
export const convertStringToNumber = stringValue => (
  !stringValue || isNaN(stringValue) ? null : parseFloat(stringValue)
)

/*
 * Convert two numbers as hours and minutes to milliseconds
 */
export const calculateMilliseconds = (hours, minutes) => {
  if (!hours && !minutes) {
    return null
  }
  const hoursMilliseconds = (hours || 0) * 60 * 60000
  const minutesMilliseconds = (minutes || 0) * 60000
  return hoursMilliseconds + minutesMilliseconds
}

/*
 * Return true if the value is null or undefined
 */
export const isNullOrUndefined = value => value === null || value === undefined

/*
 * Return true if the value is null or undefined
 */
export const millisecondsToDuration = milliseconds => {
  if (!milliseconds && milliseconds !== 0) {
    return {hoursOfDay: 0, minutesOfHour: 0}
  }

  const hoursOfDay = Math.floor(milliseconds / (60 * 60 * 1000))
  const minutesOfHour = Math.floor((milliseconds - (hoursOfDay * (60 * 60 * 1000))) / (60 * 1000))
  return {hoursOfDay, minutesOfHour}
}

/*
 * Convert a timeString of type HH:MM to time number object
 */
export const stringToDuration = timeString => {
  if (!timeString && timeString !== '') {
    return {hourOfDay: 0, minuteOfHour: 0}
  }
  const hourOfDay = parseInt(timeString.split(':')[0])
  const minuteOfHour = parseInt(timeString.split(':')[1])
  return {hourOfDay, minuteOfHour}
}

/*
 * Pad a string with leading zeros
 */
export const padLeadingZeros = (string, numberOfZeros) => {
  return string.length < numberOfZeros ? string.padStart(numberOfZeros, '0') : string
}

/*
 * Convert hour and minute numbers to time string of type HH:MM
 */
export const numbersToTimeFormat = (hours, minutes) => {
  if (!hours && !minutes) {
    if (hours !== 0 && minutes !== 0) {
      return '--:--'
    }
  }
  const hourString = hours ? hours.toString() : '00'
  const minuteString = minutes ? minutes.toString() : '00'

  const paddedHour = padLeadingZeros(hourString, 2)
  const paddedMinute = padLeadingZeros(minuteString, 2)

  return paddedHour + ':' + paddedMinute
}
