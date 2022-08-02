import {format, parse, isMatch, startOfDay} from 'date-fns'
import {formatInTimeZone} from 'date-fns-tz'

const DateOnlyFormat = 'yyyy-MM-dd'
const TQLDateTimeFormat = 'yyyy-MM-dd HH:mm'
const TQLTimeFormat = 'HH:mm:ss.SSS'

/**
 * Parse date only string always as local time.
 * Also date-only string `yyyy-MM-dd` as local time instead of UTC.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#timestamp_string
 * @param {String} value
 * @returns Date
 *
 * ```
 * // 2022-06-04 22:00
 * const localDate = parseDateOnlyInLocalTime('2022-06-05')
 * ```
 */
export const parseDateOnlyInLocalTime = value => parse(value, DateOnlyFormat, new Date())

/**
 * Parse date or datetime string as local time and return start of day.
 * @param {String} value
 * @returns Date
 *
 * ```
 * // 2022-06-04 22:00
 * const localDate = parseAsStartOfDayInLocalTime('2022-06-05')
 *
 * // 2022-06-04 22:00
 * const localDate = parseAsStartOfDayInLocalTime('2022-06-05T14:30:00.000+02:00')
 * ```
 */
export const parseAsStartOfDayInLocalTime = value => startOfDay(parseInLocalTime(value))

/**
 * Parse date or datetime string always as local time.
 * Also date-only string `yyyy-MM-dd` as local time instead of UTC.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#timestamp_string
 * @param {String} value
 * @returns Date
 *
 * ```
 * const localDate = parseInLocalTime('2022-06-05')
 * ```
 */
export const parseInLocalTime = value => {
  if (isMatch(value, DateOnlyFormat)) {
    return parse(value, DateOnlyFormat, new Date())
  }

  if (isMatch(value, TQLDateTimeFormat)) {
    return parse(value, TQLDateTimeFormat, new Date())
  }

  if (isMatch(value, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")) {
    return new Date(value)
  }

  if (isMatch(value, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")) {
    return new Date(value)
  }

  return NaN
}

/**
 * Parse time-only string in local time `HH:mm`
 * @param {String} value
 * @returns Date
 *
 * ```
 * const date = parseTime('12:34')
 * ```
 */
export const parseTime = value => parse(value, 'HH:mm', new Date())

/**
 * Format locale date as TQL datetime string in UTC ('yyyy-MM-dd HH:mm')
 * @param {Date} value
 * @returns string
 *
 * ```
 * // 2022-06-04 22:00
 * const datestring = formatTQLDatetime(parseInLocalTime('2022-06-05'))
 * ```
 */
export const formatTQLDatetime = value => formatInTimeZone(value, 'UTC', TQLDateTimeFormat)

/**
 * Format date as TQL time string in local time ('HH:mm:ss.SSS')
 * @param {Date} value
 * @returns string
 *
 * ```
 * // 12:30:00.000
 * const timestring = formatTQLTime(parseTime('12:30'))
 * ```
 */
export const formatTQLTime = value => format(value, TQLTimeFormat)
