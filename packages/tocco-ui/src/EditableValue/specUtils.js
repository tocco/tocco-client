/**
 * Returns the expected date according to the current timezone (helps to write date tests
 * which run in all time zones).
 *
 * Example:
 *
 * ```
 * // -> expectedDate is `2017-08-20` if the current time zone is somewhere on the western side of the GMT+2 time zone
 * //    (`-120` -> current time zone minus 120 minutes is GMT)
 * // -> expectedDate is '2017-08-21' if the current time zone is GMT+2 or on the eastern side of it
 * const expectedDate = getExpectedDate('2017-08-20', '2017-08-21', -120)
 * ```
 *
 * @param westernDate The date which is expected if the current time zone is on the western side of the threshold
 * @param easternDate The date which is expected if the current time zone is on the eastern side of the threshold
 * (or same)
 * @param thresholdOffset The time zone where to split east and west (`-120` = GMT+2. See #getTimezoneOffset())
 * @returns the `westernDate` or `easternDate` depending on the current time zone.
 */
export const getExpectedDate = (westernDate, easternDate, thresholdOffset) => {
  const stdOffset = stdTimezoneOffset()

  const timeZoneOffset = new Date().getTimezoneOffset()
  return timeZoneOffset + stdOffset <= thresholdOffset ? easternDate : westernDate
}

const stdTimezoneOffset = () => {
  const jan = new Date((new Date()).getFullYear(), 0, 1)
  const jul = new Date((new Date()).getFullYear(), 6, 1)
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
}
