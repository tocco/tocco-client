const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

/**
 * Tests if a date string matches the ISO date pattern (YYYY-MM-DD)
 *
 * @param dateString The date string to test.
 */
export const matchesIsoDate = dateString => ISO_DATE_PATTERN.test(dateString)

/**
 * Creates a Date object from a date string.
 *
 * @param isoDateString The ISO 8601 date string (must match YYYY-MM-DD)
 * @returns {Date} the created Date object or null, if the given string doesn't match YYYY-MM-DD.
 */
export const parseIsoDate = isoDateString => {
  if (!matchesIsoDate(isoDateString)) {
    return null
  }

  const parts = isoDateString.split(/\D/)

  const year = parseInt(parts[0])
  const month = parseInt(parts[1]) - 1
  const day = parseInt(parts[2])

  return new Date(year, month, day)
}
