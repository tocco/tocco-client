/**
 * Adds the timezone offset of the current environment to the passed date to get the date for the UTC timezone.
 */
export const convertDateToUTC = date => {
  const timezoneOffset = new Date().getTimezoneOffset() * 60000
  return new Date(date.getTime() + timezoneOffset)
}
