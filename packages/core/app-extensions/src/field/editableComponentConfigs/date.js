/**
 * Get a date value as `YYYY-MM-DD` string representation.
 *
 * @param date Anything that the `Date` constructor accepts as single argument
 * @returns {string} The given date in format `YYYY-MM-DD`
 */
const toLocalDateString = date => {
  if (!date || isNaN(date)) {
    return null
  }

  const year = date.getFullYear()
  const month = date.getMonth() + 1 // getMonth() is zero-based
  const day = date.getDate()

  return [year, (month > 9 ? '' : '0') + month, (day > 9 ? '' : '0') + day].join('-')
}

export default {
  getOptions: () => ({
    datePickerOptions: {
      dateToValue: toLocalDateString
    }
  })
}
