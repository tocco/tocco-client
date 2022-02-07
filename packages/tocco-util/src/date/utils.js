import {roundDecimalPlaces} from '../js/helpers'

export const millisecondsToDuration = ms => {
  if (!ms && ms !== 0) {
    return {
      hours: '',
      minutes: '',
      seconds: ''
    }
  }

  const seconds = roundDecimalPlaces((ms / 1000) % 60, 3)
  const minutes = parseInt((ms / (1000 * 60)) % 60)
  const hours = parseInt(ms / (1000 * 60 * 60))
  return {
    hours,
    minutes,
    seconds
  }
}

export const formatDuration = ms => {
  const {hours, minutes, seconds} = millisecondsToDuration(ms)

  /**
   * Attention:
   * Intl.DateTimeFormat cannot be used.
   * In locale 'en' the output is: 24:00:00.000 instead of 00:00:00.000
   */
  const duration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  const durationWithSeconds = `${duration}:${seconds.toFixed(3).padStart(6, '0')}`

  /**
   * The user cannot enter the duration in seconds (hours/minutes are already accurate enough).
   * However, duration values that are automatically measured can have seconds/milliseconds values.
   * Therefore, we show seconds/milliseconds only if such values are present.
   * (e.g. System_activity)
   */
  return seconds ? durationWithSeconds : duration
}
