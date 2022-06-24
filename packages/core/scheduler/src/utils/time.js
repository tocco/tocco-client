import {format, differenceInCalendarDays, differenceInYears} from 'date-fns'
import {date} from 'tocco-util'

/**
 * Returns the hour as string
 *
 * @param {string} locale (de-CH | de | it | fr | en)
 * @param {Date} datetime javascript date
 *
 * @return {String} Hours of datetime e.g. '08' or '8 PM' depending on the locale
 */
export const getFormattedTime = (locale, datetime) => {
  const formatOptions = {
    locale: date.getDateFnsLocale(locale)
  }
  return format(datetime, 'p', formatOptions).replace(/(:|\.|e)[0-9]{2}/, '')
}

export const getFormattedEventTime = (locale, startDate, endDate) => {
  const days = differenceInCalendarDays(endDate, startDate)
  const years = differenceInYears(endDate, startDate)

  const showYear = years > 0
  const showEndDate = days > 0

  const dateFormat = `d. LLLL${showYear ? ' y' : ''}`
  const timeFormat = 'H:mm'

  const formatOptions = {
    locale: date.getDateFnsLocale(locale)
  }

  const formattedStartDate = format(startDate, dateFormat, formatOptions)
  const formattedEndDate = format(endDate, dateFormat, formatOptions)
  const startTime = format(startDate, timeFormat, formatOptions)
  const endTime = format(endDate, timeFormat, formatOptions)

  return `${formattedStartDate}, ${startTime} - ${showEndDate ? `${formattedEndDate}, ` : ''}${endTime}`
}
