import {roundDecimalPlaces} from '../js/helpers'

export const millisecondsToDuration = ms => {
  if (!ms && ms !== 0) {
    return {
      hours: '',
      minutes: '',
      seconds: ''
    }
  }

  let seconds = roundDecimalPlaces((ms / 1000) % 60, 3)

  ms -= seconds * 1000

  let minutes = parseInt((ms / (1000 * 60)) % 60)

  ms -= minutes * 1000 * 60

  const hours = parseInt(ms / (1000 * 60 * 60))

  // only biggest unit should be negative if negative duration
  if (minutes < 0 || hours < 0) {
    seconds = Math.abs(seconds)
  }
  if (hours < 0) {
    minutes = Math.abs(minutes)
  }

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
